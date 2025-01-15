// import { validateRequest } from "@/auth";
// import prisma from "@/lib/prisma";
// import { CommentsPage, getCommentDataInclude } from "@/lib/types";
// import { NextRequest } from "next/server";

// export async function GET(
//   req: NextRequest,
//   { params: { postId } }: { params: { postId: string } },
// ) {
//   try {
//     const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

//     const pageSize = 5;

//     const { user } = await validateRequest();

//     if (!user) {
//       return Response.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const comments = await prisma.comment.findMany({
//       where: { postId },
//       include: getCommentDataInclude(user.id),
//       orderBy: { createdAt: "asc" },
//       take: -pageSize - 1,
//       cursor: cursor ? { id: cursor } : undefined,
//     });

//     const previousCursor = comments.length > pageSize ? comments[0].id : null;

//     const data: CommentsPage = {
//       comments: comments.length > pageSize ? comments.slice(1) : comments,
//       previousCursor,
//     };

//     return Response.json(data);
//   } catch (error) {
//     console.error(error);
//     return Response.json({ error: "Internal server error" }, { status: 500 });
//   }
// }

// import { validateRequest } from "@/auth";
// import prisma from "@/lib/prisma";
// import { CommentsPage, getCommentDataInclude } from "@/lib/types";
// import { NextRequest } from "next/server";

// export async function GET(
//   req: NextRequest,
//   { params: { postId } }: { params: { postId: string } },
// ) {
//   try {
//     const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
//     const pageSize = 5;

//     const { user } = await validateRequest();

//     if (!user) {
//       return Response.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // 최상위 댓글만 먼저 가져옴 (parentId가 null인 댓글)
//     const comments = await prisma.comment.findMany({
//       where: {
//         postId,
//         parentId: null, // 최상위 댓글만 조회
//       },
//       include: {
//         ...getCommentDataInclude(user.id),
//         // 대댓글 정보도 함께 가져오기
//         replies: {
//           include: {
//             ...getCommentDataInclude(user.id),
//             // 대댓글의 대댓글도 가져오기
//             replies: {
//               include: getCommentDataInclude(user.id),
//             },
//           },
//           orderBy: {
//             createdAt: "asc",
//           },
//         },
//       },
//       orderBy: {
//         createdAt: "desc", // 최신 댓글이 위로 오도록 변경
//       },
//       take: -pageSize - 1,
//       cursor: cursor ? { id: cursor } : undefined,
//     });

//     const previousCursor = comments.length > pageSize ? comments[0].id : null;

//     const data: CommentsPage = {
//       comments: comments.length > pageSize ? comments.slice(1) : comments,
//       previousCursor,
//     };

//     return Response.json(data);
//   } catch (error) {
//     console.error(error);
//     return Response.json({ error: "Internal server error" }, { status: 500 });
//   }
// }

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { CommentsPage, getCommentDataInclude } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { postId } }: { params: { postId: string } },
) {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    const pageSize = 5;

    const { user } = await validateRequest();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const comments = await prisma.comment.findMany({
      where: { postId, parentId: null },
      include: {
        ...getCommentDataInclude(user.id),
        replies: {
          include: {
            ...getCommentDataInclude(user.id),
          },
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
      take: -pageSize - 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const processedComments = comments.map((comment) => ({
      ...comment,
      content:
        comment.content === null ? "댓글이 삭제되었습니다" : comment.content,
    }));

    const previousCursor =
      processedComments.length > pageSize ? processedComments[0].id : null;

    const data: CommentsPage = {
      comments:
        processedComments.length > pageSize
          ? processedComments.slice(1)
          : processedComments,
      previousCursor,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
