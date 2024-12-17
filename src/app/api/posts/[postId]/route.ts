import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params: { postId } }: { params: { postId: string } },
) {
  try {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 },
    );
  }
}

//admin Post 에서 지우는 API
