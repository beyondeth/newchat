// import { CommentData } from "@/lib/types";
// import LoadingButton from "../LoadingButton";
// import { Button } from "../ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "../ui/dialog";
// import { useEditCommentMutation } from "./mutations";
// import { useState } from "react";
// import { Textarea } from "../ui/textarea";

// interface EditCommentDialogProps {
//   comment: CommentData;
//   open: boolean;
//   onClose: () => void;
// }

// export default function EditCommentDialog({
//   comment,
//   open,
//   onClose,
// }: EditCommentDialogProps) {
//   const [content, setContent] = useState(comment.content);
//   const mutation = useEditCommentMutation();

//   function handleOpenChange(open: boolean) {
//     if (!open || !mutation.isPending) {
//       onClose();
//       setContent(comment.content); // 다이얼로그가 닫힐 때 content 리셋
//     }
//   }

//   return (
//     <Dialog open={open} onOpenChange={handleOpenChange}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Edit comment</DialogTitle>
//         </DialogHeader>
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             mutation.mutate(
//               { id: comment.id, content },
//               { onSuccess: onClose },
//             );
//           }}
//         >
//           <div className="grid gap-4 py-4">
//             <Textarea
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               placeholder="Edit your comment..."
//               rows={4}
//               className="resize-none"
//             />
//           </div>
//           <DialogFooter>
//             <Button
//               type="button"
//               variant="outline"
//               onClick={onClose}
//               disabled={mutation.isPending}
//             >
//               Cancel
//             </Button>
//             <LoadingButton
//               type="submit"
//               loading={mutation.isPending}
//               disabled={!content.trim() || content === comment.content}
//             >
//               Save
//             </LoadingButton>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

// import { CommentData } from "@/lib/types";
// import LoadingButton from "../LoadingButton";
// import { Button } from "../ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "../ui/dialog";
// import { useEditCommentMutation } from "./mutations";
// import { useState } from "react";
// import { Textarea } from "../ui/textarea";
// import { CommentWithoutPost } from "@/lib/types"; // 타입 import 추가

// interface EditCommentDialogProps {
//   comment: CommentWithoutPost; // 타입 수정
//   open: boolean;
//   onClose: () => void;
// }
// export default function EditCommentDialog({
//   comment,
//   open,
//   onClose,
// }: EditCommentDialogProps) {
//   const [content, setContent] = useState(comment.content);
//   const [showFullContent, setShowFullContent] = useState(false);
//   const mutation = useEditCommentMutation();

//   const MAX_LENGTH = 200;
//   const TRUNCATE_LENGTH = 100;

//   function handleOpenChange(open: boolean) {
//     if (!open || !mutation.isPending) {
//       onClose();
//       setContent(comment.content);
//       setShowFullContent(false);
//     }
//   }

//   function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
//     const newContent = e.target.value;
//     if (newContent.length <= MAX_LENGTH) {
//       setContent(newContent);
//     }
//   }

//   const displayContent = showFullContent
//     ? content
//     : content.length > TRUNCATE_LENGTH
//       ? `${content.slice(0, TRUNCATE_LENGTH)}...`
//       : content;

//   return (
//     <Dialog open={open} onOpenChange={handleOpenChange}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Edit comment</DialogTitle>
//         </DialogHeader>
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             mutation.mutate(
//               { id: comment.id, content },
//               { onSuccess: onClose },
//             );
//           }}
//         >
//           <div className="grid gap-4 py-4">
//             <div className="space-y-2">
//               <Textarea
//                 value={content}
//                 onChange={handleContentChange}
//                 placeholder="Edit your comment..."
//                 rows={4}
//                 className="resize-none"
//                 maxLength={MAX_LENGTH}
//               />
//               <div className="flex justify-between text-sm text-muted-foreground">
//                 <span>
//                   {content.length}/{MAX_LENGTH}
//                 </span>
//                 {content.length > TRUNCATE_LENGTH && !showFullContent && (
//                   <button
//                     type="button"
//                     onClick={() => setShowFullContent(true)}
//                     className="text-primary hover:underline"
//                   >
//                     더보기
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//           <DialogFooter>
//             <Button
//               type="button"
//               variant="outline"
//               onClick={onClose}
//               disabled={mutation.isPending}
//             >
//               Cancel
//             </Button>
//             <LoadingButton
//               type="submit"
//               loading={mutation.isPending}
//               disabled={!content.trim() || content === comment.content}
//             >
//               Save
//             </LoadingButton>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

import { CommentWithoutPost } from "@/lib/types";
import LoadingButton from "../LoadingButton";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useEditCommentMutation } from "./mutations";
import { useState } from "react";
import { Textarea } from "../ui/textarea";

interface EditCommentDialogProps {
  comment: CommentWithoutPost;
  open: boolean;
  onClose: () => void;
}

export default function EditCommentDialog({
  comment,
  open,
  onClose,
}: EditCommentDialogProps) {
  // null이 올 수 있는 경우를 대비해 초기값 처리
  const [content, setContent] = useState(comment.content ?? "");
  const [showFullContent, setShowFullContent] = useState(false);
  const mutation = useEditCommentMutation();

  const MAX_LENGTH = 200;
  const TRUNCATE_LENGTH = 100;

  function handleOpenChange(open: boolean) {
    if (!open || !mutation.isPending) {
      onClose();
      // null 처리
      setContent(comment.content ?? "");
      setShowFullContent(false);
    }
  }

  function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const newContent = e.target.value;
    if (newContent.length <= MAX_LENGTH) {
      setContent(newContent);
    }
  }

  const displayContent = showFullContent
    ? content
    : content.length > TRUNCATE_LENGTH
      ? `${content.slice(0, TRUNCATE_LENGTH)}...`
      : content;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit comment</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate(
              {
                id: comment.id,
                // null이나 빈 문자열 방지
                content: content.trim() || "",
              },
              { onSuccess: onClose },
            );
          }}
        >
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Textarea
                value={content}
                onChange={handleContentChange}
                placeholder="Edit your comment..."
                rows={4}
                className="resize-none"
                maxLength={MAX_LENGTH}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>
                  {content.length}/{MAX_LENGTH}
                </span>
                {content.length > TRUNCATE_LENGTH && !showFullContent && (
                  <button
                    type="button"
                    onClick={() => setShowFullContent(true)}
                    className="text-primary hover:underline"
                  >
                    더보기
                  </button>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={mutation.isPending}
            >
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              loading={mutation.isPending}
              // 내용이 비어있거나 원본과 동일한 경우 비활성화
              disabled={!content.trim() || content === (comment.content ?? "")}
            >
              Save
            </LoadingButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
