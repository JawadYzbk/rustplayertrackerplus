import { NextRequest } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  try {
    const headers: Record<string, string> = {};
    if (process.env.BATTLEMETRICS_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.BATTLEMETRICS_TOKEN}`;
    }

    const { data } = await axios.get(
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
      .filter((inc: any) => inc.type === "player")
      .map((p: any) => ({
        id: p.id,
        name: p.attributes.name,
        sessionStart: sessionMap.get(p.id) || null,
      }));

    return Response.json(players);
  } catch (error) {
    return Response.json({ error: "Failed to fetch live players" }, { status: 500 });
  }
}
