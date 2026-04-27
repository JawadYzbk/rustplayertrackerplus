import { prisma } from "@/lib/prisma";
import { computeAnalytics } from "@/lib/analytics";
import { NextRequest } from "next/server";

// Cache analytics for 30 seconds
export const revalidate = 30;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const player = await prisma.player.findUnique({
    where: { id },
    include: { server: { select: { name: true } } },
  });

  if (!player) {
    return Response.json({ error: "Player not found" }, { status: 404 });
  }

  const analytics = await computeAnalytics(id);

  return Response.json({ player, analytics });
}
