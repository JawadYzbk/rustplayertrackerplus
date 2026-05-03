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

const StartPairingSchema = z.object({
  authToken: z.string().min(1).optional(),
  credentialsCommand: z.string().min(1).optional(),
  gcmAndroidId: z.string().min(1).optional(),
  gcmSecurityToken: z.string().min(1).optional(),
  steamId: z.string().min(1).optional(),
  issuedDate: z.coerce.number().int().optional(),
  expireDate: z.coerce.number().int().optional(),
  listenMs: z.number().int().min(15_000).max(300_000).optional(),
});

function parseCredentialsCommand(command: string) {
  const pairs = [...command.matchAll(/([a-z_]+):([^\s]+)/g)];
  const map = new Map<string, string>();
  for (const [, key, value] of pairs) {
    map.set(key, value);
  }

  const gcmAndroidId = map.get("gcm_android_id");
  const gcmSecurityToken = map.get("gcm_security_token");

  return {
    gcmAndroidId,
    gcmSecurityToken,
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
  return Response.json({ status });
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
    listenMs,
  } = parsed.data;

  let status;
  if (authToken) {
    status = await startPairingListener(userId, authToken, listenMs);
  } else {
    const parsedCommand = credentialsCommand
      ? parseCredentialsCommand(credentialsCommand)
      : null;

    const resolvedAndroidId = gcmAndroidId || parsedCommand?.gcmAndroidId;
    const resolvedSecurityToken = gcmSecurityToken || parsedCommand?.gcmSecurityToken;

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
      },
      listenMs
    );
  }
  return Response.json({ status });
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
