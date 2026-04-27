import { prisma } from "@/lib/prisma";
import {
  requireCurrentUserId,
  unauthorizedJsonResponse,
} from "@/lib/current-user";

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
