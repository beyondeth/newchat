// // app/api/chat/block/route.ts
// import { validateRequest } from "@/auth";
// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { z } from "zod";

// const blockSchema = z.object({
//   blockedId: z.string(),
//   reason: z.string().optional(),
// });

// export async function POST(request: Request) {
//   try {
//     const { user } = await validateRequest();
//     if (!user) {
//       return new Response("Unauthorized", { status: 401 });
//     }

//     const body = await request.json();
//     const { blockedId, reason } = blockSchema.parse(body);

//     // 자기 자신을 차단하려는 경우
//     if (user.id === blockedId) {
//       return new Response("자기 자신을 차단할 수 없습니다", { status: 400 });
//     }

//     // 이미 차단된 사용자인지 확인
//     const existingBlock = await prisma.userBlock.findUnique({
//       where: {
//         blockerId_blockedId: {
//           blockerId: user.id,
//           blockedId: blockedId,
//         },
//       },
//     });

//     if (existingBlock) {
//       return new Response("이미 차단된 사용자입니다", { status: 400 });
//     }

//     // 트랜잭션으로 차단 처리
//     await prisma.$transaction(async (tx) => {
//       // 1. 차단 데이터 생성
//       await tx.userBlock.create({
//         data: {
//           blockerId: user.id,
//           blockedId: blockedId,
//           reason: reason,
//         },
//       });

//       // 2. 해당 사용자와의 1:1 채팅방 차단 처리
//       await tx.chatRoom.updateMany({
//         where: {
//           type: "DIRECT",
//           participants: {
//             every: {
//               userId: {
//                 in: [user.id, blockedId],
//               },
//             },
//           },
//         },
//         data: {
//           isBlocked: true,
//           blockedAt: new Date(),
//           blockedById: user.id,
//           blockReason: reason,
//         },
//       });
//     });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("사용자 차단 실패:", error);
//     if (error instanceof z.ZodError) {
//       return new Response("잘못된 요청 데이터입니다", { status: 400 });
//     }
//     return new Response("서버 오류가 발생했습니다", { status: 500 });
//   }
// }

// app/api/chat/block/route.ts
import { validateRequest } from "@/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

const blockSchema = z.object({
  blockedId: z.string(),
});

export async function POST(request: Request) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { blockedId } = blockSchema.parse(await request.json());

    // 이미 차단된 사용자인지 확인
    const existingBlock = await prisma.userBlock.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: user.id,
          blockedId,
        },
      },
    });

    if (existingBlock) {
      return new Response("User is already blocked", { status: 400 });
    }

    await prisma.$transaction(async (tx) => {
      // 차단 생성
      await tx.userBlock.create({
        data: {
          blockerId: user.id,
          blockedId,
        },
      });

      // 채팅방 차단 처리
      await tx.chatRoom.updateMany({
        where: {
          type: "DIRECT",
          participants: {
            every: {
              userId: {
                in: [user.id, blockedId],
              },
            },
          },
        },
        data: {
          isBlocked: true,
          blockedAt: new Date(),
          blockedById: user.id,
        },
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data", { status: 400 });
    }
    console.error("Failed to block user:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
