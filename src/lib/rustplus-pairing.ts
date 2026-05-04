import axios from "axios";
import { prisma } from "@/lib/prisma";
import { ensureAppUser } from "@/lib/current-user";
import { randomUUID } from "crypto";
import { spawn } from "child_process";
import path from "path";


const DEFAULT_LISTEN_MS = 120_000;
const MAX_LISTEN_MS = 300_000;

const FCM_API_KEY = "AIzaSyB5y2y-Tzqb4-I4Qnlsh_9naYv_TD8pCvY";
const FCM_PROJECT_ID = "rust-companion-app";
const FCM_GCM_SENDER_ID = "976529667804";
const FCM_GMS_APP_ID = "1:976529667804:android:d6f1ddeb4403b338fea619";
const FCM_ANDROID_PACKAGE_NAME = "com.facepunch.rust.companion";
const FCM_ANDROID_PACKAGE_CERT = "E28D05345FB78A7A1A63D70F4A302DBF426CA5AD";

interface PairingServerPayload {
  type: "server";
  id: string;
  name?: string;
  ip: string;
  port: string | number;
  playerId: string;
  playerToken: string;
}

interface LogEntry {
  timestamp: number;
  level: "info" | "warn" | "error" | "success";
  message: string;
}

interface ListenerState {
  userId: string;
  startedAt: number;
  expiresAt: number;
  status: "starting" | "listening" | "completed" | "expired" | "error";
  message: string;
  logs: LogEntry[];
  lastPairing: PairingServerPayload | null;
  stop?: () => void;
}

const listeners = new Map<string, ListenerState>();

function getExpoPushToken(fcmToken: string): Promise<string> {
  return axios
    .post("https://exp.host/--/api/v2/push/getExpoPushToken", {
      type: "fcm",
      deviceId: randomUUID(),
      development: false,
      appId: "com.facepunch.rust.companion",
      deviceToken: fcmToken,
      projectId: "49451aca-a822-41e6-ad59-955718d0ff9c",
    })
    .then((response) => response.data.data.expoPushToken as string);
}

function registerWithRustPlus(authToken: string, expoPushToken: string) {
  return axios.post("https://companion-rust.facepunch.com:443/api/push/register", {
    AuthToken: authToken,
    DeviceId: `rustplayertrackerplus-${randomUUID()}`,
    PushKind: 3,
    PushToken: expoPushToken,
  });
}

async function findBattleMetricsId(ip: string, port: string | number): Promise<string | null> {
  try {
    const response = await axios.get("https://api.battlemetrics.com/servers", {
      params: {
        "filter[address]": ip,
        "filter[port]": port,
        "filter[game]": "rust",
        "page[size]": 1,
      },
    });

    const servers = response.data.data;
    if (servers && servers.length > 0) {
      return servers[0].id as string;
    }
  } catch (error) {
    console.error("Failed to find BattleMetrics ID for server:", ip, port, error);
  }
  return null;
}

function extractServerPairing(value: unknown): PairingServerPayload | null {
  if (!value || typeof value !== "object") return null;

  const obj = value as Record<string, unknown>;
  const isServerPair =
    obj.type === "server" &&
    typeof obj.ip === "string" &&
    (typeof obj.port === "string" || typeof obj.port === "number") &&
    typeof obj.playerId === "string" &&
    typeof obj.playerToken === "string" &&
    typeof obj.id === "string";

  if (isServerPair) {
    return obj as unknown as PairingServerPayload;
  }

  for (const nested of Object.values(obj)) {
    const found = extractServerPairing(nested);
    if (found) return found;
  }

  return null;
}

