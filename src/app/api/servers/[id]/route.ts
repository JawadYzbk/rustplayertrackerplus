import { prisma } from "@/lib/prisma";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const server = await prisma.server.findUnique({ where: { id } });
  if (!server) {
    return Response.json({ error: "Server not found" }, { status: 404 });
  }

  await prisma.server.delete({ where: { id } });
  return new Response(null, { status: 204 });
}
