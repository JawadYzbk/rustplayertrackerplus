/**
 * Background Worker — polls BattleMetrics every 60 seconds.
 * Runs inside the same Node.js process as the Next.js server.
 * Restart-safe: open sessions are re-detected on boot.
 */

import axios from "axios";
import { prisma } from "./prisma";
import { splitSessionAcrossHours } from "./analytics";

const POLL_INTERVAL_MS = 60_000;
const ONLINE_THRESHOLD_SEC = 120;

// ─── BattleMetrics Types ──────────────────────────────────────────────────────

interface BMPlayerAttributes {
  name: string;
}

interface BMPlayer {
  id: string;
  attributes: BMPlayerAttributes;
}

interface BMServerResponse {
  included?: BMPlayer[];
}

// ─── Main Poll Loop ───────────────────────────────────────────────────────────

export function startWorker(): void {
  console.log("[Worker] Starting BattleMetrics poll worker…");
  void runPoll(); // immediate first run
  setInterval(() => void runPoll(), POLL_INTERVAL_MS);
}

async function runPoll(): Promise<void> {
  try {
    const servers = await prisma.server.findMany({ select: { id: true } });
    await Promise.allSettled(servers.map((s) => pollServer(s.id)));
  } catch (err) {
    console.error("[Worker] Poll cycle error:", err);
  }
}

// ─── Per-Server Poll ──────────────────────────────────────────────────────────

async function pollServer(serverId: string): Promise<void> {
  try {
    const url = `https://api.battlemetrics.com/servers/${serverId}?include=player,session`;
    const headers: Record<string, string> = {};
    if (process.env.BATTLEMETRICS_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.BATTLEMETRICS_TOKEN}`;
    }

    const { data } = await axios.get<any>(url, { headers, timeout: 15_000 });
    const included = data.included || [];

    // Find tracked players in DB
    const trackedPlayers = await prisma.player.findMany({
      where: { serverId },
      select: { id: true },
    });
    const trackedIds = new Set(trackedPlayers.map((p) => p.id));

    // Map player to session start time
    const sessionMap = new Map<string, Date>();
    for (const inc of included) {
      if (inc.type === "session" && inc.attributes?.start && inc.relationships?.player?.data?.id) {
        sessionMap.set(inc.relationships.player.data.id, new Date(inc.attributes.start));
      }
    }

    const onlinePlayers = included.filter(
      (inc: any) => inc.type === "player" && typeof inc.id === "string"
    );

    const onlineIds = new Set<string>(onlinePlayers.map((p: any) => String(p.id)));
    const now = new Date();

    // ── Handle tracked players (join / stay) ───────────────────────────────
    for (const bm of onlinePlayers) {
      if (trackedIds.has(bm.id)) {
        const sessionStart = sessionMap.get(bm.id) || now;
        await handlePlayerOnline(bm.id, bm.attributes?.name || "Unknown", serverId, now, sessionStart);
      }
    }

    // ── Handle players who left (close open sessions for this server) ─────
    await handlePlayersLeft(serverId, onlineIds, now);
  } catch (err) {
    console.error(`[Worker] Error polling server ${serverId}:`, err);
  }
}

// ─── Player Join / Stay ───────────────────────────────────────────────────────

async function handlePlayerOnline(
  playerId: string,
  name: string,
  serverId: string,
  now: Date,
  sessionStart: Date
): Promise<void> {
  // Update last seen
  await prisma.player.update({
    where: { id: playerId },
    data: { name, lastSeen: now },
  });

  // Open session if none exists
  const openSession = await prisma.session.findFirst({
    where: { playerId, serverId, leftAt: null },
  });

  if (!openSession) {
    await prisma.session.create({
      data: { playerId, serverId, joinedAt: sessionStart },
    });
  }
}

// ─── Player Leave ─────────────────────────────────────────────────────────────

async function handlePlayersLeft(
  serverId: string,
  onlineIds: Set<string>,
  now: Date
): Promise<void> {
  // Find all open sessions for this server whose player is no longer online
  const staleSessions = await prisma.session.findMany({
    where: { serverId, leftAt: null },
    select: { id: true, playerId: true, joinedAt: true },
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
    await aggregateSession(session.playerId, session.joinedAt, now, durationSec);
  }
}

// ─── Aggregation on Session Close ────────────────────────────────────────────

async function aggregateSession(
  playerId: string,
  joinedAt: Date,
  leftAt: Date,
  durationSec: number
): Promise<void> {
  // 1. Daily stat
  const dateKey = new Date(
    Date.UTC(joinedAt.getUTCFullYear(), joinedAt.getUTCMonth(), joinedAt.getUTCDate())
  );

  await prisma.playerDailyStat.upsert({
    where: { playerId_date: { playerId, date: dateKey } },
    create: { playerId, date: dateKey, totalTimeSec: durationSec, sessionsCount: 1 },
    update: {
      totalTimeSec: { increment: durationSec },
      sessionsCount: { increment: 1 },
    },
  });

  // 2. Hourly stats — split session across UTC hours
  const splits = splitSessionAcrossHours(joinedAt, leftAt);

  for (const { hour, seconds } of splits) {
    await prisma.playerHourlyStat.upsert({
      where: { playerId_hour: { playerId, hour } },
      create: { playerId, hour, totalTimeSec: seconds },
      update: { totalTimeSec: { increment: seconds } },
    });
  }
}
