import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
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
