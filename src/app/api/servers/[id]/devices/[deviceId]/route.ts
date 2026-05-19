import { prisma } from "@/lib/prisma";
import {
  requireCurrentUserId,
  unauthorizedJsonResponse,
} from "@/lib/current-user";
import { NextRequest } from "next/server";
import { z } from "zod";
import { setDeviceState } from "@/lib/rustplus-manager";

const UpdateDeviceSchema = z.object({
  name: z.string().trim().min(1).optional(),
  customCommand: z.string().trim().min(1).nullable().optional(),
  isActive: z.boolean().optional(),
  icon: z.string().trim().min(1).nullable().optional(),
});

const ControlDeviceSchema = z.object({
  state: z.boolean(),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; deviceId: string }> }
) {
  let userId: string;
  try {
    userId = await requireCurrentUserId();
  } catch {
    return unauthorizedJsonResponse();
  }

  const { id: serverId, deviceId: id } = await params;
  const parsed = ControlDeviceSchema.safeParse(await req.json());
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  try {
    await setDeviceState(userId, serverId, id, parsed.data.state);
    return Response.json({ success: true });
  } catch (error) {
    console.error(`Failed to control device ${id}:`, error);
    return Response.json(
      { error: error instanceof Error ? error.message : "Failed to control device" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; deviceId: string }> }
) {
  let userId: string;
  try {
    userId = await requireCurrentUserId();
  } catch {
    return unauthorizedJsonResponse();
  }

  const { deviceId: id } = await params;
  const parsed = UpdateDeviceSchema.safeParse(await req.json());
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const updated = await prisma.smartDevice.update({
      where: { userId_id: { userId, id } },
      data: parsed.data,
    });
    return Response.json(updated);
  } catch (error) {
    console.error(`Failed to update device ${id}:`, error);
    return Response.json({ error: "Failed to update device" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string; deviceId: string }> }
) {
  let userId: string;
  try {
    userId = await requireCurrentUserId();
  } catch {
    return unauthorizedJsonResponse();
  }

  const { deviceId: id } = await params;
  try {
    await prisma.smartDevice.delete({
      where: { userId_id: { userId, id } },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(`Failed to delete device ${id}:`, error);
    return Response.json({ error: "Failed to delete device" }, { status: 500 });
  }
}
