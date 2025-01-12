// "use server";

// import { validateRequest } from "@/auth";
// import prisma from "@/lib/prisma";
// import { getPostDataInclude } from "@/lib/types";

// export async function deletePost(id: string) {
//   const { user } = await validateRequest();

//   if (!user) throw new Error("Unauthorized");

//   const post = await prisma.post.findUnique({
//     where: { id },
//   });

//   if (!post) throw new Error("Post not found");

//   if (post.userId !== user.id) throw new Error("Unauthorized");

//   const deletedPost = await prisma.post.delete({
//     where: { id },
//     include: getPostDataInclude(user.id),
//   });

//   return deletedPost;
// }

// // 새로 추가되는 editPost 함수 ⬇️
// export async function editPost({
//   id,
//   content,
// }: {
//   id: string;
//   content: string;
// }) {
//   const { user } = await validateRequest();

//   if (!user) throw new Error("Unauthorized");

//   const post = await prisma.post.findUnique({
//     where: { id },
//   });

//   if (!post) throw new Error("Post not found");

//   if (post.userId !== user.id) throw new Error("Unauthorized");

//   const editedPost = await prisma.post.update({
//     where: { id },
//     data: { content },
//     include: getPostDataInclude(user.id),
//   });

//   return editedPost;
// }

"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getPostDataInclude } from "@/lib/types";

export async function deletePost(id: string) {
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) throw new Error("Post not found");

  if (post.userId !== user.id) throw new Error("Unauthorized");

  const deletedPost = await prisma.post.delete({
    where: { id },
    include: getPostDataInclude(user.id),
  });

  return deletedPost;
}

// editPost 함수 수정
export async function editPost({
  id,
  content,
  booktitle,
  bookauthor,
}: {
  id: string;
  content: string;
  booktitle?: string;
  bookauthor?: string;
}) {
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) throw new Error("Post not found");

  if (post.userId !== user.id) throw new Error("Unauthorized");

  const editedPost = await prisma.post.update({
    where: { id },
    data: {
      content,
      booktitle,
      bookauthor,
    },
    include: getPostDataInclude(user.id),
  });

  return editedPost;
}
