// // 오리지널 코드
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
// import { ClipboardEvent, useRef } from "react";
// import { useSubmitPostMutation } from "./mutations";
// import "./styles.css";
// import useMediaUpload, { Attachment } from "./useMediaUpload";
// import { useDropzone } from "@uploadthing/react";

// export default function PostEditor() {
//   const { user } = useSession();

//   const mutation = useSubmitPostMutation();

//   const {
//     startUpload,
//     attachments,
//     isUploading,
//     uploadProgress,
//     removeAttachment,
//     reset: resetMediaUploads,
//   } = useMediaUpload();

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop: startUpload,
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
//         placeholder: "당신의 생각을 기록하세요...",
//       }),
//     ],
//   });

//   const input =
//     editor?.getText({
//       blockSeparator: "\n",
//     }) || "";

//   function onSubmit() {
//     mutation.mutate(
//       {
//         content: input,
//         mediaIds: attachments.map((a) => a.mediaId).filter(Boolean) as string[],
//       },
//       {
//         onSuccess: () => {
//           editor?.commands.clearContent();
//           resetMediaUploads();
//         },
//       },
//     );
//   }

//   //사이트 내 이미지를 복사해서 인풋창에 붙여넣기 할 수 있음//
//   // function onPaste(e: ClipboardEvent<HTMLInputElement>) {
//   //   const files = Array.from(e.clipboardData.items)
//   //     .filter((item) => item.kind === "file")
//   //     .map((item) => item.getAsFile()) as File[];
//   //   startUpload(files);
//   // }

//   return (
//     <div className="flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm">
//       <div className="flex gap-5">
//         <UserAvatar avatarUrl={user?.avatarUrl} className="hidden sm:inline" />
//         <div {...rootProps} className="w-full">
//           <EditorContent
//             editor={editor}
//             className={cn(
//               "text-sm max-h-[20rem] w-full overflow-y-auto rounded-2xl bg-background px-5 py-3",
//               isDragActive && "outline-dashed",
//             )}
//             // onPaste={onPaste}
//           />
//           <input {...getInputProps()} />
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
//           onFilesSelected={startUpload}
//           disabled={isUploading || attachments.length >= 5}
//         />
//         <LoadingButton
//           onClick={onSubmit}
//           loading={mutation.isPending}
//           disabled={!input.trim() || isUploading}
//           className="text:sm min-w-20"
//         >
//           톡톡
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
import { ClipboardEvent, useRef } from "react";
import { useSubmitPostMutation } from "./mutations";
import "./styles.css";
import useMediaUpload, { Attachment } from "./useMediaUpload";
import { useDropzone } from "@uploadthing/react";
import { useRouter } from "next/navigation";

export default function PostEditor() {
  const { user } = useSession();
  const router = useRouter();
  const mutation = useSubmitPostMutation();

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
      },
      {
        onSuccess: () => {
          editor?.commands.clearContent();
          resetMediaUploads();
        },
      },
    );
  }

  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex gap-5">
        <UserAvatar avatarUrl={user?.avatarUrl} className="hidden sm:inline" />
        <div {...rootProps} className="w-full">
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
