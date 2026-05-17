import { prisma } from "@/lib/prisma";
import {
  requireCurrentUserId,
  unauthorizedJsonResponse,
} from "@/lib/current-user";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  let userId: string;
  try {
    userId = await requireCurrentUserId();
  } catch {
    return unauthorizedJsonResponse();
  }

  const { id: serverId } = await params;

  const devices = await prisma.smartDevice.findMany({
    where: { userId, serverId },
    orderBy: { createdAt: "desc" },
  });

  return Response.json(devices);
}
