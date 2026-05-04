import axios from "axios";
import { prisma } from "@/lib/prisma";
import { ensureAppUser } from "@/lib/current-user";
import { randomUUID } from "crypto";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";
import os from "os";

// Embedded FCM listener script content — written to tmpdir at runtime so no external file is needed.
// This avoids path resolution issues in production (Render, Vercel, Docker, etc).
const FCM_LISTENER_SCRIPT = /* js */ `
'use strict';

const Client = require('@liamcottle/push-receiver/src/client');

function send(obj) {
  process.stdout.write(JSON.stringify(obj) + '\\n');
}

// Rust+ FCM notifications arrive as a DataMessageStanza with an appData
// array of { key, value } pairs. A *server* pairing notification has:
//   { key: 'channelId', value: 'server' }
//   { key: 'body',      value: '<JSON string with ip/port/playerId/playerToken/...>' }
// We must look for that pattern rather than a nested JS object.
function appDataToMap(appData) {
  const map = {};
  if (Array.isArray(appData)) {
    for (const entry of appData) {
      if (entry && typeof entry.key === 'string') map[entry.key] = entry.value;
    }
  }
  return map;
}

function extractServerPairing(data) {
  // data is the raw DataMessageStanza object emitted by push-receiver
  const appData = data && (data.appData || data.app_data);
  if (!appData) return null;

  const map = appDataToMap(appData);

  // The pairing notification has channelId 'pairing' or 'server'
  if (map['channelId'] !== 'pairing' && map['channelId'] !== 'server') return null;

  // The pairing details are JSON-encoded in the 'body' key
  let body;
  try {
    body = JSON.parse(map['body'] || '{}');
  } catch {
    return null;
  }

  // Ensure it's actually a server pairing payload
  if (body.type !== 'server') return null;

  const { ip, port, playerId, playerToken } = body;
  if (!ip || !port || !playerId || !playerToken) return null;

  return {
    type: 'server',
    id: body.id || body.serverId || (ip + ':' + port),
    name: body.name || body.serverName || undefined,
    ip,
    port,
    playerId,
    playerToken,
  };
}

let rawInput = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => { rawInput += chunk; });

process.stdin.on('end', async () => {
  let credentials;
  try {
    credentials = JSON.parse(rawInput.trim());
  } catch (err) {
    send({ type: 'error', message: 'Invalid credentials JSON: ' + err.message });
    process.exit(1);
    return;
  }

  const { androidId, securityToken, listenMs = 120000 } = credentials;

  if (!androidId || !securityToken) {
    send({ type: 'error', message: 'Missing androidId or securityToken' });
    process.exit(1);
    return;
  }

  send({ type: 'log', level: 'info', message: 'Connecting to FCM with ID ' + String(androidId).substring(0, 8) + '...' });

  try {
    const client = new Client(androidId, securityToken, []);

    const timer = setTimeout(() => {
      send({ type: 'stopped', reason: 'timeout' });
      try { client.destroy(); } catch {}
      process.exit(0);
    }, listenMs);

    client.on('ON_DATA_RECEIVED', (data) => {
      send({ type: 'log', level: 'info', message: 'Push notification received.' });
      
      // Debug logging:
      try {
        const appData = data && (data.appData || data.app_data);
        const map = appDataToMap(appData);
        send({ type: 'log', level: 'info', message: 'FCM Map: ' + JSON.stringify(map) });
      } catch (e) {}

      const pairing = extractServerPairing(data);
      if (pairing) {
        send({ type: 'pairing', pairing });
        clearTimeout(timer);
        try { client.destroy(); } catch {}
        process.exit(0);
      } else {
        send({ type: 'log', level: 'warn', message: 'Notification received but no server pairing found.' });
      }
    });

    client.on('ON_NOTIFICATION_RECEIVED', (data) => {
      send({ type: 'log', level: 'info', message: 'Encrypted push notification received.' });
      try {
        const appData = data.object && (data.object.appData || data.object.app_data);
        const map = appDataToMap(appData);
        send({ type: 'log', level: 'info', message: 'Encrypted FCM Map: ' + JSON.stringify(map) });
      } catch (e) {}
      
      // Try extracting from data.notification or data.object
      const pairing = extractServerPairing(data.notification) || extractServerPairing(data.object) || extractServerPairing(data);
      if (pairing) {
        send({ type: 'pairing', pairing });
        clearTimeout(timer);
        try { client.destroy(); } catch {}
        process.exit(0);
      } else {
        send({ type: 'log', level: 'warn', message: 'Encrypted notification received but no server pairing found.' });
      }
    });

    send({ type: 'log', level: 'info', message: 'FCM Socket connecting...' });
    await client.connect();
    send({ type: 'connected', message: 'FCM Socket connected and listening.' });

  } catch (err) {
    send({ type: 'error', message: err.message || 'FCM client error' });
    process.exit(1);
  }
});
`;

