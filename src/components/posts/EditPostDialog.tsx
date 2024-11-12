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
  const mutation = useEditPostMutation();

  function handleOpenChange(open: boolean) {
    if (!open || !mutation.isPending) {
      onClose();
      setContent(post.content); // 다이얼로그가 닫힐 때 content 리셋
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit post</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate({ id: post.id, content }, { onSuccess: onClose });
          }}
        >
          <div className="grid gap-4 py-4">
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
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              loading={mutation.isPending}
              disabled={!content.trim() || content === post.content}
            >
              Save
            </LoadingButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
