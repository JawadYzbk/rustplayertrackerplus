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
      const synced = await fetchAndSaveBMSessions(userId, id, serverId);
      if (synced) {
        const finalUpdated = await prisma.player.update({
          where: { userId_id: { userId, id } },
          data: { bmSynced: true }
        });
        return Response.json(finalUpdated, { status: 200 });
      }
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

  const token = process.env.BATTLEMETRICS_TOKEN;
  if (!token) {
    return Response.json({ error: "Battlemetrics API token is missing in server environment" }, { status: 400 });
  }

  let playerName = name || `Unknown Player ${id}`;
  if (!name) {
    try {
      const { data } = await axios.get(`https://api.battlemetrics.com/players/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

  const synced = await fetchAndSaveBMSessions(userId, id, serverId);
  let finalPlayer = player;
  if (synced) {
    finalPlayer = await prisma.player.update({
      where: { userId_id: { userId, id } },
      data: { bmSynced: true }
    });
  }

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

  return Response.json(finalPlayer, { status: 201 });
}

export async function fetchAndSaveBMSessions(userId: string, playerId: string, serverId: string): Promise<boolean> {
  const token = process.env.BATTLEMETRICS_TOKEN;
  if (!token) return false;

  try {
    const sessionsToCreate: {
      userId: string;
      playerId: string;
      serverId: string;
      joinedAt: Date;
      leftAt: Date | null;
      durationSec: number | null;
    }[] = [];

    let nextUrl: string | null = `https://api.battlemetrics.com/sessions?filter[players]=${playerId}&filter[servers]=${serverId}&page[size]=100`;
    let pagesFetched = 0;
    const maxPages = 5;
    let anySuccess = false;

    while (nextUrl && pagesFetched < maxPages) {
      const response: any = await axios.get(nextUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const resData = response.data;
      if (!resData?.data || !Array.isArray(resData.data)) break;

      anySuccess = true;

      for (const item of resData.data) {
        if (item.type !== "session") continue;
        const start = item.attributes?.start;
        if (!start) continue;

        const stop = item.attributes?.stop;
        const joinedAt = new Date(start);
        const leftAt = stop ? new Date(stop) : null;
        const durationSec = leftAt ? Math.round((leftAt.getTime() - joinedAt.getTime()) / 1000) : null;

        sessionsToCreate.push({
          userId,
          playerId,
          serverId,
          joinedAt,
          leftAt,
          durationSec,
        });
      }

      nextUrl = resData.links?.next || null;
      pagesFetched++;
    }

    if (sessionsToCreate.length > 0) {
      const existingSessions = await prisma.session.findMany({
        where: { userId, playerId, serverId },
        select: { joinedAt: true },
      });
      const existingJoinedAts = new Set(existingSessions.map(s => s.joinedAt.getTime()));

      const uniqueSessions = sessionsToCreate.filter(s => !existingJoinedAts.has(s.joinedAt.getTime()));

      if (uniqueSessions.length > 0) {
        await prisma.session.createMany({
          data: uniqueSessions,
        });
        console.log(`Successfully populated ${uniqueSessions.length} historical sessions for player ${playerId} on server ${serverId}`);
      }
    }
    
    return anySuccess;
  } catch (err) {
    console.error(`Failed to fetch and save Battlemetrics sessions for player ${playerId}:`, err);
    return false;
  }
}

