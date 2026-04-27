import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { z } from "zod";

const QuerySchema = z.object({
  playerId: z.string().optional(),
  serverId: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(200).default(50),
});

export async function GET(req: NextRequest) {
  const raw = Object.fromEntries(req.nextUrl.searchParams.entries());
  const parsed = QuerySchema.safeParse(raw);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { playerId, serverId, page, limit } = parsed.data;
  const skip = (page - 1) * limit;

  const where: any = {};
  if (playerId) where.playerId = playerId;
  if (serverId) where.serverId = serverId;

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
