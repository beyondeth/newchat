// app/api/posts/[postId]/view/route.ts
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";

export async function POST(
  request: NextRequest,
  { params: { postId } }: { params: { postId: string } },
) {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 이미 해당 포스트를 본 적이 있는지 확인
    const existingView = await prisma.view.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId: postId,
        },
      },
    });

    // 이미 본 적이 없다면 새로운 view 레코드 생성
    if (!existingView) {
      await prisma.view.create({
        data: {
          userId: user.id,
          postId: postId,
        },
      });
    }

    // 총 조회수 반환
    const viewCount = await prisma.view.count({
      where: {
        postId: postId,
      },
    });

    return Response.json({ viewCount });
  } catch (error) {
    console.error("Error recording view:", error);
    return Response.json({ error: "Failed to record view" }, { status: 500 });
  }
}