async function upsertServerFromPairing(userId: string, pairing: PairingServerPayload) {
  await ensureAppUser(userId);

  // Rust+ pairing payload doesn't contain BattleMetrics ID.
  // We must map IP/Port to BM ID.
  const bmId = await findBattleMetricsId(pairing.ip, pairing.port);
  if (!bmId) {
    throw new Error(`Could not find BattleMetrics server for ${pairing.ip}:${pairing.port}`);
  }

  const numericPort = Number(pairing.port);
  const existingById = await prisma.server.findUnique({
    where: { userId_id: { userId, id: bmId } },
  });

  if (existingById) {
    await prisma.server.update({
      where: { userId_id: { userId, id: bmId } },
      data: {
        name: pairing.name || existingById.name,
        rustPlusIp: pairing.ip,
        rustPlusPort: Number.isFinite(numericPort) ? numericPort : null,
        rustPlusPlayerId: pairing.playerId,
        rustPlusPlayerToken: pairing.playerToken,
      },
    });
    return;
  }

  const existingByEndpoint = await prisma.server.findFirst({
    where: {
      userId,
      rustPlusIp: pairing.ip,
      rustPlusPort: Number.isFinite(numericPort) ? numericPort : null,
    },
    orderBy: { createdAt: "desc" },
  });

  if (existingByEndpoint) {
    await prisma.server.update({
      where: { userId_id: { userId, id: existingByEndpoint.id } },
      data: {
        id: bmId, // migrate to BM ID if it was added manually with a different ID? 
        // Actually prisma doesn't allow changing ID easily if it's part of PK.
        // But here we want to ensure it's mapped to BM ID.
        name: pairing.name || existingByEndpoint.name,
        rustPlusPlayerId: pairing.playerId,
        rustPlusPlayerToken: pairing.playerToken,
      },
    });
    return;
  }

  await prisma.server.create({
    data: {
      userId,
      id: bmId,
      name: pairing.name || `Rust+ ${pairing.ip}:${pairing.port}`,
      rustPlusIp: pairing.ip,
      rustPlusPort: Number.isFinite(numericPort) ? numericPort : null,
      rustPlusPlayerId: pairing.playerId,
      rustPlusPlayerToken: pairing.playerToken,
    },
  });
}

function setState(userId: string, patch: Partial<ListenerState>) {
  const current = listeners.get(userId);
  if (!current) return;

  const logs = [...current.logs];
  if (patch.message && patch.message !== current.message) {
    logs.push({
      timestamp: Date.now(),
      level: patch.status === "error" ? "error" : patch.status === "completed" ? "success" : "info",
      message: patch.message,
    });
  }

  listeners.set(userId, { ...current, ...patch, logs });
}

function addLog(userId: string, level: LogEntry["level"], message: string) {
  const current = listeners.get(userId);
  if (!current) return;
  const logs = [...current.logs, { timestamp: Date.now(), level, message }];
  listeners.set(userId, { ...current, logs });
}

export function getPairingListenerStatus(userId: string) {
  const state = listeners.get(userId);
  if (!state) return null;
  return {
    startedAt: state.startedAt,
    expiresAt: state.expiresAt,
    status: state.status,
    message: state.message,
    logs: state.logs,
    lastPairing: state.lastPairing,
  };
}

export function stopPairingListener(userId: string) {
  const state = listeners.get(userId);
  if (!state) return;
  if (state.stop) state.stop();
  listeners.delete(userId);
}

