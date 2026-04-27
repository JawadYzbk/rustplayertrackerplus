import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function getCurrentUserId(): Promise<string | null> {
  const { userId } = await auth();
  return userId;
}

export async function requireCurrentUserId(): Promise<string> {
  const userId = await getCurrentUserId();
  if (!userId) {
    throw new Error("UNAUTHORIZED");
  }

  return userId;
}

export function unauthorizedJsonResponse() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}

export async function ensureAppUser(userId: string) {
  await prisma.appUser.upsert({
    where: { id: userId },
    update: {},
    create: { id: userId },
  });
}
