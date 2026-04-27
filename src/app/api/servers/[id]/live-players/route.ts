import { prisma } from "@/lib/prisma";
import {
  requireCurrentUserId,
  unauthorizedJsonResponse,
} from "@/lib/current-user";
import { NextRequest } from "next/server";
import axios from "axios";

interface LivePlayerIncluded {
  type: string;
  id: string;
  attributes?: {
    name?: string;
    start?: string;
  };
  relationships?: {
    player?: {
      data?: {
        id?: string;
      };
    };
  };
}

interface LivePlayerResponse {
  included?: LivePlayerIncluded[];
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  let userId: string;
  try {
    userId = await requireCurrentUserId();
  } catch {
    return unauthorizedJsonResponse();
  }

  const id = (await params).id;
  const server = await prisma.server.findUnique({
    where: { userId_id: { userId, id } },
    select: { id: true },
  });
  if (!server) {
    return Response.json({ error: "Server not found" }, { status: 404 });
  }

  try {
    const headers: Record<string, string> = {};
    if (process.env.BATTLEMETRICS_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.BATTLEMETRICS_TOKEN}`;
    }

    const { data } = await axios.get<LivePlayerResponse>(
      `https://api.battlemetrics.com/servers/${id}?include=player,session`,
      { headers }
    );

    const included = data.included || [];

    const sessionMap = new Map<string, string>();
    for (const inc of included) {
      if (inc.type === "session" && inc.attributes?.start && inc.relationships?.player?.data?.id) {
        sessionMap.set(inc.relationships.player.data.id, inc.attributes.start);
      }
    }

    const players = included
      .filter((inc) => inc.type === "player")
      .map((p) => ({
        id: p.id,
        name: p.attributes?.name || "Unknown",
        sessionStart: sessionMap.get(p.id) || null,
      }));

    return Response.json(players);
  } catch {
    return Response.json({ error: "Failed to fetch live players" }, { status: 500 });
  }
}