export async function startPairingListener(
  userId: string,
  authToken: string,
  listenMsInput?: number
) {
  stopPairingListener(userId);

  const listenMs = Math.min(Math.max(listenMsInput ?? DEFAULT_LISTEN_MS, 15_000), MAX_LISTEN_MS);
  const startedAt = Date.now();
  const expiresAt = startedAt + listenMs;

  listeners.set(userId, {
    userId,
    startedAt,
    expiresAt,
    status: "starting",
    message: "Registering Rust+ pairing listener...",
    logs: [
      { timestamp: startedAt, level: "info", message: "Starting FCM registration flow..." },
    ],
    lastPairing: null,
  });

  try {
    const androidFcmModule = (await import("@liamcottle/push-receiver/src/android/fcm")) as {
      register: (
        apiKey: string,
        projectId: string,
        gcmSenderId: string,
        gmsAppId: string,
        androidPackageName: string,
        androidPackageCert: string
      ) => Promise<{
        fcm: { token: string };
        gcm: { androidId: string; securityToken: string };
      }>;
    };

    const fcmCredentials = await androidFcmModule.register(
      FCM_API_KEY,
      FCM_PROJECT_ID,
      FCM_GCM_SENDER_ID,
      FCM_GMS_APP_ID,
      FCM_ANDROID_PACKAGE_NAME,
      FCM_ANDROID_PACKAGE_CERT
    );

    addLog(userId, "success", `FCM Registered. ID: ${fcmCredentials.gcm.androidId}`);

    // Persist FCM credentials to user
    await prisma.appUser.update({
      where: { id: userId },
      data: {
        fcmAndroidId: fcmCredentials.gcm.androidId,
        fcmSecurityToken: fcmCredentials.gcm.securityToken,
      },
    });

    const expoPushToken = await getExpoPushToken(fcmCredentials.fcm.token);
    addLog(userId, "info", "Obtained Expo Push Token.");

    await registerWithRustPlus(authToken, expoPushToken);
    addLog(userId, "info", "Registered with Rust+ companion API.");

    await startPairingListenerFromFcmCredentials(
      userId,
      {
        gcmAndroidId: fcmCredentials.gcm.androidId,
        gcmSecurityToken: fcmCredentials.gcm.securityToken,
      },
      listenMs
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Rust+ pairing listener failed";
    setState(userId, { status: "error", message });
  }

  return getPairingListenerStatus(userId);
}

export async function startPairingListenerFromFcmCredentials(
  userId: string,
  credentials: {
    gcmAndroidId: string;
    gcmSecurityToken: string;
    steamId?: string;
    issuedDate?: number;
    expireDate?: number;
  },
  listenMsInput?: number
) {
  stopPairingListener(userId);

  const listenMs = Math.min(Math.max(listenMsInput ?? DEFAULT_LISTEN_MS, 15_000), MAX_LISTEN_MS);
  const startedAt = Date.now();
  const expiresAt = startedAt + listenMs;

  listeners.set(userId, {
    userId,
    startedAt,
    expiresAt,
    status: "starting",
    message: "Starting listener with provided FCM credentials...",
    logs: [
      {
        timestamp: startedAt,
        level: "info",
        message: `Connecting to FCM with ID ${credentials.gcmAndroidId.substring(0, 8)}...`,
      },
    ],
    lastPairing: null,
  });

  // Persist these manual credentials if they were provided
  await prisma.appUser.update({
    where: { id: userId },
    data: {
      fcmAndroidId: credentials.gcmAndroidId,
      fcmSecurityToken: credentials.gcmSecurityToken,
      fcmSteamId: credentials.steamId,
      fcmIssuedAt: credentials.issuedDate ? new Date(credentials.issuedDate * 1000) : undefined,
      fcmExpiresAt: credentials.expireDate ? new Date(credentials.expireDate * 1000) : undefined,
    },
  }).catch(() => { /* ignore if user doesn't exist yet */ });

  try {
    const scriptPath = path.resolve(process.cwd(), "scripts/fcm-listener.js");

    const child = spawn(process.execPath, [scriptPath], {
      stdio: ["pipe", "pipe", "pipe"],
      env: process.env,
    });

    // Send credentials to child via stdin
    child.stdin.write(JSON.stringify({ androidId: credentials.gcmAndroidId, securityToken: credentials.gcmSecurityToken, listenMs }));
    child.stdin.end();

    let lineBuffer = "";

    child.stdout.on("data", (chunk: Buffer) => {
      lineBuffer += chunk.toString("utf8");
      const lines = lineBuffer.split("\n");
      lineBuffer = lines.pop() ?? "";

      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const msg = JSON.parse(line) as { type: string; level?: string; message?: string; pairing?: PairingServerPayload; reason?: string };

          if (msg.type === "log" && msg.message) {
            addLog(userId, (msg.level as LogEntry["level"]) || "info", msg.message);
          } else if (msg.type === "connected" && msg.message) {
            addLog(userId, "success", msg.message);
            setState(userId, { status: "listening", message: "Listening for Rust+ pairing notification..." });
          } else if (msg.type === "pairing" && msg.pairing) {
            const pairing = msg.pairing;
            addLog(userId, "info", `Pairing found for ${pairing.ip}:${pairing.port}. Mapping to BattleMetrics...`);
            upsertServerFromPairing(userId, pairing)
              .then(() => {
                setState(userId, {
                  lastPairing: pairing,
                  status: "completed",
                  message: `Paired server ${pairing.name || pairing.id} and saved credentials.`,
                });
              })
              .catch((err: Error) => addLog(userId, "error", err.message || "Failed to save pairing"));
          } else if (msg.type === "stopped") {
            setState(userId, { status: "expired", message: "Pairing window expired." });
          } else if (msg.type === "error" && msg.message) {
            setState(userId, { status: "error", message: msg.message });
          }
        } catch {
          // ignore malformed lines
        }
      }
    });

    child.stderr.on("data", (chunk: Buffer) => {
      const text = chunk.toString("utf8").trim();
      if (text) console.error("[FCM child]:", text);
    });

    child.on("exit", (code) => {
      const state = listeners.get(userId);
      if (state && state.status === "listening") {
        setState(userId, { status: "expired", message: "FCM listener process exited." });
      }
    });

    const current = listeners.get(userId);
    listeners.set(userId, {
      userId,
      startedAt,
      expiresAt,
      status: "starting",
      message: "Starting listener with provided FCM credentials...",
      logs: current?.logs || [],
      lastPairing: null,
      stop: () => {
        try { child.kill(); } catch {}
        setState(userId, { status: "expired", message: "Pairing listener stopped." });
      },
    });

  } catch (error) {
    const message = error instanceof Error ? error.message : "FCM pairing listener failed";
    setState(userId, { status: "error", message });
  }

  return getPairingListenerStatus(userId);
}
