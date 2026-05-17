/**
 * Background Worker — polls BattleMetrics every 60 seconds.
 * Runs inside the same Node.js process as the Next.js server.
 * Restart-safe: open sessions are re-detected on boot.
 */

import axios from "axios";
import { prisma } from "./prisma";
import { splitSessionAcrossDays, splitSessionAcrossHours } from "./analytics";

const POLL_INTERVAL_MS = 60_000;
const RUST_PLUS_SEND_TIMEOUT_MS = 8_000;

// ─── BattleMetrics Types ──────────────────────────────────────────────────────

interface BMPlayerAttributes {
  name: string;
}

interface BMPlayerIncluded {
  type: "player";
  id: string;
  attributes: BMPlayerAttributes;
}

interface BMSessionIncluded {
  type: "session";
  id: string;
  attributes?: {
    start?: string;
  };
  relationships?: {
    player?: {
      data?: {
        id?: string;
      };
    };
  };
}

interface BMUnknownIncluded {
  type: string;
  id: string;
}

type BMIncluded = BMPlayerIncluded | BMSessionIncluded | BMUnknownIncluded;

interface BMServerResponse {
  included?: BMIncluded[];
}

interface RustPlusCredentials {
  ip: string;
  port: number;
  playerId: string;
  playerToken: string;
}

interface RustPlusClient {
  on(event: "connected" | "disconnected" | "error" | "message" | "connecting" | "request", listener: (err?: any) => void): void;
  connect(): void;
  disconnect(): void;
  sendTeamMessage(message: string): void;
}

function isBMSessionIncluded(include: BMIncluded): include is BMSessionIncluded {
  return include.type === "session" && "attributes" in include;
}

function getRustPlusCredentials(server: {
  rustPlusIp: string | null;
  rustPlusPort: number | null;
  rustPlusPlayerId: string | null;
  rustPlusPlayerToken: string | null;
}): RustPlusCredentials | null {
  if (
    !server.rustPlusIp ||
    !server.rustPlusPort ||
    !server.rustPlusPlayerId ||
    !server.rustPlusPlayerToken
  ) {
    return null;
  }

  return {
    ip: server.rustPlusIp,
    port: server.rustPlusPort,
    playerId: server.rustPlusPlayerId,
    playerToken: server.rustPlusPlayerToken,
  };
}

async function sendRustPlusTeamMessage(
  credentials: RustPlusCredentials,
  message: string
): Promise<void> {
  const rustPlusModule = (await import("@liamcottle/rustplus.js")) as {
    default: new (
      ip: string,
      port: string,
      playerId: string,
      playerToken: string
    ) => RustPlusClient;
  };
  const RustPlus = rustPlusModule.default;

  await new Promise<void>((resolve, reject) => {
    const rustPlus = new RustPlus(
      credentials.ip,
      String(credentials.port),
      credentials.playerId,
      credentials.playerToken
    );

    let settled = false;
    const finish = (error?: unknown) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      try {
        rustPlus.disconnect();
      } catch {
        // ignore disconnect errors
      }

      if (error) {
        reject(error);
      } else {
        resolve();
      }
    };

    rustPlus.on("connected", () => {
      try {
        rustPlus.sendTeamMessage(message);
        setTimeout(() => finish(), 400);
      } catch (error) {
        finish(error);
      }
    });

    rustPlus.on("error", (error) => finish(error));
    rustPlus.on("disconnected", () => finish());

    const timeout = setTimeout(() => {
      finish(new Error("Rust+ send timeout"));
    }, RUST_PLUS_SEND_TIMEOUT_MS);

    try {
      rustPlus.connect();
    } catch (error) {
      finish(error);
    }
  });
}

// ─── Main Poll Loop ───────────────────────────────────────────────────────────

export function startWorker(): void {
  console.log("[Worker] Starting BattleMetrics poll worker…");
  void runPoll(); // immediate first run
  setInterval(() => void runPoll(), POLL_INTERVAL_MS);

  // Keep Render free tier awake by self-pinging every 10 minutes
  if (process.env.NODE_ENV === "production" && process.env.RENDER_EXTERNAL_URL) {
    const pingUrl = process.env.RENDER_EXTERNAL_URL;
    setInterval(async () => {
      try {
        await axios.get(pingUrl, { timeout: 10_000 });
        console.log("[Worker] Self-ping OK");
      } catch {
        // silently ignore
      }
    }, 10 * 60 * 1000);
  }
}

async function runPoll(): Promise<void> {
  try {
    const servers = await prisma.server.findMany({
      select: { userId: true, id: true },
    });
    await Promise.allSettled(servers.map((s) => pollServer(s.userId, s.id)));
  } catch (err) {
    console.error("[Worker] Poll cycle error:", err);
  }
}

// ─── Per-Server Poll ──────────────────────────────────────────────────────────

