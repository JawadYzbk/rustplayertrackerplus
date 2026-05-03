import axios from "axios";
import { prisma } from "@/lib/prisma";
import { ensureAppUser } from "@/lib/current-user";
import { randomUUID } from "crypto";

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

interface ListenerState {
  userId: string;
  startedAt: number;
  expiresAt: number;
  status: "starting" | "listening" | "completed" | "expired" | "error";
  message: string;
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

  const numericPort = Number(pairing.port);
  const existingById = await prisma.server.findUnique({
    where: { userId_id: { userId, id: pairing.id } },
  });

  if (existingById) {
    await prisma.server.update({
      where: { userId_id: { userId, id: pairing.id } },
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
      id: pairing.id,
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
  listeners.set(userId, { ...current, ...patch });
}

export function getPairingListenerStatus(userId: string) {
  const state = listeners.get(userId);
  if (!state) return null;
  return {
    startedAt: state.startedAt,
    expiresAt: state.expiresAt,
    status: state.status,
    message: state.message,
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
    const pushReceiverClientModule = (await import("@liamcottle/push-receiver/src/client")) as {
      default: new (
        androidId: string,
        securityToken: string,
        appIds: string[]
      ) => {
        on(event: "ON_DATA_RECEIVED", listener: (data: unknown) => void): void;
        connect(): Promise<void>;
        destroy(): void;
      };
    };

    const fcmCredentials = await androidFcmModule.register(
      FCM_API_KEY,
      FCM_PROJECT_ID,
      FCM_GCM_SENDER_ID,
      FCM_GMS_APP_ID,
      FCM_ANDROID_PACKAGE_NAME,
      FCM_ANDROID_PACKAGE_CERT
    );
    const expoPushToken = await getExpoPushToken(fcmCredentials.fcm.token);
    await registerWithRustPlus(authToken, expoPushToken);

    const client = new pushReceiverClientModule.default(
      fcmCredentials.gcm.androidId,
      fcmCredentials.gcm.securityToken,
      []
    );

    let timer: ReturnType<typeof setTimeout> | null = null;
    const cleanup = (finalStatus: ListenerState["status"], message: string) => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      try {
        client.destroy();
      } catch {
        // ignore destroy errors
      }
      setState(userId, { status: finalStatus, message });
    };

    listeners.set(userId, {
      userId,
      startedAt,
      expiresAt,
      status: "listening",
      message: "Listening for Rust+ pairing notification...",
      lastPairing: null,
      stop: () => cleanup("expired", "Pairing listener stopped."),
    });

    client.on("ON_DATA_RECEIVED", async (data) => {
      const pairing = extractServerPairing(data);
      if (!pairing) return;

      await upsertServerFromPairing(userId, pairing);
      setState(userId, {
        lastPairing: pairing,
        status: "completed",
        message: `Paired server ${pairing.name || pairing.id} and saved credentials.`,
      });
      cleanup("completed", `Paired server ${pairing.name || pairing.id}.`);
    });

    timer = setTimeout(() => {
      cleanup("expired", "Pairing window expired before receiving a server pairing.");
    }, listenMs);

    await client.connect();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Rust+ pairing listener failed";
    setState(userId, { status: "error", message });
  }

  return getPairingListenerStatus(userId);
}
