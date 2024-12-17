// "use server";

// import { validateRequest } from "@/auth";
// import prisma from "@/lib/prisma";
// import { getPostDataInclude } from "@/lib/types";
// import { createPostSchema } from "@/lib/validation";

// export async function submitPost(input: {
//   content: string;
//   mediaIds: string[];
// }) {
//   const { user } = await validateRequest();

//   if (!user) throw new Error("Unauthorized");

//   const { content, mediaIds } = createPostSchema.parse(input);

//   const newPost = await prisma.post.create({
//     data: {
//       content,
//       userId: user.id,
//       attachments: {
//         connect: mediaIds.map((id) => ({ id })),
//       },
//     },
//     include: getPostDataInclude(user.id),
//   });

//   return newPost;
// }

"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getPostDataInclude } from "@/lib/types";
import { createPostSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";

export async function submitPost(input: {
  content: string;
  mediaIds: string[];
}) {
  try {
    // 1. 병렬로 실행할 수 있는 작업들을 Promise.all로 처리
    const [{ user }, validatedData] = await Promise.all([
      validateRequest(),
      createPostSchema.parse(input),
    ]);

    if (!user) throw new Error("Unauthorized");

    const { content, mediaIds } = validatedData;

    // 2. 트랜잭션으로 DB 작업 최적화
    const newPost = await prisma.$transaction(
      async (tx) => {
        const post = await tx.post.create({
          data: {
            content,
            userId: user.id,
            attachments: {
              connect: mediaIds.map((id) => ({ id })),
            },
          },
          include: getPostDataInclude(user.id),
        });

        return post;
      },
      {
        timeout: 5000, // 5초 타임아웃 설정
      },
    );

    // 3. 캐시 갱신
    revalidatePath("/");

    return newPost;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}
