// react-hook-form 추가 //

// "use client";

// import { useSession } from "@/app/(main)/SessionProvider";
// import LoadingButton from "@/components/LoadingButton";
// import { Button } from "@/components/ui/button";
// import UserAvatar from "@/components/UserAvatar";
// import { Input } from "@/components/ui/input";
// import { cn } from "@/lib/utils";
// import { createPostSchema } from "@/lib/validation";
// import { useDropzone } from "@uploadthing/react";
// import Placeholder from "@tiptap/extension-placeholder";
// import { EditorContent, useEditor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { ImageIcon, Loader2, X } from "lucide-react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useRef } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { useSubmitPostMutation } from "./mutations";
// import "./styles.css";
// import useMediaUpload, { Attachment } from "./useMediaUpload";

// // Form 타입 정의
// type FormInputs = z.infer<typeof createPostSchema>;

// function extractYouTubeVideoId(url: string): string | null {
//   const patterns = [
//     /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
//     /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
//   ];

//   for (const pattern of patterns) {
//     const match = url.match(pattern);
//     if (match) return match[1];
//   }
//   return null;
// }

// export default function PostEditor() {
//   const { user } = useSession();
//   const router = useRouter();
//   const mutation = useSubmitPostMutation();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     watch,
//   } = useForm<FormInputs>({
//     resolver: zodResolver(createPostSchema),
//     defaultValues: {
//       content: "",
//       booktitle: "",
//       bookauthor: "",
//       mediaIds: [],
//       youtubeLinks: [],
//     },
//   });

