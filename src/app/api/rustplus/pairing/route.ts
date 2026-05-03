import {
  requireCurrentUserId,
  unauthorizedJsonResponse,
} from "@/lib/current-user";
import {
  getPairingListenerStatus,
  startPairingListener,
  stopPairingListener,
} from "@/lib/rustplus-pairing";
import { NextRequest } from "next/server";
import { z } from "zod";

const StartPairingSchema = z.object({
  authToken: z.string().min(1, "Rust+ auth token is required"),
  listenMs: z.number().int().min(15_000).max(300_000).optional(),
});

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

  const status = await startPairingListener(
    userId,
    parsed.data.authToken,
    parsed.data.listenMs
  );
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
