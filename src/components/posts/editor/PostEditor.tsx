// "use client";

// import { useSession } from "@/app/(main)/SessionProvider";
// import LoadingButton from "@/components/LoadingButton";
// import { Button } from "@/components/ui/button";
// import UserAvatar from "@/components/UserAvatar";
// import { cn } from "@/lib/utils";
// import Placeholder from "@tiptap/extension-placeholder";
// import { EditorContent, useEditor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import { ImageIcon, Loader2, X } from "lucide-react";
// import Image from "next/image";
// import { ClipboardEvent, useRef, useState } from "react";
// import { useSubmitPostMutation } from "./mutations";
// import "./styles.css";
// import useMediaUpload, { Attachment } from "./useMediaUpload";
// import { useDropzone } from "@uploadthing/react";
// import { useRouter } from "next/navigation";
// import { Input } from "@/components/ui/input";

// export default function PostEditor() {
//   const { user } = useSession();
//   const router = useRouter();
//   const mutation = useSubmitPostMutation();

//   const [booktitle, setBookTitle] = useState("");
//   const [bookauthor, setBookAuthor] = useState("");

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
//   });

//   const input =
//     editor?.getText({
//       blockSeparator: "\n",
//     }) || "";

//   function onSubmit() {
//     if (!user) {
//       router.push("/login");
//       return;
//     }
//     mutation.mutate(
//       {
//         content: input,
//         mediaIds: attachments.map((a) => a.mediaId).filter(Boolean) as string[],
//         booktitle: booktitle || undefined, // 선택적 필드
//         bookauthor: bookauthor || undefined, // 선택적 필드
//       },
//       {
//         onSuccess: () => {
//           editor?.commands.clearContent();
//           resetMediaUploads();
//         },
//       },
//     );
//   }

//   return (
//     <div className="flex flex-col gap-3 rounded-2xl bg-card p-5 shadow-sm">
//       <div className="flex gap-5">
//         <UserAvatar avatarUrl={user?.avatarUrl} className="hidden sm:inline" />
//         <div {...rootProps} className="w-full">
//           {/* 책 제목과 저자 입력 필드 추가 */}
//           <div className="flex gap-3 mb-3">
//             <Input
//               placeholder="책 제목 (선택사항)"
//               value={booktitle}
//               onChange={(e) => setBookTitle(e.target.value)}
//               className="text-sm"
//             />
//             <Input
//               placeholder="저자 (선택사항)"
//               value={bookauthor}
//               onChange={(e) => setBookAuthor(e.target.value)}
//               className="text-sm"
//             />
//           </div>
//           <EditorContent
//             editor={editor}
//             className={cn(
//               "text-sm max-h-[20rem] w-full overflow-y-auto rounded-2xl bg-background px-5 py-3",
//               isDragActive && "outline-dashed",
//               !user && "cursor-not-allowed",
//             )}
//             readOnly={!user}
//           />
//           <input {...getInputProps()} disabled={!user} />
//         </div>
//       </div>
//       {!!attachments.length && (
//         <AttachmentPreviews
//           attachments={attachments}
//           removeAttachment={removeAttachment}
//         />
//       )}
//       <div className="flex items-center justify-end gap-3">
//         {isUploading && (
//           <>
//             <span className="text-sm">{uploadProgress ?? 0}%</span>
//             <Loader2 className="size-5 animate-spin text-primary" />
//           </>
//         )}
//         <AddAttachmentsButton
//           onFilesSelected={(files) => {
//             if (!user) {
//               router.push("/login");
//               return;
//             }
//             startUpload(files);
//           }}
//           disabled={isUploading || attachments.length >= 5}
//         />
//         <LoadingButton
//           onClick={onSubmit}
//           loading={mutation.isPending}
//           disabled={!input.trim() || isUploading}
//           className="text:sm min-w-20"
//         >
//           {user ? "톡톡" : "톡톡"}
//         </LoadingButton>
//       </div>
//     </div>
//   );
// }

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
import { cn } from "@/lib/utils";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ImageIcon, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useSubmitPostMutation } from "./mutations";
import "./styles.css";
import useMediaUpload, { Attachment } from "./useMediaUpload";
import { useDropzone } from "@uploadthing/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

// YouTube 링크 추출 함수
function extractYouTubeVideoId(url: string): string | null {
  const youtubeRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(youtubeRegex);
  return match ? match[1] : null;
}

export default function PostEditor() {
  const { user } = useSession();
  const router = useRouter();
  const mutation = useSubmitPostMutation();

  const [booktitle, setBookTitle] = useState("");
  const [bookauthor, setBookAuthor] = useState("");
  const [youtubeLinks, setYoutubeLinks] = useState<string[]>([]);

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
    onUpdate: () => {
      if (editor) {
        const content = editor.getText();
        const links =
          content.match(
            /https?:\/\/(?:www\.)?(?:youtube\.com\/\S+|youtu\.be\/\S+)/g,
          ) || [];
        setYoutubeLinks(links);
      }
    },
  });

  const input =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

  function onSubmit() {
    if (!user) {
      router.push("/login");
      return;
    }
    mutation.mutate(
      {
        content: input,
        mediaIds: attachments.map((a) => a.mediaId).filter(Boolean) as string[],
        booktitle: booktitle || undefined,
        bookauthor: bookauthor || undefined,
        youtubeLinks: youtubeLinks.length > 0 ? youtubeLinks : undefined,
      },
      {
        onSuccess: () => {
          editor?.commands.clearContent();
          resetMediaUploads();
          setBookTitle("");
          setBookAuthor("");
          setYoutubeLinks([]);
        },
      },
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex gap-5">
        <UserAvatar avatarUrl={user?.avatarUrl} className="hidden sm:inline" />
        <div {...rootProps} className="w-full">
          <div className="flex gap-3 mb-3">
            <Input
              placeholder="책 제목 (선택사항)"
              value={booktitle}
              onChange={(e) => setBookTitle(e.target.value)}
              className="text-sm"
            />
            <Input
              placeholder="저자 (선택사항)"
              value={bookauthor}
              onChange={(e) => setBookAuthor(e.target.value)}
              className="text-sm"
            />
          </div>
          <EditorContent
            editor={editor}
            className={cn(
              "text-sm max-h-[20rem] w-full overflow-y-auto rounded-2xl bg-background px-5 py-3",
              isDragActive && "outline-dashed",
              !user && "cursor-not-allowed",
            )}
            readOnly={!user}
          />
          <input {...getInputProps()} disabled={!user} />
        </div>
      </div>

      {!!attachments.length && (
        <AttachmentPreviews
          attachments={attachments}
          removeAttachment={removeAttachment}
        />
      )}

      {/* YouTube 영상 미리보기 */}
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
          onClick={onSubmit}
          loading={mutation.isPending}
          disabled={!input.trim() || isUploading}
          className="text:sm min-w-20"
        >
          {user ? "톡톡" : "톡톡"}
        </LoadingButton>
      </div>
    </div>
  );
}

// ... 나머지 기존 컴포넌트들 유지

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