let _cachedScriptPath: string | null = null;

function buildScriptContent(): string {
  // We CANNOT use require.resolve() here — Next.js/webpack replaces it with a numeric module ID.
  // Instead, construct the absolute path manually from process.cwd() (the project root).
  const clientPath = path.join(process.cwd(), "node_modules/@liamcottle/push-receiver/src/client.js");

  return FCM_LISTENER_SCRIPT
    .replace("require('@liamcottle/push-receiver/src/client')", `require(${JSON.stringify(clientPath)})`);
}

function getScriptPath(): string {
  if (_cachedScriptPath) return _cachedScriptPath;

  const scriptContent = buildScriptContent();

  // Write to a consistent location in tmpdir (overwrite to pick up any updates)
  const tmpScript = path.join(os.tmpdir(), "fcm-listener-rusttracker.js");
  fs.writeFileSync(tmpScript, scriptContent, "utf8");
  _cachedScriptPath = tmpScript;
  return tmpScript;
}


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

/**
 * Rust+ sends a DataMessageStanza whose `appData` field is an array of
 * { key, value } pairs.  A **server** pairing notification is identified by:
 *   channelId === "server"
 * with the actual pairing details JSON-encoded in the "body" key.
 */
function appDataToMap(appData: Array<{ key: string; value: string }>): Record<string, string> {
  const map: Record<string, string> = {};
  for (const entry of appData) {
    if (entry?.key) map[entry.key] = entry.value;
  }
  return map;
}

function extractServerPairing(data: unknown): PairingServerPayload | null {
  if (!data || typeof data !== "object") return null;

  const obj = data as Record<string, unknown>;

  // appData may be keyed as appData or app_data depending on protobuf decode settings
  const rawAppData = (obj["appData"] ?? obj["app_data"]) as Array<{ key: string; value: string }> | undefined;
  if (!Array.isArray(rawAppData)) return null;

  const map = appDataToMap(rawAppData);

  // The pairing notification has channelId 'pairing' or 'server'
  if (map["channelId"] !== "pairing" && map["channelId"] !== "server") return null;

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(map["body"] ?? "{}");
  } catch {
    return null;
  }

  // Ensure it's actually a server pairing payload
  if (body.type !== "server") return null;

  const { ip, port, playerId, playerToken } = body as Record<string, string>;
  if (!ip || !port || !playerId || !playerToken) return null;

  return {
    type: "server",
    id: (body["id"] ?? body["serverId"] ?? `${ip}:${port}`) as string,
    name: (body["name"] ?? body["serverName"]) as string | undefined,
    ip,
    port,
    playerId,
    playerToken,
  };
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
    const scriptPath = getScriptPath();

    const child = spawn(process.execPath, [scriptPath], {
      stdio: ["pipe", "pipe", "pipe"],
      env: process.env,
    });

    // Send credentials to child via stdin
    child.stdin.write(JSON.stringify({ androidId: credentials.gcmAndroidId, securityToken: credentials.gcmSecurityToken, listenMs }));
    child.stdin.end();

    // Set up state with stop function FIRST, before attaching data handlers
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
      if (text) {
        console.error("[FCM child]:", text);
        addLog(userId, "error", `[child] ${text}`);
      }
    });

    child.on("error", (err) => {
      addLog(userId, "error", `Failed to spawn FCM listener: ${err.message}`);
      setState(userId, { status: "error", message: err.message });
    });

    child.on("exit", (code) => {
      const state = listeners.get(userId);
      if (state && (state.status === "listening" || state.status === "starting")) {
        const msg = code === 0
          ? "FCM listener process finished."
          : `FCM listener process exited with code ${code}.`;
        setState(userId, { status: "expired", message: msg });
      }
    });

  } catch (error) {
    const message = error instanceof Error ? error.message : "FCM pairing listener failed";
    setState(userId, { status: "error", message });
  }

  return getPairingListenerStatus(userId);
}
