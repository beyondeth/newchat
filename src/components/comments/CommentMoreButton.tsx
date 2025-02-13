import { CommentData } from "@/lib/types";
import { Edit2, MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import DeleteCommentDialog from "./DeleteCommentDialog";
import EditCommentDialog from "./EditCommentDialog";
import { CommentWithoutPost } from "@/lib/types";

interface CommentMoreButtonProps {
  comment: CommentWithoutPost;
  className?: string;
}

export default function CommentMoreButton({
  comment,
  className,
}: CommentMoreButtonProps) {
  const [showDeleteDialog, setCommentShowDeleteDialog] = useState(false);
  //edit 추가함
  const [showEditDialog, setCommentShowEditDialog] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost" className={className}>
            <MoreHorizontal className="size-5 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* //edit 추가함// */}
          <DropdownMenuItem onClick={() => setCommentShowEditDialog(true)}>
            <span className="flex items-center gap-3 text-muted-foreground">
              <Edit2 className="size-4" />
              수정
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setCommentShowDeleteDialog(true)}>
            <span className="flex items-center gap-3 text-destructive">
              <Trash2 className="size-4" />
              삭제
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteCommentDialog
        comment={comment}
        open={showDeleteDialog}
        onClose={() => setCommentShowDeleteDialog(false)}
      />
      <EditCommentDialog
        comment={comment}
        open={showEditDialog}
        onClose={() => setCommentShowEditDialog(false)}
      />
    </>
  );
}
