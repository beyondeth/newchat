import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getPostDataInclude, getUserDataSelect, PostsPage } from "@/lib/types";
import { NextRequest } from "next/server";
import { Prisma } from "@prisma/client";

const basePostInclude = {
  user: {
    select: getUserDataSelect(""), // 빈 문자열을 전달하여 followers 배열이 비어있게 함
  },
  attachments: true,
  likes: {
    where: {
      userId: "", // 절대 매칭되지 않을 userId
    },
    select: {
      userId: true,
    },
  },
  bookmarks: {
    where: {
      userId: "",
    },
    select: {
      userId: true,
    },
  },
  views: {
    where: {
      userId: "",
    },
    select: {
      userId: true,
    },
  },
  _count: {
    select: {
      likes: true,
      comments: true,
      views: true,
    },
  },
} satisfies Prisma.PostInclude;

export async function GET(req: NextRequest) {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    const pageSize = 10;
    const { user } = await validateRequest();

    const posts = await prisma.post.findMany({
      include: user ? getPostDataInclude(user.id) : basePostInclude,
      orderBy: { createdAt: "desc" },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor = posts.length > pageSize ? posts[pageSize].id : null;

    const data: PostsPage = {
      posts: posts.slice(0, pageSize),
      nextCursor,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
