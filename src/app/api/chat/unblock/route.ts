// // app/api/chat/unblock/route.ts
// import { validateRequest } from "@/auth";
// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { z } from "zod";

// const unblockSchema = z.object({
//   blockedId: z.string(),
// });

// export async function POST(request: Request) {
//   try {
//     const { user } = await validateRequest();
//     if (!user) {
//       return new Response("Unauthorized", { status: 401 });
//     }

//     const body = await request.json();
//     const { blockedId } = unblockSchema.parse(body);

//     // 차단 데이터 확인
//     const block = await prisma.userBlock.findUnique({
//       where: {
//         blockerId_blockedId: {
//           blockerId: user.id,
//           blockedId: blockedId,
//         },
//       },
//     });

//     if (!block) {
//       return new Response("차단되지 않은 사용자입니다", { status: 400 });
//     }

//     // 트랜잭션으로 차단 해제 처리
//     await prisma.$transaction(async (tx) => {
//       // 1. 차단 데이터 삭제
//       await tx.userBlock.delete({
//         where: {
//           blockerId_blockedId: {
//             blockerId: user.id,
//             blockedId: blockedId,
//           },
//         },
//       });

//       // 2. 해당 사용자와의 1:1 채팅방 차단 해제
//       await tx.chatRoom.updateMany({
//         where: {
//           type: "DIRECT",
//           blockedById: user.id,
//           participants: {
//             every: {
//               userId: {
//                 in: [user.id, blockedId],
//               },
//             },
//           },
//         },
//         data: {
//           isBlocked: false,
//           blockedAt: null,
//           blockedById: null,
//           blockReason: null,
//         },
//       });
//     });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("차단 해제 실패:", error);
//     if (error instanceof z.ZodError) {
//       return new Response("잘못된 요청 데이터입니다", { status: 400 });
//     }
//     return new Response("서버 오류가 발생했습니다", { status: 500 });
//   }
// }

// app/api/chat/unblock/route.ts
import { validateRequest } from "@/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

const unblockSchema = z.object({
  blockedId: z.string(),
});

export async function POST(request: Request) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { blockedId } = unblockSchema.parse(await request.json());

    await prisma.$transaction(async (tx) => {
      // 차단 해제
      await tx.userBlock.delete({
        where: {
          blockerId_blockedId: {
            blockerId: user.id,
            blockedId,
          },
        },
      });

      // 채팅방 차단 해제
      await tx.chatRoom.updateMany({
        where: {
          type: "DIRECT",
          blockedById: user.id,
          participants: {
            every: {
              userId: {
                in: [user.id, blockedId],
              },
            },
          },
        },
        data: {
          isBlocked: false,
          blockedAt: null,
          blockedById: null,
          blockReason: null,
        },
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data", { status: 400 });
    }
    console.error("Failed to unblock user:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
