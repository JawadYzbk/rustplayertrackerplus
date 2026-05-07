import {
  requireCurrentUserId,
  unauthorizedJsonResponse,
} from "@/lib/current-user";
import {
  getPairingListenerStatus,
  startPairingListener,
  startPairingListenerFromFcmCredentials,
  stopPairingListener,
} from "@/lib/rustplus-pairing";
import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const StartPairingSchema = z.object({
  authToken: z.string().min(1).optional(),
  credentialsCommand: z.string().min(1).optional(),
  gcmAndroidId: z.string().min(1).optional(),
  gcmSecurityToken: z.string().min(1).optional(),
  steamId: z.string().min(1).optional(),
  issuedDate: z.coerce.number().int().optional(),
  expireDate: z.coerce.number().int().optional(),
  listenMs: z.number().int().min(15_000).max(300_000).optional(),
  fcmCredentials: z.any().optional(),
});

function parseFcmCredentials(input: any) {
  if (!input || typeof input !== "object") return null;

  // Handle rustplusplus bot format or raw fcm_credentials.json
  const gcm = input.gcm || input;
  const androidId = gcm.androidId || gcm.gcm_android_id || input.gcm_android_id;
  const securityToken = gcm.securityToken || gcm.gcm_security_token || input.gcm_security_token;
  const steamId = input.steam_id || input.steamId;
  const issuedDate = input.issued_date || input.issuedDate;
  const expireDate = input.expire_date || input.expireDate;

  return {
    gcmAndroidId: androidId ? String(androidId) : undefined,
    gcmSecurityToken: securityToken ? String(securityToken) : undefined,
    steamId: steamId ? String(steamId) : undefined,
    issuedDate: issuedDate ? Number(issuedDate) : undefined,
    expireDate: expireDate ? Number(expireDate) : undefined,
  };
}

function parseCredentialsCommand(command: string) {
  const pairs = [...command.matchAll(/([a-z_]+):([^\s]+)/g)];
  const map = new Map<string, string>();
  for (const [, key, value] of pairs) {
    map.set(key, value);
  }

  const gcmAndroidId = map.get("gcm_android_id");
  const gcmSecurityToken = map.get("gcm_security_token");
  const steamId = map.get("steam_id");
  const issuedDate = map.get("issued_date");
  const expireDate = map.get("expire_date");

  return {
    gcmAndroidId,
    gcmSecurityToken,
    steamId,
    issuedDate: issuedDate ? Number(issuedDate) : undefined,
    expireDate: expireDate ? Number(expireDate) : undefined,
  };
}

export async function GET() {
  let userId: string;
  try {
    userId = await requireCurrentUserId();
  } catch {
    return unauthorizedJsonResponse();
  }

  const status = getPairingListenerStatus(userId);
  const user = await prisma.appUser.findUnique({
    where: { id: userId },
    select: { fcmAndroidId: true, fcmSteamId: true, fcmExpiresAt: true },
  });

  return Response.json({
    status,
    fcm: user
      ? {
          hasSavedCredentials: !!user.fcmAndroidId,
          steamId: user.fcmSteamId,
          expiresAt: user.fcmExpiresAt?.toISOString(),
        }
      : null,
  });
}

export async function POST(req: NextRequest) {
  let userId: string;
  try {
    userId = await requireCurrentUserId();
  } catch {
    return unauthorizedJsonResponse();
  }

  const parsed = StartPairingSchema.safeParse(await req.json());
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const {
    authToken,
    credentialsCommand,
    gcmAndroidId,
    gcmSecurityToken,
    steamId,
    issuedDate,
    expireDate,
    listenMs,
    fcmCredentials,
  } = parsed.data;

  try {
    let status;
    if (authToken) {
      status = await startPairingListener(userId, authToken, listenMs);
    } else {
      const parsedCommand = credentialsCommand
        ? parseCredentialsCommand(credentialsCommand)
        : null;
      
      const parsedJson = fcmCredentials
        ? parseFcmCredentials(fcmCredentials)
        : null;

      let resolvedAndroidId = gcmAndroidId || parsedCommand?.gcmAndroidId || parsedJson?.gcmAndroidId;
      let resolvedSecurityToken = gcmSecurityToken || parsedCommand?.gcmSecurityToken || parsedJson?.gcmSecurityToken;

      // If still no credentials, check DB
      if (!resolvedAndroidId || !resolvedSecurityToken) {
        const user = await prisma.appUser.findUnique({
          where: { id: userId },
          select: { fcmAndroidId: true, fcmSecurityToken: true },
        });
        if (user?.fcmAndroidId && user?.fcmSecurityToken) {
          resolvedAndroidId = user.fcmAndroidId;
          resolvedSecurityToken = user.fcmSecurityToken;
        }
      }

      if (!resolvedAndroidId || !resolvedSecurityToken) {
        return Response.json(
          {
            error:
              "Provide authToken OR FCM credentials (gcmAndroidId + gcmSecurityToken) or a valid /credentials add command",
          },
          { status: 400 }
        );
      }

      status = await startPairingListenerFromFcmCredentials(
        userId,
        {
          gcmAndroidId: resolvedAndroidId,
          gcmSecurityToken: resolvedSecurityToken,
          steamId: steamId || parsedCommand?.steamId || parsedJson?.steamId,
          issuedDate: issuedDate || parsedCommand?.issuedDate || parsedJson?.issuedDate,
          expireDate: expireDate || parsedCommand?.expireDate || parsedJson?.expireDate,
        },
        listenMs
      );
    }
    return Response.json({ status });
  } catch (error) {
    console.error("Pairing API error:", error);
    return Response.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  let userId: string;
  try {
    userId = await requireCurrentUserId();
  } catch {
    return unauthorizedJsonResponse();
  }

  stopPairingListener(userId);
  return new Response(null, { status: 204 });
}
