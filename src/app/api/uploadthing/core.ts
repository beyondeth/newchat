// import { validateRequest } from "@/auth";
// import prisma from "@/lib/prisma";
// import { createUploadthing, FileRouter } from "uploadthing/next";
// import { UploadThingError, UTApi } from "uploadthing/server";

// const f = createUploadthing();

// export const fileRouter = {
//   avatar: f({
//     image: { maxFileSize: "512KB" },
//   })
//     .middleware(async () => {
//       const { user } = await validateRequest();

//       if (!user) throw new UploadThingError("Unauthorized");

//       return { user };
//     })
//     .onUploadComplete(async ({ metadata, file }) => {
//       const oldAvatarUrl = metadata.user.avatarUrl;

//       if (oldAvatarUrl) {
//         const key = oldAvatarUrl.split(
//           `/a/${process.env.UPLOADTHING_TOKEN}/`,
//         )[1];

//         await new UTApi().deleteFiles(key);
//       }

//       const newAvatarUrl = file.url.replace(
//         "/f/",
//         `/a/${process.env.UPLOADTHING_TOKEN}/`,
//       );

//       await prisma.user.update({
//         where: { id: metadata.user.id },
//         data: {
//           avatarUrl: newAvatarUrl,
//         },
//       });

//       return { avatarUrl: newAvatarUrl };
//     }),
//   attachment: f({
//     image: { maxFileSize: "4MB", maxFileCount: 5 },
//     video: { maxFileSize: "64MB", maxFileCount: 5 },
//   })
//     .middleware(async () => {
//       const { user } = await validateRequest();

//       if (!user) throw new UploadThingError("Unauthorized");

//       return {};
//     })
//     .onUploadComplete(async ({ file }) => {
//       const media = await prisma.media.create({
//         data: {
//           url: file.url.replace(
//             "/f/",
//             `/a/${process.env.UPLOADTHING_TOKEN}/`,
//           ),
//           type: file.type.startsWith("image") ? "IMAGE" : "VIDEO",
//         },
//       });

//       return { mediaId: media.id };
//     }),
// } satisfies FileRouter;

// export type AppFileRouter = typeof fileRouter;

// ver 2.0

// import { validateRequest } from "@/auth";
// import prisma from "@/lib/prisma";
// import streamServerClient from "@/lib/stream";
// import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { UploadThingError, UTApi } from "uploadthing/server";

// const f = createUploadthing();

// export const ourFileRouter = {
//   avatar: f({
//     image: { maxFileSize: "1MB" },
//   })
//     .middleware(async () => {
//       const { user } = await validateRequest();

//       if (!user) throw new UploadThingError("Unauthorized");

//       return { user };
//     })
//     .onUploadComplete(async ({ metadata, file }) => {
//       // This code RUNS ON YOUR SERVER after upload
//       // console.log("Upload complete for userId:", metadata.user);
//       // console.log("file url", file.url);
//       const oldAvatarUrl = metadata.user.avatarUrl;

//       if (oldAvatarUrl) {
//         const key = oldAvatarUrl.split(`/f/`)[1];

//         await new UTApi().deleteFiles(key);
//       }

//       const newAvatarUrl = file.url;

//       await Promise.all([
//         prisma.user.update({
//           where: { id: metadata.user.id },
//           data: {
//             avatarUrl: newAvatarUrl,
//           },
//         }),
//         streamServerClient.partialUpdateUser({
//           id: metadata.user.id,
//           set: {
//             image: newAvatarUrl,
//           },
//         }),
//       ]);

//       return { avatarUrl: newAvatarUrl };
//     }),
//   attachment: f({
//     image: { maxFileSize: "32MB", maxFileCount: 5 },
//     video: { maxFileSize: "64MB", maxFileCount: 1 },
//   })
//     .middleware(async () => {
//       const { user } = await validateRequest();

//       if (!user) throw new UploadThingError("Unauthorized");

//       return {};
//     })
//     .onUploadComplete(async ({ metadata, file }) => {
//       const media = await prisma.media.create({
//         data: {
//           // url: file.url.replace("/f/", `/a/${process.env.UPLOADTHING_TOKEN}/`),
//           url: file.url,
//           type: file.type.startsWith("image") ? "IMAGE" : "VIDEO",
//         },
//       });
//       // console.log("Upload complete for userId:", media.url);
//       // console.log("file url", file.url);

//       return { mediaId: media.id };

//       //  return { uploadedBy: media.url };
//     }),
// } satisfies FileRouter;

// export type OurFileRouter = typeof ourFileRouter;

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import streamServerClient from "@/lib/stream";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError, UTApi } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  avatar: f({
    image: { maxFileSize: "1MB" },
  })
    .middleware(async () => {
      const { user } = await validateRequest();

      if (!user) throw new UploadThingError("Unauthorized");

      return { user };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const oldAvatarUrl = metadata.user.avatarUrl;

      // 카카오 프로필 이미지가 아닌 UploadThing URL인 경우에만 삭제 시도
      if (oldAvatarUrl?.includes("/f/") && !oldAvatarUrl.includes("kakaocdn")) {
        try {
          const key = oldAvatarUrl.split("/f/")[1];
          if (key) {
            await new UTApi().deleteFiles(key);
          }
        } catch (error) {
          console.error("Failed to delete old avatar:", error);
        }
      }

      const newAvatarUrl = file.url;

      try {
        await Promise.all([
          prisma.user.update({
            where: { id: metadata.user.id },
            data: {
              avatarUrl: newAvatarUrl,
            },
          }),
          streamServerClient.partialUpdateUser({
            id: metadata.user.id,
            set: {
              image: newAvatarUrl,
            },
          }),
        ]);

        return { avatarUrl: newAvatarUrl };
      } catch (error) {
        console.error("Failed to update avatar:", error);
        throw new UploadThingError("Failed to update user profile");
      }
    }),

  attachment: f({
    image: { maxFileSize: "32MB", maxFileCount: 5 },
    video: { maxFileSize: "64MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      const { user } = await validateRequest();

      if (!user) throw new UploadThingError("Unauthorized");

      return {};
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        const media = await prisma.media.create({
          data: {
            url: file.url,
            type: file.type.startsWith("image") ? "IMAGE" : "VIDEO",
          },
        });

        return { mediaId: media.id };
      } catch (error) {
        console.error("Failed to create media record:", error);
        throw new UploadThingError("Failed to process uploaded file");
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
