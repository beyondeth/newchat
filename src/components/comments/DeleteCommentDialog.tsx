// import { CommentData } from "@/lib/types";
// import LoadingButton from "../LoadingButton";
// import { Button } from "../ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "../ui/dialog";
// import { useDeleteCommentMutation } from "./mutations";
// import { CommentWithoutPost } from "@/lib/types"; // 타입 import 추가

// interface DeleteCommentDialogProps {
//   comment: CommentWithoutPost; // 타입 수정
//   open: boolean;
//   onClose: () => void;
// }

// export default function DeleteCommentDialog({
//   comment,
//   open,
//   onClose,
// }: DeleteCommentDialogProps) {
//   const mutation = useDeleteCommentMutation();

//   function handleOpenChange(open: boolean) {
//     if (!open || !mutation.isPending) {
//       onClose();
//     }
//   }

//   return (
//     <Dialog open={open} onOpenChange={handleOpenChange}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Delete comment?</DialogTitle>
//           <DialogDescription>
//             Are you sure you want to delete this comment? This action cannot be
//             undone.
//           </DialogDescription>
//         </DialogHeader>
//         <DialogFooter>
//           <LoadingButton
//             variant="destructive"
//             onClick={() => mutation.mutate(comment.id, { onSuccess: onClose })}
//             loading={mutation.isPending}
//           >
//             Delete
//           </LoadingButton>
//           <Button
//             variant="outline"
//             onClick={onClose}
//             disabled={mutation.isPending}
//           >
//             Cancel
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

import { CommentWithoutPost } from "@/lib/types";
import LoadingButton from "../LoadingButton";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useDeleteCommentMutation } from "./mutations";

interface DeleteCommentDialogProps {
  comment: CommentWithoutPost;
  open: boolean;
  onClose: () => void;
}

export default function DeleteCommentDialog({
  comment,
  open,
  onClose,
}: DeleteCommentDialogProps) {
  const mutation = useDeleteCommentMutation();

  function handleOpenChange(open: boolean) {
    if (!open || !mutation.isPending) {
      onClose();
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>댓글 삭제</AlertDialogTitle>
          <AlertDialogDescription>
            삭제한 댓글은 복구할 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-end gap-3">
          <AlertDialogCancel asChild>
            <Button
              variant="outline"
              onClick={onClose}
              disabled={mutation.isPending}
            >
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <LoadingButton
              variant="destructive"
              onClick={() =>
                mutation.mutate(comment.id, { onSuccess: onClose })
              }
              loading={mutation.isPending}
            >
              Delete
            </LoadingButton>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
