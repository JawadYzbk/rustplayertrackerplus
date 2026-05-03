import { prisma } from "@/lib/prisma";
import {
  requireCurrentUserId,
  unauthorizedJsonResponse,
} from "@/lib/current-user";
import { NextRequest } from "next/server";
import { z } from "zod";

const UpdateServerRustPlusSchema = z.object({
  rustPlusIp: z.string().trim().min(1).nullable().optional(),
  rustPlusPort: z.coerce.number().int().min(1).max(65535).nullable().optional(),
  rustPlusPlayerId: z.string().trim().min(1).nullable().optional(),
  rustPlusPlayerToken: z.string().trim().min(1).nullable().optional(),
});

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  let userId: string;
  try {
    userId = await requireCurrentUserId();
  } catch {
    return unauthorizedJsonResponse();
  }

  const { id } = await params;

  const server = await prisma.server.findUnique({
    where: { userId_id: { userId, id } },
  });
  if (!server) {
    return Response.json({ error: "Server not found" }, { status: 404 });
  }

  await prisma.server.delete({ where: { userId_id: { userId, id } } });
  return new Response(null, { status: 204 });
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
  const parsed = UpdateServerRustPlusSchema.safeParse(await req.json());
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const updateData = parsed.data;
  try {
    const updated = await prisma.server.update({
      where: { userId_id: { userId, id } },
      data: {
        rustPlusIp: updateData.rustPlusIp ?? null,
        rustPlusPort: updateData.rustPlusPort ?? null,
        rustPlusPlayerId: updateData.rustPlusPlayerId ?? null,
        rustPlusPlayerToken: updateData.rustPlusPlayerToken ?? null,
      },
    });

    return Response.json(updated);
  } catch (error) {
    console.error(`Failed to update Rust+ config for server ${id}:`, error);
    return Response.json({ error: "Failed to update server" }, { status: 500 });
  }
}
