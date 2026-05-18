import { prisma } from "@/lib/prisma";
import {
  requireCurrentUserId,
  unauthorizedJsonResponse,
} from "@/lib/current-user";
import { touchConnection, getDeviceState } from "@/lib/rustplus-manager";

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

  if (devices.length === 0) {
    return Response.json([]);
  }

  // Pre-establish connection before querying device states
  await touchConnection(userId, serverId).catch(() => {});

  // Enrich with live state if possible
  const enrichedDevices = await Promise.allSettled(
    devices.map(async (device) => {
      try {
        const state = await getDeviceState(userId, serverId, device.id);
        return {
          ...device,
          value: state?.payload?.value ?? false,
          capacity: state?.payload?.capacity,
          amount: state?.payload?.amount,
        };
      } catch {
        return { ...device, value: false };
      }
    })
  );

  const results = enrichedDevices.map((r) =>
    r.status === "fulfilled" ? r.value : { ...devices[0], value: false }
  );

  return Response.json(results);
}
