import { prisma } from "./prisma";
// @ts-ignore
import RustPlus from "@liamcottle/rustplus.js";

// Polyfill XMLHttpRequest for protobufjs in Node.js
if (typeof XMLHttpRequest === "undefined") {
  // @ts-ignore
  global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
}

interface ConnectionEntry {
  key: string;             // hash of ip:port:playerId:playerToken
  serverKey: string;       // ip:port (for sharing global data)
  client: any;
  isConnected: boolean;
  lastUsed: number;
  activeUsers: Set<string>; // userIds currently "watching" this connection
}

// Memory-efficient pools
const connectionPool = new Map<string, ConnectionEntry>();
const serverSharedData = new Map<string, any>(); // Cache for map/markers per serverKey

const COMMAND_PREFIX = "!";
const IDLE_TIMEOUT_MS = 10 * 60_000; // 10 minutes

export async function startRustPlusManager() {
  console.log("[RustPlusManager] Starting optimizer...");
  
  // Cleanup idle connections every minute
  setInterval(() => void cleanupIdleConnections(), 60_000);
}

/**
 * Called by API routes or the UI to ensure a connection is active.
 * "Touches" the connection to prevent it from timing out.
 */
export async function touchConnection(userId: string, serverId: string) {
  const server = await prisma.server.findUnique({
    where: { userId_id: { userId, id: serverId } },
  });

  if (!server || !server.rustPlusIp || !server.rustPlusPort || !server.rustPlusPlayerId || !server.rustPlusPlayerToken) {
    return;
  }

  const credKey = `${server.rustPlusIp}:${server.rustPlusPort}:${server.rustPlusPlayerId}:${server.rustPlusPlayerToken}`;
  const serverKey = `${server.rustPlusIp}:${server.rustPlusPort}`;

  let entry = connectionPool.get(credKey);

  if (!entry) {
    entry = await createConnection(credKey, serverKey, {
      ip: server.rustPlusIp,
      port: server.rustPlusPort,
      playerId: server.rustPlusPlayerId,
      playerToken: server.rustPlusPlayerToken,
    });
  }

  entry.lastUsed = Date.now();
  entry.activeUsers.add(userId);
}

async function createConnection(credKey: string, serverKey: string, creds: any) {
  console.log(`[RustPlusManager] Creating new WS for ${credKey.substring(0, 20)}...`);
  
  const client = new RustPlus(creds.ip, String(creds.port), creds.playerId, creds.playerToken);
  
  const entry: ConnectionEntry = {
    key: credKey,
    serverKey,
    client,
    isConnected: false,
    lastUsed: Date.now(),
    activeUsers: new Set(),
  };

  connectionPool.set(credKey, entry);

  client.on("connected", () => {
    entry.isConnected = true;
    console.log(`[RustPlusManager] Connected: ${credKey.substring(0, 20)}`);
    
    // Designated "Data Provider" logic:
    // If no one is providing data for this serverKey yet, this connection takes the lead.
    if (!serverSharedData.has(serverKey)) {
      serverSharedData.set(serverKey, { provider: credKey, lastUpdate: Date.now() });
      void startSharedDataPolling(entry);
    }
  });

  client.on("message", (msg: any) => {
    if (msg.broadcast?.teamMessage) {
      const message = msg.broadcast.teamMessage.message.message;
      const playerId = msg.broadcast.teamMessage.message.steamId;
      // When a message comes in, we handle it for ALL users sharing this connection
      for (const userId of entry.activeUsers) {
        // Find which serverId this user maps to for this connection
        void handleTeamMessage(userId, entry, playerId, message);
      }
    }
  });

  client.on("disconnected", () => {
    entry.isConnected = false;
    connectionPool.delete(credKey);
    if (serverSharedData.get(serverKey)?.provider === credKey) {
      serverSharedData.delete(serverKey);
    }
  });

  client.on("error", (err: any) => {
    console.error(`[RustPlusManager] WS Error (${credKey.substring(0, 20)}):`, err);
  });

  try {
    client.connect();
  } catch (err) {
    connectionPool.delete(credKey);
  }

  return entry;
}

async function startSharedDataPolling(entry: ConnectionEntry) {
  // This connection is the "Data Provider" for its server.
  // It fetches global info (markers, time) once and we could cache it.
  // For now, it just ensures the connection is active.
  const poll = () => {
    if (!entry.isConnected || !connectionPool.has(entry.key)) return;
    
    entry.client.getInfo((info: any) => {
      // We could store 'info' in serverSharedData to share across users
      serverSharedData.get(entry.serverKey).data = info;
    });

    setTimeout(poll, 30_000); // Poll shared data every 30s
  };

  poll();
}

async function cleanupIdleConnections() {
  const now = Date.now();
  for (const [key, entry] of connectionPool.entries()) {
    if (now - entry.lastUsed > IDLE_TIMEOUT_MS) {
      console.log(`[RustPlusManager] Closing idle connection: ${key.substring(0, 20)}`);
      try { entry.client.disconnect(); } catch {}
      connectionPool.delete(key);
      if (serverSharedData.get(entry.serverKey)?.provider === key) {
        serverSharedData.delete(entry.serverKey);
      }
    }
  }
}

async function handleTeamMessage(userId: string, entry: ConnectionEntry, playerSteamId: string, message: string) {
  if (!message || typeof message !== "string" || !message.startsWith(COMMAND_PREFIX)) return;

  // We need to find the serverId for THIS specific user that matches this connection
  const server = await prisma.server.findFirst({
    where: {
      userId,
      rustPlusIp: entry.serverKey.split(":")[0],
      rustPlusPort: Number(entry.serverKey.split(":")[1]),
    }
  });

  if (!server) return;

  const parts = message.slice(COMMAND_PREFIX.length).trim().split(/\s+/);
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);

  if (command === "on" || command === "off") {
    const deviceName = args.join(" ").toLowerCase();
    if (!deviceName) {
      entry.client.sendTeamMessage(`[Tracker] Usage: ${COMMAND_PREFIX}${command} <device name or custom command>`);
      return;
    }

    const device = await prisma.smartDevice.findFirst({
      where: { 
        userId, 
        serverId: server.id, 
        isActive: true,
        OR: [
          { customCommand: { equals: deviceName, mode: "insensitive" } },
          { name: { contains: deviceName, mode: "insensitive" } },
        ],
      },
    });

    if (!device) {
      entry.client.sendTeamMessage(`[Tracker] Device "${deviceName}" not found or disabled.`);
      return;
    }

    entry.client.setEntityValue(device.id, command === "on", (res: any) => {
      if (res.error) {
        entry.client.sendTeamMessage(`[Tracker] Error: ${res.error.error}`);
      } else {
        const displayName = device.customCommand || device.name;
        entry.client.sendTeamMessage(`[Tracker] Turned ${command} ${displayName}.`);
      }
    });
  } else if (command === "devices") {
    const devices = await prisma.smartDevice.findMany({
      where: { userId, serverId: server.id, isActive: true },
      select: { name: true, customCommand: true, type: true },
    });
    const list = devices.map(d => {
      const cmd = d.customCommand ? ` (!${d.customCommand})` : "";
      return `${d.name}${cmd}`;
    }).join(", ");
    entry.client.sendTeamMessage(devices.length ? `[Tracker] Active Devices: ${list}` : "[Tracker] No active devices paired.");
  }
}
