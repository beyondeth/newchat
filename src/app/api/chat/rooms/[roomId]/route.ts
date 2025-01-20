// api/chat/rooms/[roomId]/route.ts

import { validateRequest } from "@/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { chatRoomSelect } from "@/lib/chattypes";

export async function GET(
  request: Request,
  { params }: { params: { roomId: string } },
) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const room = await prisma.chatRoom.findUnique({
      where: {
        id: params.roomId,
        participants: {
          some: {
            userId: user.id,
          },
        },
      },
      select: chatRoomSelect,
    });

    if (!room) {
      return new Response("Chat room not found", { status: 404 });
    }

    return NextResponse.json(room);
  } catch (error) {
    console.error("Failed to get chat room:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
