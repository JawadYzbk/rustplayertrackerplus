import { prisma } from "@/lib/prisma";
import {
  requireCurrentUserId,
  unauthorizedJsonResponse,
} from "@/lib/current-user";
import { NextRequest } from "next/server";
import { z } from "zod";

const QuerySchema = z.object({
  serverId: z.string().optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(200).default(50),
});

const ONLINE_THRESHOLD_MS = 120_000;

export async function GET(req: NextRequest) {
  let userId: string;
  try {
    userId = await requireCurrentUserId();
  } catch {
    return unauthorizedJsonResponse();
  }

  const raw = Object.fromEntries(req.nextUrl.searchParams.entries());
  const parsed = QuerySchema.safeParse(raw);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { serverId, search, page, limit } = parsed.data;
  const skip = (page - 1) * limit;

  const where: {
    userId: string;
    serverId?: string;
    name?: { contains: string; mode: "insensitive" };
  } = { userId };
  if (serverId) where.serverId = serverId;
  if (search) where.name = { contains: search, mode: "insensitive" };

  const [players, total] = await Promise.all([
    prisma.player.findMany({
      where,
      orderBy: { lastSeen: "desc" },
      skip,
      take: limit,
      include: { server: { select: { name: true } } },
    }),
    prisma.player.count({ where }),
  ]);

  const now = Date.now();
  const result = players.map((p) => ({
    ...p,
    isOnline: now - p.lastSeen.getTime() < ONLINE_THRESHOLD_MS,
  }));

  return Response.json({ data: result, total, page, limit });
}
