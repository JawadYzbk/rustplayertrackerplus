import { prisma } from "@/lib/prisma";
import {
  ensureAppUser,
  requireCurrentUserId,
  unauthorizedJsonResponse,
} from "@/lib/current-user";
import { NextRequest } from "next/server";
import { z } from "zod";
import axios from "axios";

const CreateServerSchema = z.object({
  id: z.string().min(1, "Server ID required"),
});

export async function GET() {
  let userId: string;
  try {
    userId = await requireCurrentUserId();
  } catch {
    return unauthorizedJsonResponse();
  }

  const servers = await prisma.server.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { players: true, sessions: true } },
    },
  });
  return Response.json(servers);
}

export async function POST(req: NextRequest) {
  let userId: string;
  try {
    userId = await requireCurrentUserId();
  } catch {
    return unauthorizedJsonResponse();
  }

  const body = await req.json();
  const parsed = CreateServerSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { id } = parsed.data;

  const existing = await prisma.server.findUnique({
    where: { userId_id: { userId, id } },
  });
  if (existing) {
    return Response.json({ error: "Server already exists" }, { status: 409 });
  }

  let name = `Rust Server ${id}`;
  try {
    const headers: Record<string, string> = {};
    if (process.env.BATTLEMETRICS_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.BATTLEMETRICS_TOKEN}`;
    }
    const { data } = await axios.get(`https://api.battlemetrics.com/servers/${id}`, { headers });
    if (data?.data?.attributes?.name) {
      name = data.data.attributes.name;
    }
  } catch (err) {
    console.error(`Failed to fetch server name for ${id}`, err);
  }

  await ensureAppUser(userId);

  const server = await prisma.server.create({
    data: { userId, id, name },
  });
  return Response.json(server, { status: 201 });
}
