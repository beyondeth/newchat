// import { validateRequest } from "@/auth";
// import { NextResponse } from "next/server";
// import { redisChat } from "@/lib/redis";
// import prisma from "@/lib/prisma";
// import { z } from "zod";
// import { sendMessageSchema } from "@/lib/validation";
// import { RedisChatMessage } from "@/lib/chattypes";

// export async function POST(
//   request: Request,
//   { params }: { params: { roomId: string } },
// ) {
//   const roomId = params.roomId;

//   try {
//     const { user } = await validateRequest();
//     if (!user) {
//       return new Response("Unauthorized", { status: 401 });
//     }

//     const body = await request.json();
//     const { content, type } = sendMessageSchema.parse({
//       ...body,
//       chatRoomId: roomId,
//     });

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

//     const message = {
//       id: crypto.randomUUID(),
//       content,
//       type,
//       userId: user.id,
//       chatRoomId: roomId,
//       createdAt: Date.now(),
//       readBy: [user.id],
//     };

//     // Redis에 메시지 저장 및 발행
//     await redisChat.saveMessage(roomId, message as RedisChatMessage);

//     // 채팅방 마지막 메시지 시간 업데이트
//     await prisma.chatRoom.update({
//       where: { id: roomId },
//       data: { lastMessageAt: new Date() },
//     });

//     return NextResponse.json(message);
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return new Response("Invalid request data", { status: 400 });
//     }
//     console.error("Failed to send message:", error);
//     return new Response("Internal Server Error", { status: 500 });
//   }
// }

// app/api/chat/rooms/[roomId]/send/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { validateRequest } from "@/auth";
// import prisma from "@/lib/prisma";
// import { redisChat } from "@/lib/redis";
// import { v4 as uuidv4 } from "uuid";
// import { ChatMessageType } from "@/lib/chattypes";

// export async function POST(
//   request: NextRequest,
//   { params }: { params: { roomId: string } }
// ) {
//   const { user, session } = await validateRequest();
//   if (!user || !session) {
//     return new Response("Unauthorized", { status: 401 });
//   }

//   try {
//     const { content, type } = await request.json();
//     const roomId = params.roomId;

//     // 채팅방 접근 권한 확인
//     const chatRoom = await prisma.chatRoom.findFirst({
//       where: {
//         id: roomId,
//         participants: {
//           some: {
//             userId: user.id,
//           },
//         },
//       },
//     });

//     if (!chatRoom) {
//       return new Response("Unauthorized access to chat room", { status: 403 });
//     }

//     const message = {
//       id: uuidv4(),
//       content,
//       type: type || ChatMessageType.TEXT,
//       userId: user.id,
//       chatRoomId: roomId,
//       createdAt: Date.now(),
//       readBy: [user.id],
//     };

//     // Redis에 메시지 저장
//     await redisChat.saveMessage(roomId, message);

//     // 메시지 발행
//     const publishResponse = await fetch("/api/chat/publish", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ roomId, message }),
//     });

//     if (!publishResponse.ok) {
//       throw new Error("메시지 발행 실패");
//     }

//     return NextResponse.json(message);
//   } catch (error) {
//     console.error("메시지 전송 오류:", error);
//     return new Response("메시지 전송 실패", { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { redisChat } from "@/lib/redis";
import { v4 as uuidv4 } from "uuid";
import { ChatMessageType } from "@/lib/chattypes";

export async function POST(
  request: NextRequest,
  { params }: { params: { roomId: string } },
) {
  const { user, session } = await validateRequest();
  if (!user || !session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { content, type } = await request.json();
    const roomId = params.roomId;

    const chatRoom = await prisma.chatRoom.findFirst({
      where: {
        id: roomId,
        participants: {
          some: {
            userId: user.id,
          },
        },
      },
    });

    if (!chatRoom) {
      return new Response("Unauthorized access to chat room", { status: 403 });
    }

    const message = {
      id: uuidv4(),
      content,
      type: type || ChatMessageType.TEXT,
      userId: user.id,
      chatRoomId: roomId,
      createdAt: Date.now(),
      readBy: [user.id],
    };

    // Redis에 메시지 저장 및 발행
    await redisChat.saveMessage(roomId, message);
    await redisChat.publishMessage(roomId, message);

    return NextResponse.json(message);
  } catch (error) {
    console.error("메시지 전송 오류:", error);
    return new Response("메시지 전송 실패", { status: 500 });
  }
}
