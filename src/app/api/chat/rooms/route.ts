// // app/api/chat/rooms/route.ts
// import { validateRequest } from "@/auth";
// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { chatRoomSelect } from "@/lib/chattypes";

// export async function GET(request: Request) {
//   try {
//     const { user } = await validateRequest();
//     if (!user) {
//       return new Response("Unauthorized", { status: 401 });
//     }

//     const { searchParams } = new URL(request.url);
//     const cursor = searchParams.get("cursor");
//     const limit = 20;

//     const rooms = await prisma.chatRoom.findMany({
//       where: {
//         participants: {
//           some: { userId: user.id },
//         },
//       },
//       select: chatRoomSelect,
//       orderBy: { lastMessageAt: "desc" },
//       take: limit + 1,
//       skip: cursor ? 1 : 0,
//       cursor: cursor ? { id: cursor } : undefined,
//     });

//     let nextCursor: string | null = null;
//     if (rooms.length > limit) {
//       const nextItem = rooms.pop();
//       nextCursor = nextItem!.id;
//     }

//     return NextResponse.json({ rooms, nextCursor });
//   } catch (error) {
//     console.error("채팅방 목록 조회 실패:", error);
//     return new Response("서버 오류가 발생했습니다", { status: 500 });
//   }
// }

// app/api/chat/rooms/route.ts
import { validateRequest } from "@/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { chatRoomSelect } from "@/lib/chattypes";

export async function GET(request: Request) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const rooms = await prisma.chatRoom.findMany({
      where: {
        participants: {
          some: {
            userId: user.id,
          },
        },
      },
      select: chatRoomSelect,
      orderBy: {
        lastMessageAt: "desc",
      },
    });

    return NextResponse.json(rooms);
  } catch (error) {
    console.error("Failed to get chat rooms:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// 새 채팅방 생성
// app/api/chat/rooms/route.ts
export async function POST(request: Request) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { participantId } = await request.json();

    // 이미 존재하는 1:1 채팅방 확인
    const existingRoom = await prisma.chatRoom.findFirst({
      where: {
        type: "DIRECT",
        AND: [
          {
            participants: {
              some: {
                userId: user.id,
              },
            },
          },
          {
            participants: {
              some: {
                userId: participantId,
              },
            },
          },
        ],
      },
    });

    if (existingRoom) {
      return NextResponse.json({ roomId: existingRoom.id });
    }

    // 새 채팅방 생성
    const newRoom = await prisma.chatRoom.create({
      data: {
        type: "DIRECT",
        participants: {
          create: [{ userId: user.id }, { userId: participantId }],
        },
      },
    });

    return NextResponse.json({ roomId: newRoom.id });
  } catch (error) {
    console.error("Failed to create chat room:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
