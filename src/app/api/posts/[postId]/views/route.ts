// app/api/posts/[postId]/views/route.ts
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function POST(
  req: Request,
  { params: { postId } }: { params: { postId: string } },
) {
  try {
    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 조회 기록이 있는지 확인하고 없으면 생성
    await prisma.view.upsert({
      where: {
        userId_postId: {
          userId: loggedInUser.id,
          postId,
        },
      },
      create: {
        userId: loggedInUser.id,
        postId,
      },
      update: {}, // 이미 존재하면 아무것도 하지 않음
    });

    return new Response(null, { status: 200 });
  } catch (error) {
    console.error("View creation error:", error);
    return Response.json({ error: "Failed to create view" }, { status: 500 });
  }
}
