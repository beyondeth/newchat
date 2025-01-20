// // app/api/chat/publish/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { validateRequest } from "@/auth";
// import prisma from "@/lib/prisma";

// export async function POST(request: NextRequest) {
//   const { user, session } = await validateRequest();
//   if (!user || !session) {
//     return new Response("Unauthorized", { status: 401 });
//   }

//   const baseUrl = process.env.UPSTASH_REDIS_REST_URL;
//   const token = process.env.UPSTASH_REDIS_REST_TOKEN;

//   if (!baseUrl || !token) {
//     return new Response("Redis configuration missing", { status: 500 });
//   }

//   try {
//     const { roomId, message } = await request.json();

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

//     // Redis 채널에 메시지 발행
//     await fetch(`${baseUrl}/publish/chat:room:${roomId}`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify([JSON.stringify(message)]),
//     });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("메시지 발행 오류:", error);
//     return new Response("메시지 발행 실패", { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import pusher from "@/lib/pusher";

export async function POST(request: NextRequest) {
  const { user, session } = await validateRequest();
  if (!user || !session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const baseUrl = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!baseUrl || !token) {
    return new Response("Redis configuration missing", { status: 500 });
  }

  try {
    const { roomId, message } = await request.json();

    // 채팅방 접근 권한 확인
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

    // Redis 채널에 메시지 발행
    await fetch(`${baseUrl}/publish/chat:room:${roomId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([JSON.stringify(message)]),
    });

    // Pusher를 통해 메시지 발행
    await pusher.trigger(`chat_room_${roomId}`, "message", message);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("메시지 발행 오류:", error);
    return new Response("메시지 발행 실패", { status: 500 });
  }
}
