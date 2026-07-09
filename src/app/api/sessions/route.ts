import { prisma } from "@/lib/prisma";
import {
  requireCurrentUserId,
  unauthorizedJsonResponse,
} from "@/lib/current-user";
import { NextRequest } from "next/server";
import { z } from "zod";

const QuerySchema = z.object({
  playerId: z.string().optional(),
  serverId: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(1000).default(50),
});

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

  const { playerId, serverId, startDate, endDate, page, limit } = parsed.data;
  const skip = (page - 1) * limit;

  const where: any = { userId };
  if (playerId) where.playerId = playerId;
  if (serverId) where.serverId = serverId;

  if (startDate || endDate) {
    const filterConditions: any[] = [];
    if (endDate) {
      filterConditions.push({ joinedAt: { lte: new Date(endDate) } });
    }
    if (startDate) {
      filterConditions.push({
        OR: [
          { leftAt: null },
          { leftAt: { gte: new Date(startDate) } },
        ],
      });
    }
    if (filterConditions.length > 0) {
      where.AND = filterConditions;
    }
  }

  const [sessions, total] = await Promise.all([
    prisma.session.findMany({
      where,
      orderBy: { joinedAt: "desc" },
      skip,
      take: limit,
      include: {
        player: { select: { name: true } },
        server: { select: { name: true } },
      },
    }),
    prisma.session.count({ where }),
  ]);

  return Response.json({ data: sessions, total, page, limit });
}
