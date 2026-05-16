import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireCurrentUserId, unauthorizedJsonResponse } from "@/lib/current-user";

export async function GET() {
  let userId: string;
  try {
    userId = await requireCurrentUserId();
  } catch {
    return unauthorizedJsonResponse();
  }

  try {
    const groups = await prisma.playerGroup.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
      include: {
        _count: {
          select: { players: true }
        }
      }
    });

    return NextResponse.json(groups);
  } catch (error) {
    console.error("Error fetching groups:", error);
    return NextResponse.json(
      { error: "Failed to fetch groups" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  let userId: string;
  try {
    userId = await requireCurrentUserId();
  } catch {
    return unauthorizedJsonResponse();
  }

  try {
    const { name, color } = await req.json();

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    // Generate a unique ID for the group
    const groupId = crypto.randomUUID();

    const group = await prisma.playerGroup.create({
      data: {
        id: groupId,
        userId,
        name,
        color: color || null,
      },
    });

    return NextResponse.json(group);
  } catch (error) {
    console.error("Error creating group:", error);
    return NextResponse.json(
      { error: "Failed to create group" },
      { status: 500 }
    );
  }
}