//   const {
//     startUpload,
//     attachments,
//     isUploading,
//     uploadProgress,
//     removeAttachment,
//     reset: resetMediaUploads,
//   } = useMediaUpload();

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop: (files) => {
//       if (!user) {
//         router.push("/login");
//         return;
//       }
//       startUpload(files);
//     },
//   });

//   const { onClick, ...rootProps } = getRootProps();

//   const editor = useEditor({
//     immediatelyRender: false,
//     extensions: [
//       StarterKit.configure({
//         bold: false,
//         italic: false,
//       }),
//       Placeholder.configure({
//         placeholder: user
//           ? "당신의 생각을 기록하세요..."
//           : "로그인 후 이용할 수 있습니다.",
//       }),
//     ],
//     onUpdate: ({ editor }) => {
//       const content = editor.getText();
//       setValue("content", content);

//       const links =
//         content.match(
//           /https?:\/\/(?:www\.)?(?:youtube\.com\/\S+|youtu\.be\/\S+)/g,
//         ) || [];
//       setValue("youtubeLinks", links);
//     },
//   });

//   const onSubmit = handleSubmit((data) => {
//     if (!user) {
//       router.push("/login");
//       return;
//     }

//     mutation.mutate(
//       {
//         ...data,
//         mediaIds: attachments.map((a) => a.mediaId).filter(Boolean) as string[],
//       },
//       {
//         onSuccess: () => {
//           editor?.commands.clearContent();
//           resetMediaUploads();
//           setValue("booktitle", "");
//           setValue("bookauthor", "");
//           setValue("youtubeLinks", []);
//         },
//       },
//     );
//   });

//   const content = watch("content");
//   const youtubeLinks = watch("youtubeLinks") || [];

//   return (
//     <div className="flex flex-col gap-3 rounded-2xl bg-card p-5 shadow-sm">
//       <form onSubmit={onSubmit} className="flex flex-col gap-3">
//         <div className="flex gap-5">
//           <UserAvatar
//             avatarUrl={user?.avatarUrl}
//             className="hidden sm:inline"
//           />
//           <div {...rootProps} className="w-full">
//             <div className="flex gap-3 mb-3">
//               <div className="flex flex-col flex-1">
//                 <Input
//                   placeholder="책 제목 (선택사항)"
//                   {...register("booktitle")}
//                   className="text-sm"
//                 />
//                 {errors.booktitle && (
//                   <span className="text-xs text-red-500 mt-1">
//                     {errors.booktitle.message}
//                   </span>
//                 )}
//               </div>
//               <div className="flex flex-col flex-1">
//                 <Input
//                   placeholder="저자 (선택사항)"
//                   {...register("bookauthor")}
//                   className="text-sm"
//                 />
//                 {errors.bookauthor && (
//                   <span className="text-xs text-red-500 mt-1">
//                     {errors.bookauthor.message}
//                   </span>
//                 )}
//               </div>
//             </div>
//             <EditorContent
//               editor={editor}
//               className={cn(
//                 "text-sm max-h-[20rem] w-full overflow-y-auto rounded-2xl bg-background px-5 py-3",
//                 isDragActive && "outline-dashed",
//                 !user && "cursor-not-allowed",
//               )}
//               readOnly={!user}
//             />
//             <input {...getInputProps()} disabled={!user} />
//           </div>
//         </div>

//         {!!attachments.length && (
//           <AttachmentPreviews
//             attachments={attachments}
//             removeAttachment={removeAttachment}
//           />
//         )}

//         {youtubeLinks.map((link) => {
//           const videoId = extractYouTubeVideoId(link);
//           return videoId ? (
//             <div key={videoId} className="aspect-w-16 aspect-h-9 my-4">
//               <iframe
//                 src={`https://www.youtube.com/embed/${videoId}`}
//                 title="YouTube video player"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//                 className="w-full h-full"
//               />
//             </div>
//           ) : null;
//         })}

//         <div className="flex items-center justify-end gap-3">
//           {isUploading && (
//             <>
//               <span className="text-sm">{uploadProgress ?? 0}%</span>
//               <Loader2 className="size-5 animate-spin text-primary" />
//             </>
//           )}
//           <AddAttachmentsButton
//             onFilesSelected={(files) => {
//               if (!user) {
//                 router.push("/login");
//                 return;
//               }
//               startUpload(files);
//             }}
//             disabled={isUploading || attachments.length >= 5}
//           />
//           <LoadingButton
//             type="submit"
//             loading={mutation.isPending}
//             disabled={!content?.trim() || isUploading}
//             className="text:sm min-w-20"
//           >
//             {user ? "톡톡" : "톡톡"}
//           </LoadingButton>
//         </div>
//       </form>
//     </div>
//   );
// }

// // 기존 컴포넌트들은 그대로 유지...
// interface AddAttachmentsButtonProps {
//   onFilesSelected: (files: File[]) => void;
//   disabled: boolean;
// }

// function AddAttachmentsButton({
//   onFilesSelected,
//   disabled,
// }: AddAttachmentsButtonProps) {
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   return (
//     <>
//       <Button
//         variant="ghost"
//         size="icon"
//         className="text-primary hover:text-primary"
//         disabled={disabled}
//         onClick={() => fileInputRef.current?.click()}
//       >
//         <ImageIcon size={20} />
//       </Button>
//       <input
//         type="file"
//         accept="image/*, video/*"
//         multiple
//         ref={fileInputRef}
//         className="sr-only hidden"
//         onChange={(e) => {
//           const files = Array.from(e.target.files || []);
//           if (files.length) {
//             onFilesSelected(files);
//             e.target.value = "";
//           }
//         }}
//       />
//     </>
//   );
// }

// interface AttachmentPreviewsProps {
//   attachments: Attachment[];
//   removeAttachment: (fileName: string) => void;
// }

// function AttachmentPreviews({
//   attachments,
//   removeAttachment,
// }: AttachmentPreviewsProps) {
//   return (
//     <div
//       className={cn(
//         "flex flex-col gap-3",
//         attachments.length > 1 && "sm:grid sm:grid-cols-2",
//       )}
//     >
//       {attachments.map((attachment) => (
//         <AttachmentPreview
//           key={attachment.file.name}
//           attachment={attachment}
//           onRemoveClick={() => removeAttachment(attachment.file.name)}
//         />
//       ))}
//     </div>
//   );
// }

// interface AttachmentPreviewProps {
//   attachment: Attachment;
//   onRemoveClick: () => void;
// }

// function AttachmentPreview({
//   attachment: { file, mediaId, isUploading },
//   onRemoveClick,
// }: AttachmentPreviewProps) {
//   const src = URL.createObjectURL(file);

//   return (
//     <div
//       className={cn("relative mx-auto size-fit", isUploading && "opacity-50")}
//     >
//       {file.type.startsWith("image") ? (
//         <Image
//           src={src}
//           alt="Attachment preview"
//           width={500}
//           height={500}
//           className="size-fit max-h-[30rem] rounded-2xl"
//         />
//       ) : (
//         <video controls className="size-fit max-h-[30rem] rounded-2xl">
//           <source src={src} type={file.type} />
//         </video>
//       )}
//       {!isUploading && (
//         <button
//           onClick={onRemoveClick}
//           className="absolute right-3 top-3 rounded-full bg-foreground p-1.5 text-background transition-colors hover:bg-foreground/60"
//         >
//           <X size={20} />
//         </button>
//       )}
//     </div>
//   );
// }

"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/UserAvatar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { createPostSchema } from "@/lib/validation";
import { useDropzone } from "@uploadthing/react";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSubmitPostMutation } from "./mutations";
import "./styles.css";
import useMediaUpload, { Attachment } from "./useMediaUpload";

// Form 타입 정의
type FormInputs = z.infer<typeof createPostSchema>;

// YouTube 링크 추출 함수
function extractYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export default function PostEditor() {
  const { user } = useSession();
  const router = useRouter();
  const mutation = useSubmitPostMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormInputs>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      content: "",
      booktitle: "",
      bookauthor: "",
      mediaIds: [],
      youtubeLinks: [],
      bookInfo: undefined, // bookInfo 기본값 추가
    },
  });

  const {
    startUpload,
    attachments,
    isUploading,
    uploadProgress,
    removeAttachment,
    reset: resetMediaUploads,
  } = useMediaUpload();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => {
      if (!user) {
        router.push("/login");
        return;
      }
      startUpload(files);
    },
  });

  const { onClick, ...rootProps } = getRootProps();

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: user
          ? "당신의 생각을 기록하세요..."
          : "로그인 후 이용할 수 있습니다.",
      }),
    ],
    onUpdate: ({ editor }) => {
      const content = editor.getText();
      setValue("content", content);

      const links =
        content.match(
          /https?:\/\/(?:www\.)?(?:youtube\.com\/\S+|youtu\.be\/\S+)/g,
        ) || [];
      setValue("youtubeLinks", links);
    },
  });

  const content = watch("content");
  const contentLength = content?.length || 0;
  const youtubeLinks = watch("youtubeLinks") || [];

  const onSubmit = handleSubmit((data) => {
    if (!user) {
      router.push("/login");
      return;
    }

    mutation.mutate(
      {
        ...data,
        mediaIds: attachments.map((a) => a.mediaId).filter(Boolean) as string[],
        // bookInfo: selectedBook
        //   ? {
        //       title: selectedBook.title.replace(/<[^>]*>/g, ""),
        //       author: selectedBook.author.replace(/<[^>]*>/g, ""),
        //       image: selectedBook.image,
        //       publisher: selectedBook.publisher,
        //       pubdate: selectedBook.pubdate,
        //       isbn: selectedBook.isbn,
        //       description: selectedBook.description?.replace(/<[^>]*>/g, ""),
        //       link: selectedBook.link ?? undefined,
        //     }
        //   : undefined,
      },
      {
        onSuccess: () => {
          editor?.commands.clearContent();
          resetMediaUploads();
          setValue("booktitle", "");
          setValue("bookauthor", "");
          setValue("youtubeLinks", []);
        },
      },
    );
  });

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-card p-5 shadow-sm">
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <div className="flex gap-5">
          <UserAvatar
            avatarUrl={user?.avatarUrl}
            className="hidden sm:inline"
          />
          <div {...rootProps} className="w-full">
            {/* BookSearch 컴포넌트 추가 */}
            {/* <div className="mb-3">
              <BookSearch onBookSelect={handleBookSelect} />
            </div> */}

            <div className="flex gap-3 mb-3">
              <div className="flex flex-col flex-1">
                <Input
                  placeholder="책 제목 (선택사항)"
                  {...register("booktitle")}
                  className={cn(
                    "text-sm",
                    errors.booktitle &&
                      "border-red-500 focus-visible:ring-red-500",
                  )}
                />
                {errors.booktitle && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.booktitle.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col flex-1">
                <Input
                  placeholder="저자 (선택사항)"
                  {...register("bookauthor")}
                  className={cn(
                    "text-sm",
                    errors.bookauthor &&
                      "border-red-500 focus-visible:ring-red-500",
                  )}
                />
                {errors.bookauthor && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.bookauthor.message}
                  </span>
                )}
              </div>
            </div>
            <div className="relative">
              <EditorContent
                editor={editor}
                className={cn(
                  "text-sm max-h-[20rem] w-full overflow-y-auto rounded-2xl bg-background px-5 py-3",
                  isDragActive && "outline-dashed",
                  !user && "cursor-not-allowed",
                  contentLength > 3000 && "border-2 border-red-500", // contentLength로 조건 변경
                )}
                readOnly={!user}
              />
              {contentLength > 3000 && ( // errors.content 대신 contentLength로 조건 변경
                <span className="text-xs text-red-500 mt-1 block">
                  본문 내용은 최대 3000자까지 입력가능합니다.
                </span>
              )}
            </div>
            <input {...getInputProps()} disabled={!user} />
          </div>
        </div>

        {!!attachments.length && (
          <AttachmentPreviews
            attachments={attachments}
            removeAttachment={removeAttachment}
          />
        )}

        {youtubeLinks.map((link) => {
          const videoId = extractYouTubeVideoId(link);
          return videoId ? (
            <div key={videoId} className="aspect-w-16 aspect-h-9 my-4">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          ) : null;
        })}

        <div className="flex items-center justify-end gap-3">
          {isUploading && (
            <>
              <span className="text-sm">{uploadProgress ?? 0}%</span>
              <Loader2 className="size-5 animate-spin text-primary" />
            </>
          )}
          <span
            className={cn(
              "text-sm",
              contentLength > 3000 ? "text-red-500" : "text-gray-500",
            )}
          >
            {contentLength} / 3000
          </span>
          <AddAttachmentsButton
            onFilesSelected={(files) => {
              if (!user) {
                router.push("/login");
                return;
              }
              startUpload(files);
            }}
            disabled={isUploading || attachments.length >= 5}
          />
          <LoadingButton
            type="submit"
            loading={mutation.isPending}
            disabled={!content?.trim() || isUploading || contentLength > 3000}
            className="text:sm min-w-20"
          >
            {user ? "톡톡" : "톡톡"}
          </LoadingButton>
        </div>
      </form>
    </div>
  );
}

