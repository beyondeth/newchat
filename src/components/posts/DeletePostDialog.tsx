// "use client";

// import { PostData } from "@/lib/types";
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
// import { useDeletePostMutation } from "./mutations";

// interface DeletePostDialogProps {
//   post: PostData;
//   open: boolean;
//   onClose: () => void;
// }

// export default function DeletePostDialog({
//   post,
//   open,
//   onClose,
// }: DeletePostDialogProps) {
//   const mutation = useDeletePostMutation();

//   function handleOpenChange(open: boolean) {
//     if (!open || !mutation.isPending) {
//       onClose();
//     }
//   }

//   return (
//     <Dialog open={open} onOpenChange={handleOpenChange}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>게시글 삭제</DialogTitle>
//           <DialogDescription>
//             삭제한 게시글은 복구할 수 없습니다.
//           </DialogDescription>
//         </DialogHeader>
//         <DialogFooter>
//           <LoadingButton
//             variant="destructive"
//             onClick={() => mutation.mutate(post.id, { onSuccess: onClose })}
//             loading={mutation.isPending}
//           >
//             삭제
//           </LoadingButton>
//           <Button
//             variant="outline"
//             onClick={onClose}
//             disabled={mutation.isPending}
//           >
//             취소
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

// DeletePostDialog.tsx
import { PostData } from "@/lib/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useDeletePostMutation } from "./mutations";
import { Button } from "../ui/button";
import LoadingButton from "../LoadingButton";

interface DeletePostDialogProps {
  post: PostData;
  open: boolean;
  onClose: () => void;
}

export default function DeletePostDialog({
  post,
  open,
  onClose,
}: DeletePostDialogProps) {
  const mutation = useDeletePostMutation();

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>게시글 삭제</AlertDialogTitle>
          <AlertDialogDescription>
            삭제한 게시글은 복구할 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-end gap-3">
          <AlertDialogCancel asChild>
            <Button
              variant="outline"
              onClick={onClose}
              disabled={mutation.isPending}
            >
              취소
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <LoadingButton
              variant="destructive"
              onClick={() => mutation.mutate(post.id, { onSuccess: onClose })}
              loading={mutation.isPending}
            >
              삭제
            </LoadingButton>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
