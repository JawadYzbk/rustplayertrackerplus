import { prisma } from "@/lib/prisma";
import {
  requireCurrentUserId,
  unauthorizedJsonResponse,
} from "@/lib/current-user";
import { NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
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
    // We don't delete the player record to keep sessions/data.
    // Instead, we just stop tracking them.
    await prisma.player.update({
      where: { userId_id: { userId, id } },
      data: { isTracking: false },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(`Failed to stop tracking player ${id}:`, error);
    return Response.json({ error: "Failed to stop tracking player" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let userId: string;
  try {
    userId = await requireCurrentUserId();
  } catch {
    return unauthorizedJsonResponse();
  }

  const { id } = await params;
  const body = await req.json();

  try {
    const player = await prisma.player.update({
      where: { userId_id: { userId, id } },
      data: body, // For now allow updating any field, e.g. isTracking
    });

    return Response.json(player);
  } catch (error) {
    console.error(`Failed to update player ${id}:`, error);
    return Response.json({ error: "Failed to update player" }, { status: 500 });
  }
}