interface AddAttachmentsButtonProps {
  onFilesSelected: (files: File[]) => void;
  disabled: boolean;
}

function AddAttachmentsButton({
  onFilesSelected,
  disabled,
}: AddAttachmentsButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="text-primary hover:text-primary"
        disabled={disabled}
        onClick={() => fileInputRef.current?.click()}
      >
        <ImageIcon size={20} />
      </Button>
      <input
        type="file"
        accept="image/*, video/*"
        multiple
        ref={fileInputRef}
        className="sr-only hidden"
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          if (files.length) {
            onFilesSelected(files);
            e.target.value = "";
          }
        }}
      />
    </>
  );
}

interface AttachmentPreviewsProps {
  attachments: Attachment[];
  removeAttachment: (fileName: string) => void;
}

function AttachmentPreviews({
  attachments,
  removeAttachment,
}: AttachmentPreviewsProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        attachments.length > 1 && "sm:grid sm:grid-cols-2",
      )}
    >
      {attachments.map((attachment) => (
        <AttachmentPreview
          key={attachment.file.name}
          attachment={attachment}
          onRemoveClick={() => removeAttachment(attachment.file.name)}
        />
      ))}
    </div>
  );
}

interface AttachmentPreviewProps {
  attachment: Attachment;
  onRemoveClick: () => void;
}

function AttachmentPreview({
  attachment: { file, mediaId, isUploading },
  onRemoveClick,
}: AttachmentPreviewProps) {
  const src = URL.createObjectURL(file);

  return (
    <div
      className={cn("relative mx-auto size-fit", isUploading && "opacity-50")}
    >
      {file.type.startsWith("image") ? (
        <Image
          src={src}
          alt="Attachment preview"
          width={500}
          height={500}
          className="size-fit max-h-[30rem] rounded-2xl"
        />
      ) : (
        <video controls className="size-fit max-h-[30rem] rounded-2xl">
          <source src={src} type={file.type} />
        </video>
      )}
      {!isUploading && (
        <button
          onClick={onRemoveClick}
          className="absolute right-3 top-3 rounded-full bg-foreground p-1.5 text-background transition-colors hover:bg-foreground/60"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
}
