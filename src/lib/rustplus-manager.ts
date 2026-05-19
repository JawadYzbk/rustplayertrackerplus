import { prisma } from "./prisma";
import RustPlus from "./rustplus-ts-client";

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

function getNumericEntityId(deviceId: string): number {
  if (/^\d+$/.test(deviceId)) {
    return parseInt(deviceId, 10);
  }
  throw new Error(`Device ID "${deviceId}" is not a valid numeric entity ID. The device was paired before a bug fix — re-pair it from the Servers page.`);
}

const COMMAND_PREFIX = "!";
const IDLE_TIMEOUT_MS = 10 * 60_000; // 10 minutes
const ENTITY_CALL_TIMEOUT_MS = 5_000;

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

async function waitForConnection(entry: ConnectionEntry, timeoutMs = 10000): Promise<void> {
  if (entry.isConnected) return;
  const deadline = Date.now() + timeoutMs;
  while (!entry.isConnected && Date.now() < deadline) {
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  if (!entry.isConnected) {
    throw new Error("Rust+ connection timeout");
  }
}

/**
 * Directly control a smart device state.
 */
export async function setDeviceState(userId: string, serverId: string, deviceId: string, state: boolean) {
  const server = await prisma.server.findUnique({
    where: { userId_id: { userId, id: serverId } },
  });

  if (!server || !server.rustPlusIp || !server.rustPlusPort || !server.rustPlusPlayerId || !server.rustPlusPlayerToken) {
    throw new Error("Server or Rust+ credentials not found");
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

  await waitForConnection(entry);
  entry.lastUsed = Date.now();

  const idToUse = getNumericEntityId(deviceId);

  return Promise.race([
    new Promise((resolve, reject) => {
      entry.client.setEntityValue(idToUse, state, (res: any) => {
        if (res.error) {
          reject(new Error(res.error.error || "Failed to set device state"));
        } else {
          resolve(res);
        }
      });
    }),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Device control timeout")), ENTITY_CALL_TIMEOUT_MS)
    ),
  ]);
}

interface AppEntityInfo {
  type: number;
  payload: {
    value?: boolean;
    capacity?: number;
    amount?: number;
    hasProtection?: boolean;
    protectionExpiry?: number;
  };
}

/**
 * Get current info/state for a smart device.
 */
export async function getDeviceState(userId: string, serverId: string, deviceId: string): Promise<AppEntityInfo | null> {
  const server = await prisma.server.findUnique({
    where: { userId_id: { userId, id: serverId } },
  });

  if (!server || !server.rustPlusIp || !server.rustPlusPort || !server.rustPlusPlayerId || !server.rustPlusPlayerToken) {
    throw new Error("Server or Rust+ credentials not found");
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

  await waitForConnection(entry);
  entry.lastUsed = Date.now();
  
  const idToUse = getNumericEntityId(deviceId);

  return Promise.race([
    new Promise<AppEntityInfo | null>((resolve, reject) => {
      entry.client.getEntityInfo(idToUse, (res: any) => {
        if (res.error) {
          reject(new Error(res.error.error || "Failed to get device state"));
        } else if (res.response?.entityInfo) {
          resolve(res.response.entityInfo);
        } else {
          resolve(null);
        }
      });
    }),
    new Promise<null>((_, reject) =>
      setTimeout(() => reject(new Error("Device state timeout")), ENTITY_CALL_TIMEOUT_MS)
    ),
  ]);
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
  if (!message || typeof message !== "string") return;

  // We need to find the serverId for THIS specific user that matches this connection
  const user = await prisma.appUser.findUnique({
    where: { id: userId },
    select: { notificationPrefix: true, commandPrefix: true },
  });

  if (!user) return;

  const cmdPrefix = user.commandPrefix || "!";
  if (!message.startsWith(cmdPrefix)) return;

  const server = await prisma.server.findFirst({
    where: {
      userId,
      rustPlusIp: entry.serverKey.split(":")[0],
      rustPlusPort: Number(entry.serverKey.split(":")[1]),
    }
  });

  if (!server) return;

  const prefix = user.notificationPrefix || "[Tracker]";
  const parts = message.slice(cmdPrefix.length).trim().split(/\s+/);
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);

  if (command === "on" || command === "off" || command === "status") {
    const deviceName = args.join(" ").toLowerCase();
    if (!deviceName) {
      if (entry.isConnected) {
        entry.client.sendTeamMessage(`${prefix} Usage: ${cmdPrefix}${command} <device name or custom command>`);
      }
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
      if (entry.isConnected) {
        entry.client.sendTeamMessage(`${prefix} Device "${deviceName}" not found or disabled.`);
      }
      return;
    }

    let entityId: number;
    try {
      entityId = getNumericEntityId(device.id);
    } catch {
      if (entry.isConnected) {
        entry.client.sendTeamMessage(`${prefix} Device "${deviceName}" needs re-pairing.`);
      }
      return;
    }

    const displayName = device.customCommand || device.name;

    if (command === "status") {
      entry.client.getEntityInfo(entityId, (res: any) => {
        if (!entry.isConnected) return;
        if (res.error) {
          entry.client.sendTeamMessage(`${prefix} Error: ${res.error.error}`);
        } else if (res.response?.entityInfo) {
          const val = res.response.entityInfo.payload?.value;
          const statusStr = val === true ? "ON" : val === false ? "OFF" : "UNKNOWN";
          entry.client.sendTeamMessage(`${prefix} ${displayName} is currently ${statusStr}.`);
        }
      });
      return;
    }

    entry.client.setEntityValue(entityId, command === "on", (res: any) => {
      if (!entry.isConnected) return;
      if (res.error) {
        entry.client.sendTeamMessage(`${prefix} Error: ${res.error.error}`);
      } else {
        entry.client.sendTeamMessage(`${prefix} Turned ${command.toUpperCase()} ${displayName}.`);
      }
    });
  } else if (command === "devices") {
    const devices = await prisma.smartDevice.findMany({
      where: { userId, serverId: server.id, isActive: true },
      select: { name: true, customCommand: true, type: true },
    });
    if (!entry.isConnected) return;
    const list = devices.map(d => {
      const cmd = d.customCommand ? ` (!${d.customCommand})` : "";
      return `${d.name}${cmd}`;
    }).join(", ");
    entry.client.sendTeamMessage(devices.length ? `${prefix} Active Devices: ${list}` : `${prefix} No active devices paired.`);
  } else {
    // If command is none of the above, check if it matches a customCommand for a device (TOGGLE)
    const device = await prisma.smartDevice.findFirst({
      where: { 
        userId, 
        serverId: server.id, 
        isActive: true,
        customCommand: { equals: command, mode: "insensitive" }
      },
    });

    if (device) {
      let entityId: number;
      try {
        entityId = getNumericEntityId(device.id);
      } catch { return; }

      // Get current state then toggle
      entry.client.getEntityInfo(entityId, (infoRes: any) => {
        if (!entry.isConnected) return;
        if (infoRes.response?.entityInfo) {
          const currentState = infoRes.response.entityInfo.payload?.value;
          const newState = !currentState;
          entry.client.setEntityValue(entityId, newState, (res: any) => {
            if (!entry.isConnected) return;
            const displayName = device.customCommand || device.name;
            if (res.error) {
              entry.client.sendTeamMessage(`${prefix} Error: ${res.error.error}`);
            } else {
              entry.client.sendTeamMessage(`${prefix} Toggled ${displayName} ${newState ? "ON" : "OFF"}.`);
            }
          });
        }
      });
    }
  }
}
