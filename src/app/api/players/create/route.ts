import { prisma } from "@/lib/prisma";
import {
  ensureAppUser,
  requireCurrentUserId,
  unauthorizedJsonResponse,
} from "@/lib/current-user";
import { NextRequest } from "next/server";
import { z } from "zod";
import axios from "axios";

const CreatePlayerSchema = z.object({
  id: z.string().min(1, "Player ID required"),
  serverId: z.string().min(1, "Server ID required"),
  name: z.string().optional(),
  sessionStart: z.string().optional(),
});

export async function POST(req: NextRequest) {
  let userId: string;
  try {
    userId = await requireCurrentUserId();
  } catch {
    return unauthorizedJsonResponse();
  }

  const body = await req.json();
  const parsed = CreatePlayerSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { id, serverId, name, sessionStart } = parsed.data;

  const existing = await prisma.player.findUnique({
    where: { userId_id: { userId, id } },
  });
  if (existing) {
    if (!existing.isTracking) {
      const updated = await prisma.player.update({
        where: { userId_id: { userId, id } },
        data: { isTracking: true, serverId, name: name || existing.name },
      });
      return Response.json(updated, { status: 200 });
    }
    return Response.json({ error: "Player is already tracked" }, { status: 409 });
  }

  // Ensure server exists
  const server = await prisma.server.findUnique({
    where: { userId_id: { userId, id: serverId } },
  });
  if (!server) {
    return Response.json({ error: "Server does not exist in tracker" }, { status: 400 });
  }

  let playerName = name || `Unknown Player ${id}`;
  if (!name) {
    try {
      const headers: Record<string, string> = {};
      if (process.env.BATTLEMETRICS_TOKEN) {
        headers["Authorization"] = `Bearer ${process.env.BATTLEMETRICS_TOKEN}`;
      }
      const { data } = await axios.get(`https://api.battlemetrics.com/players/${id}`, { headers });
      if (data?.data?.attributes?.name) {
        playerName = data.data.attributes.name;
      }
    } catch (err) {
      console.error(`Failed to fetch player name for ${id}`, err);
    }
  }

  await ensureAppUser(userId);

  const player = await prisma.player.create({
    data: {
      userId,
      id,
      name: playerName,
      serverId,
      firstSeen: new Date(),
      lastSeen: new Date(),
    },
  });

  if (sessionStart) {
    const openSession = await prisma.session.findFirst({
      where: { userId, playerId: id, serverId, leftAt: null },
    });
    if (!openSession) {
      await prisma.session.create({
        data: { userId, playerId: id, serverId, joinedAt: new Date(sessionStart) },
      });
    }
  }

  return Response.json(player, { status: 201 });
}
