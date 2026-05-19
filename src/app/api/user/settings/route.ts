import { prisma } from "@/lib/prisma";
import {
  requireCurrentUserId,
  unauthorizedJsonResponse,
} from "@/lib/current-user";
import { NextRequest } from "next/server";
import { z } from "zod";

const UpdateUserSchema = z.object({
  notificationPrefix: z.string().trim().min(1).max(20).optional(),
  commandPrefix: z.string().trim().length(1).optional(),
});

export async function GET() {
  let userId: string;
  try {
    userId = await requireCurrentUserId();
  } catch {
    return unauthorizedJsonResponse();
  }

  const user = await prisma.appUser.findUnique({
    where: { id: userId },
    select: { notificationPrefix: true, commandPrefix: true },
  });

  return Response.json(user);
}

export async function PATCH(req: NextRequest) {
  let userId: string;
  try {
    userId = await requireCurrentUserId();
  } catch {
    return unauthorizedJsonResponse();
  }

  const parsed = UpdateUserSchema.safeParse(await req.json());
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const updated = await prisma.appUser.update({
      where: { id: userId },
      data: parsed.data,
    });
    return Response.json(updated);
  } catch (error) {
    console.error("Failed to update user:", error);
    return Response.json({ error: "Failed to update user" }, { status: 500 });
  }
}
