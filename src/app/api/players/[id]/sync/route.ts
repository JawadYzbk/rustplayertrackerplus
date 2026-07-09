import { prisma } from "@/lib/prisma";
import {
  requireCurrentUserId,
  unauthorizedJsonResponse,
} from "@/lib/current-user";
import { NextRequest } from "next/server";
import { fetchAndSaveBMSessions } from "../../create/route";

export async function POST(
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

  try {
    const player = await prisma.player.findUnique({
      where: { userId_id: { userId, id } },
    });

    if (!player) {
      return Response.json({ error: "Player not found" }, { status: 404 });
    }

    if (!process.env.BATTLEMETRICS_TOKEN) {
      return Response.json({ error: "Battlemetrics API token is missing in server environment" }, { status: 400 });
    }

    const synced = await fetchAndSaveBMSessions(userId, id, player.serverId);

    if (!synced) {
      return Response.json(
        { error: "Sync failed. The player history could not be retrieved. Ensure token is valid and player has active Battlemetrics data." },
        { status: 400 }
      );
    }

    const updatedPlayer = await prisma.player.update({
      where: { userId_id: { userId, id } },
      data: { bmSynced: true },
    });

    return Response.json({ success: true, player: updatedPlayer });
  } catch (error) {
    console.error(`Failed to manually sync player ${id}:`, error);
    return Response.json({ error: "Internal server error during manual sync" }, { status: 500 });
  }
}