async function pollServer(userId: string, serverId: string): Promise<void> {
  try {
    if (!/^\d+$/.test(serverId)) {
      return;
    }

    const server = await prisma.server.findUnique({
      where: { userId_id: { userId, id: serverId } },
      select: {
        rustPlusIp: true,
        rustPlusPort: true,
        rustPlusPlayerId: true,
        rustPlusPlayerToken: true,
      },
    });
    if (!server) return;

    const rustPlusCredentials = getRustPlusCredentials(server);
    const url = `https://api.battlemetrics.com/servers/${serverId}?include=player,session`;
    const headers: Record<string, string> = {};
    if (process.env.BATTLEMETRICS_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.BATTLEMETRICS_TOKEN}`;
    }

    const { data } = await axios.get<BMServerResponse>(url, {
      headers,
      timeout: 15_000,
    });
    const included = data.included || [];

    // Find tracked players in DB
    const trackedPlayers = await prisma.player.findMany({
      where: { userId, serverId, isTracking: true },
      select: { id: true, rustPlusNotifications: true },
    });
    const trackedById = new Map(trackedPlayers.map((p) => [p.id, p]));

    // Map player to session start time
    const sessionMap = new Map<string, Date>();
    for (const inc of included) {
      if (
        isBMSessionIncluded(inc) &&
        inc.attributes?.start &&
        inc.relationships?.player?.data?.id
      ) {
        sessionMap.set(inc.relationships.player.data.id, new Date(inc.attributes.start));
      }
    }

    const onlinePlayers = included.filter(
      (inc): inc is BMPlayerIncluded => inc.type === "player"
    );

    const onlineIds = new Set<string>(onlinePlayers.map((p) => p.id));
    const now = new Date();

    // ── Handle tracked players (join / stay) ───────────────────────────────
    for (const bm of onlinePlayers) {
      const tracked = trackedById.get(bm.id);
      if (tracked) {
        const sessionStart = sessionMap.get(bm.id) || now;
        await handlePlayerOnline(
          userId,
          bm.id,
          bm.attributes?.name || "Unknown",
          serverId,
          now,
          sessionStart,
          tracked.rustPlusNotifications,
          rustPlusCredentials
        );
      }
    }

    // ── Handle players who left (close open sessions for this server) ─────
    await handlePlayersLeft(userId, serverId, onlineIds, now, rustPlusCredentials);
  } catch (err) {
    console.error(`[Worker] Error polling server ${serverId} for user ${userId}:`, err);
  }
}

// ─── Player Join / Stay ───────────────────────────────────────────────────────

async function handlePlayerOnline(
  userId: string,
  playerId: string,
  name: string,
  serverId: string,
  now: Date,
  sessionStart: Date,
  rustPlusNotifications: boolean,
  rustPlusCredentials: RustPlusCredentials | null
): Promise<void> {
  // Update last seen
  await prisma.player.update({
    where: { userId_id: { userId, id: playerId } },
    data: { name, lastSeen: now },
  });

  // Open session if none exists
  const openSession = await prisma.session.findFirst({
    where: { userId, playerId, serverId, leftAt: null },
  });

  if (!openSession) {
    await prisma.session.create({
      data: { userId, playerId, serverId, joinedAt: sessionStart },
    });

    if (rustPlusNotifications && rustPlusCredentials) {
      try {
        await sendRustPlusTeamMessage(
          rustPlusCredentials,
          `[Tracker] ${name} joined the server.`
        );
      } catch (error) {
        console.error(`[Worker] Failed Rust+ join message for ${name}:`, error);
      }
    }
  }
}

// ─── Player Leave ─────────────────────────────────────────────────────────────

async function handlePlayersLeft(
  userId: string,
  serverId: string,
  onlineIds: Set<string>,
  now: Date,
  rustPlusCredentials: RustPlusCredentials | null
): Promise<void> {
  // Find all open sessions for this server whose player is no longer online
  const staleSessions = await prisma.session.findMany({
    where: { userId, serverId, leftAt: null },
    select: {
      id: true,
      playerId: true,
      joinedAt: true,
      player: { select: { name: true, rustPlusNotifications: true } },
    },
  });

  for (const session of staleSessions) {
    if (onlineIds.has(session.playerId)) continue; // still online

    const durationSec = Math.floor((now.getTime() - session.joinedAt.getTime()) / 1000);

    // Close session
    await prisma.session.update({
      where: { id: session.id },
      data: { leftAt: now, durationSec },
    });

    // Aggregate stats
    await aggregateSession(userId, session.playerId, session.joinedAt, now);

    if (session.player.rustPlusNotifications && rustPlusCredentials) {
      try {
        await sendRustPlusTeamMessage(
          rustPlusCredentials,
          `[Tracker] ${session.player.name} left the server.`
        );
      } catch (error) {
        console.error(`[Worker] Failed Rust+ leave message for ${session.player.name}:`, error);
      }
    }
  }
}

// ─── Aggregation on Session Close ────────────────────────────────────────────

async function aggregateSession(
  userId: string,
  playerId: string,
  joinedAt: Date,
  leftAt: Date
): Promise<void> {
  // 1. Daily stats — split session across UTC day boundaries
  const daySplits = splitSessionAcrossDays(joinedAt, leftAt);

  for (const { date, seconds } of daySplits) {
    await prisma.playerDailyStat.upsert({
      where: { userId_playerId_date: { userId, playerId, date } },
      create: {
        userId,
        playerId,
        date,
        totalTimeSec: seconds,
        sessionsCount: 1,
      },
      update: {
        totalTimeSec: { increment: seconds },
        sessionsCount: { increment: 1 },
      },
    });
  }

  // 2. Hourly stats — split session across UTC hours
  const splits = splitSessionAcrossHours(joinedAt, leftAt);

  for (const { hour, seconds } of splits) {
    await prisma.playerHourlyStat.upsert({
      where: { userId_playerId_hour: { userId, playerId, hour } },
      create: { userId, playerId, hour, totalTimeSec: seconds },
      update: { totalTimeSec: { increment: seconds } },
    });
  }
}
