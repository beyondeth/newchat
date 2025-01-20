// // api/chat/rooms/[roomId]/messages/route.ts

// import { validateRequest } from "@/auth";
// import { NextResponse } from "next/server";
// import { redisChat } from "@/lib/redis";
// import prisma from "@/lib/prisma";

// export async function GET(
//   request: Request,
//   { params }: { params: { roomId: string } },
// ) {
//   const roomId = params.roomId;

//   if (!roomId) {
//     return new Response("Room ID is required", { status: 400 });
//   }

//   try {
//     const { user } = await validateRequest();
//     if (!user) {
//       return new Response("Unauthorized", { status: 401 });
//     }

//     // 채팅방 참여 여부 확인
//     const participant = await prisma.chatParticipant.findUnique({
//       where: {
//         userId_chatRoomId: {
//           userId: user.id,
//           chatRoomId: roomId,
//         },
//       },
//     });

//     if (!participant) {
//       return new Response("Not a participant of this chat room", {
//         status: 403,
//       });
//     }

//     // Redis에서 메시지 조회
//     const messages = await redisChat.getMessages(roomId);

//     return NextResponse.json({ messages });
//   } catch (error) {
//     console.error("Failed to get messages:", error);
//     return new Response("Internal Server Error", { status: 500 });
//   }
// }

import { validateRequest } from "@/auth";
import { NextResponse } from "next/server";
import { redisChat } from "@/lib/redis";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { roomId: string } },
) {
  const roomId = params.roomId;

  if (!roomId) {
    return new Response("Room ID is required", { status: 400 });
  }

  try {
    const { user } = await validateRequest();
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    // 채팅방 참여 여부 확인
    const participant = await prisma.chatParticipant.findUnique({
      where: {
        userId_chatRoomId: {
          userId: user.id,
          chatRoomId: roomId,
        },
      },
    });

    if (!participant) {
      return new Response("Not a participant of this chat room", {
        status: 403,
      });
    }

    // Redis에서 메시지 조회
    const messages = await redisChat.getMessages(roomId);

    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Failed to get messages:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
