import { prisma } from "@/lib/prisma";
import {
  requireCurrentUserId,
  unauthorizedJsonResponse,
} from "@/lib/current-user";
import { getDeviceState } from "@/lib/rustplus-manager";

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

  // Enrich with live state if possible
  const enrichedDevices = await Promise.all(
    devices.map(async (device) => {
      try {
        const state = await getDeviceState(userId, serverId, device.id);
        return {
          ...device,
          value: state?.payload?.value ?? false,
          capacity: state?.payload?.capacity,
          amount: state?.payload?.amount,
        };
      } catch (err) {
        return { ...device, value: false };
      }
    })
  );

  return Response.json(enrichedDevices);
}
