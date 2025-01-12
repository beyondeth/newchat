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

// "use server";

// import { validateRequest } from "@/auth";
// import prisma from "@/lib/prisma";
// import { getPostDataInclude } from "@/lib/types";
// import { createPostSchema } from "@/lib/validation";
// import { revalidatePath } from "next/cache";

// export async function submitPost(input: {
//   content: string;
//   mediaIds: string[];
//   booktitle?: string;
//   bookauthor?: string;
// }) {
//   try {
//     // 1. 병렬로 실행할 수 있는 작업들을 Promise.all로 처리
//     const [{ user }, validatedData] = await Promise.all([
//       validateRequest(),
//       createPostSchema.parse(input),
//     ]);

//     if (!user) throw new Error("Unauthorized");

//     const { content, mediaIds } = validatedData;
//     const { booktitle, bookauthor } = input; // input에서 직접 가져옴

//     // 2. 트랜잭션으로 DB 작업 최적화
//     const newPost = await prisma.$transaction(
//       async (tx) => {
//         const post = await tx.post.create({
//           data: {
//             content,
//             userId: user.id,
//             booktitle,
//             bookauthor,
//             attachments: {
//               connect: mediaIds.map((id) => ({ id })),
//             },
//           },
//           include: getPostDataInclude(user.id),
//         });

//         return post;
//       },
//       // {
//       //   timeout: 5000, // 5초 타임아웃 설정
//       // },
//     );

//     // 3. 캐시 갱신
//     // revalidatePath("/");

//     return newPost;
//   } catch (error) {
//     console.error("Error creating post:", error);
//     throw error;
//   }
// }

"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getPostDataInclude } from "@/lib/types";
import { createPostSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";

export async function submitPost(input: {
  content: string;
  mediaIds: string[];
  booktitle?: string;
  bookauthor?: string;
}) {
  try {
    // 1. 병렬로 실행할 수 있는 작업들을 Promise.all로 처리
    const { user } = await validateRequest();
    if (!user) throw new Error("Unauthorized");

    // validation 처리
    const validationResult = createPostSchema.safeParse(input);
    if (!validationResult.success) {
      // validation 에러 메시지 추출
      throw new Error(validationResult.error.errors[0].message);
    }

    const { content, mediaIds, booktitle, bookauthor } = validationResult.data;

    // 2. 트랜잭션으로 DB 작업 최적화
    const newPost = await prisma.$transaction(
      async (tx) => {
        const post = await tx.post.create({
          data: {
            content,
            userId: user.id,
            booktitle,
            bookauthor,
            attachments: {
              connect: mediaIds.map((id) => ({ id })),
            },
          },
          include: getPostDataInclude(user.id),
        });

        return post;
      },
      // {
      //   timeout: 5000, // 5초 타임아웃 설정
      // },
    );

    // 3. 캐시 갱신
    // revalidatePath("/");

    return newPost;
  } catch (error) {
    console.error("Error creating post:", error);
    // ZodError와 일반 에러 구분
    if (error instanceof ZodError) {
      throw new Error(error.errors[0].message);
    }
    throw error;
  }
}
