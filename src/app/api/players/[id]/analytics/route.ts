import { prisma } from "@/lib/prisma";
import { computeAnalytics } from "@/lib/analytics";
import {
  requireCurrentUserId,
  unauthorizedJsonResponse,
} from "@/lib/current-user";
import { NextRequest } from "next/server";
import { z } from "zod";

const QuerySchema = z.object({
  timezoneOffsetMinutes: z.coerce.number().int().min(-840).max(840).default(0),
});

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let userId: string;
  try {
    userId = await requireCurrentUserId();
  } catch {
    return unauthorizedJsonResponse();
  }

  const { id } = await params;
  const parsed = QuerySchema.safeParse({
    timezoneOffsetMinutes: _req.nextUrl.searchParams.get("timezoneOffsetMinutes") ?? 0,
  });
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const player = await prisma.player.findUnique({
    where: { userId_id: { userId, id } },
    include: { server: { select: { name: true } } },
  });

  if (!player) {
    return Response.json({ error: "Player not found" }, { status: 404 });
  }

  const analytics = await computeAnalytics(userId, id, parsed.data.timezoneOffsetMinutes);

  return Response.json({ player, analytics });
}
