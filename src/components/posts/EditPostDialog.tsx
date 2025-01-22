// import { PostData } from "@/lib/types";
// import LoadingButton from "../LoadingButton";
// import { Button } from "../ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "../ui/dialog";
// import { useEditPostMutation } from "./mutations";
// import { useState } from "react";
// import { Textarea } from "../ui/textarea";

// interface EditPostDialogProps {
//   post: PostData;
//   open: boolean;
//   onClose: () => void;
// }

// export default function EditPostDialog({
//   post,
//   open,
//   onClose,
// }: EditPostDialogProps) {
//   const [content, setContent] = useState(post.content);
//   const mutation = useEditPostMutation();

//   function handleOpenChange(open: boolean) {
//     if (!open || !mutation.isPending) {
//       onClose();
//       setContent(post.content); // 다이얼로그가 닫힐 때 content 리셋
//     }
//   }

//   return (
//     <Dialog open={open} onOpenChange={handleOpenChange}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>수정하기</DialogTitle>
//         </DialogHeader>
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             mutation.mutate({ id: post.id, content }, { onSuccess: onClose });
//           }}
//         >
//           <div className="grid gap-4 py-4">
//             <Textarea
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               placeholder="What's on your mind?"
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
//               취소
//             </Button>
//             <LoadingButton
//               type="submit"
//               loading={mutation.isPending}
//               disabled={!content.trim() || content === post.content}
//             >
//               저장
//             </LoadingButton>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";
import { PostData } from "@/lib/types";
import LoadingButton from "../LoadingButton";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useEditPostMutation } from "./mutations";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

interface EditPostDialogProps {
  post: PostData;
  open: boolean;
  onClose: () => void;
}

export default function EditPostDialog({
  post,
  open,
  onClose,
}: EditPostDialogProps) {
  const [content, setContent] = useState(post.content);
  const [booktitle, setBooktitle] = useState(post.booktitle || "");
  const [bookauthor, setBookauthor] = useState(post.bookauthor || "");
  const mutation = useEditPostMutation();

  function handleOpenChange(open: boolean) {
    if (!open || !mutation.isPending) {
      onClose();
      // 다이얼로그가 닫힐 때 모든 상태 리셋
      setContent(post.content);
      setBooktitle(post.booktitle || "");
      setBookauthor(post.bookauthor || "");
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>수정하기</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate(
              {
                id: post.id,
                content,
                booktitle: booktitle || undefined,
                bookauthor: bookauthor || undefined,
              },
              { onSuccess: onClose },
            );
          }}
        >
          <div className="grid gap-4 py-4">
            <div className="flex gap-3">
              <Input
                placeholder="책 제목 (선택사항)"
                value={booktitle}
                onChange={(e) => setBooktitle(e.target.value)}
                className="text-sm"
              />
              <Input
                placeholder="저자 (선택사항)"
                value={bookauthor}
                onChange={(e) => setBookauthor(e.target.value)}
                className="text-sm"
              />
            </div>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              rows={4}
              className="resize-none"
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={mutation.isPending}
            >
              취소
            </Button>
            <LoadingButton
              type="submit"
              loading={mutation.isPending}
              disabled={
                !content.trim() ||
                (content === post.content &&
                  booktitle === (post.booktitle || "") &&
                  bookauthor === (post.bookauthor || ""))
              }
            >
              저장
            </LoadingButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
