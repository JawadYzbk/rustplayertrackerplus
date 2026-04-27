import { prisma } from "@/lib/prisma";
import { computeAnalytics } from "@/lib/analytics";
import {
  requireCurrentUserId,
  unauthorizedJsonResponse,
} from "@/lib/current-user";
import { NextRequest } from "next/server";

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

  const player = await prisma.player.findUnique({
    where: { userId_id: { userId, id } },
    include: { server: { select: { name: true } } },
  });

  if (!player) {
    return Response.json({ error: "Player not found" }, { status: 404 });
  }

  const analytics = await computeAnalytics(userId, id);

  return Response.json({ player, analytics });
}
