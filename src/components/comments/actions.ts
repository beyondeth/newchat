// "use server";

// import { validateRequest } from "@/auth";
// import prisma from "@/lib/prisma";
// import { getCommentDataInclude, PostData } from "@/lib/types";
// import { createCommentSchema } from "@/lib/validation";

// export async function submitComment({
//   post,
//   content,
// }: {
//   post: PostData;
//   content: string;
// }) {
//   const { user } = await validateRequest();

//   if (!user) throw new Error("Unauthorized");

//   const { content: contentValidated } = createCommentSchema.parse({ content });

//   const newComment = await prisma.comment.create({
//     data: {
//       content: contentValidated,
//       postId: post.id,
//       userId: user.id,
//     },
//     include: getCommentDataInclude(user.id),
//   });

//   return newComment;
// }

// export async function deleteComment(id: string) {
//   const { user } = await validateRequest();

//   if (!user) throw new Error("Unauthorized");

//   const comment = await prisma.comment.findUnique({
//     where: { id },
//   });

//   if (!comment) throw new Error("Comment not found");

//   if (comment.userId !== user.id) throw new Error("Unauthorized");

//   const deletedComment = await prisma.comment.delete({
//     where: { id },
//     include: getCommentDataInclude(user.id),
//   });

//   return deletedComment;
// }

// "use server";

// import { validateRequest } from "@/auth";
// import prisma from "@/lib/prisma";
// import { getCommentDataInclude, PostData } from "@/lib/types";
// import { createCommentSchema } from "@/lib/validation";

// export async function submitComment({
//   post,
//   content,
// }: {
//   post: PostData;
//   content: string;
// }) {
//   const { user } = await validateRequest();

//   if (!user) throw new Error("Unauthorized");

//   const { content: contentValidated } = createCommentSchema.parse({ content });

//   const [newComment] = await prisma.$transaction([
//     prisma.comment.create({
//       data: {
//         content: contentValidated,
//         postId: post.id,
//         userId: user.id,
//       },
//       include: getCommentDataInclude(user.id),
//     }),
//     ...(post.user.id !== user.id
//       ? [
//           prisma.notification.create({
//             data: {
//               issuerId: user.id,
//               recipientId: post.user.id,
//               postId: post.id,
//               type: "COMMENT",
//             },
//           }),
//         ]
//       : []),
//   ]);

//   return newComment;
// }

// export async function deleteComment(id: string) {
//   const { user } = await validateRequest();

//   if (!user) throw new Error("Unauthorized");

//   const comment = await prisma.comment.findUnique({
//     where: { id },
//   });

//   if (!comment) throw new Error("Comment not found");

//   if (comment.userId !== user.id) throw new Error("Unauthorized");

//   const deletedComment = await prisma.comment.delete({
//     where: { id },
//     include: getCommentDataInclude(user.id),
//   });

//   return deletedComment;
// }

// // 새로 추가되는 editComment 함수 ⬇️
// export async function editComment({
//   id,
//   content,
// }: {
//   id: string;
//   content: string;
// }) {
//   const { user } = await validateRequest();

//   if (!user) throw new Error("Unauthorized");

//   const comment = await prisma.comment.findUnique({
//     where: { id },
//   });

//   if (!comment) throw new Error("Comment not found");

//   if (comment.userId !== user.id) throw new Error("Unauthorized");

//   const { content: contentValidated } = createCommentSchema.parse({ content });

//   const editedComment = await prisma.comment.update({
//     where: { id },
//     data: {
//       content: contentValidated,
//     },
//     include: getCommentDataInclude(user.id),
//   });

//   return editedComment;
// }

"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getCommentDataInclude, PostData } from "@/lib/types";
import { createCommentSchema } from "@/lib/validation";

interface SubmitCommentArgs {
  post: PostData;
  content: string;
  parentId?: string; // parentId 추가
}

export async function submitComment({
  post,
  content,
  parentId,
}: SubmitCommentArgs) {
  const { user } = await validateRequest();
  if (!user) throw new Error("Unauthorized");

  const { content: contentValidated } = createCommentSchema.parse({ content });

  // 부모 댓글이 있는 경우 존재 여부 확인
  if (parentId) {
    const parentComment = await prisma.comment.findUnique({
      where: { id: parentId },
    });
    if (!parentComment) {
      throw new Error("Parent comment not found");
    }
  }

  const [newComment] = await prisma.$transaction([
    prisma.comment.create({
      data: {
        content: contentValidated,
        postId: post.id,
        userId: user.id,
        parentId, // 부모 댓글 ID 추가
      },
      include: getCommentDataInclude(user.id),
    }),
    // 알림 생성: 포스트 작성자 또는 부모 댓글 작성자에게
    ...(post.user.id !== user.id || parentId
      ? [
          prisma.notification.create({
            data: {
              issuerId: user.id,
              recipientId: parentId
                ? (
                    await prisma.comment.findUnique({
                      where: { id: parentId },
                      select: { userId: true },
                    })
                  )?.userId || post.user.id
                : post.user.id,
              postId: post.id,
              type: "COMMENT",
            },
          }),
        ]
      : []),
  ]);

  return newComment;
}

export async function deleteComment(id: string) {
  const { user } = await validateRequest();
  if (!user) throw new Error("Unauthorized");

  try {
    const comment = await prisma.comment.findUnique({
      where: { id },
      include: {
        replies: true,
      },
    });

    if (!comment) throw new Error("Comment not found");
    if (comment.userId !== user.id) throw new Error("Unauthorized");

    // 트랜잭션으로 처리
    const deletedComment = await prisma.$transaction(async (tx) => {
      // 먼저 대댓글들을 삭제
      if (comment.replies?.length > 0) {
        await tx.comment.deleteMany({
          where: {
            parentId: id,
          },
        });
      }

      // 그 다음 댓글 삭제
      const deleted = await tx.comment.delete({
        where: { id },
        include: getCommentDataInclude(user.id),
      });

      return deleted;
    });

    return deletedComment;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
}

export async function editComment({
  id,
  content,
}: {
  id: string;
  content: string;
}) {
  const { user } = await validateRequest();
  if (!user) throw new Error("Unauthorized");

  const comment = await prisma.comment.findUnique({
    where: { id },
    include: { parent: true },
  });

  if (!comment) throw new Error("Comment not found");
  if (comment.userId !== user.id) throw new Error("Unauthorized");

  const { content: contentValidated } = createCommentSchema.parse({ content });

  const editedComment = await prisma.comment.update({
    where: { id },
    data: {
      content: contentValidated,
    },
    include: getCommentDataInclude(user.id),
  });

  return editedComment;
}
