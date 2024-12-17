// app/api/admin/users/[userId]/toggle-admin/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
  request: Request,
  { params: { userId } }: { params: { userId: string } },
) {
  try {
    const body = await request.json();

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { isAdmin: body.isAdmin },
      select: {
        id: true,
        username: true,
        isAdmin: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user admin status:", error);
    return NextResponse.json(
      { error: "Failed to update user admin status" },
      { status: 500 },
    );
  }
}
