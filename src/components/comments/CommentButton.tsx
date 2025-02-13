// "use client";
// import { PostData } from "@/lib/types";
// import { MessageSquareText } from "lucide-react";

// interface CommentButtonProps {
//   post: PostData;
//   onClick: () => void;
// }

// export default function CommentButton({ post, onClick }: CommentButtonProps) {
//   return (
//     <button
//       onClick={onClick}
//       className="flex items-center gap-2 p-1 rounded-sm transition-colors duration-200 hover:bg-gray-100"
//     >
//       <MessageSquareText className="size-4" />
//       <div className="text-xs font-medium tabular-nums">
//         {post._count.comments}{" "}
//         {/* <span className="hidden sm:inline">comments</span> */}
//         <span className="hidden sm:inline"></span>
//       </div>
//     </button>
//   );
// }

// "use client";
// import { useSession } from "@/app/(main)/SessionProvider";
// import { PostData } from "@/lib/types";
// import { cn } from "@/lib/utils";
// import { MessageCircle, MessageSquareText } from "lucide-react";

// interface CommentButtonProps {
//   post: PostData;
//   onClick: () => void;
// }

// export default function CommentButton({ post, onClick }: CommentButtonProps) {
//   const { user } = useSession();

//   return (
//     <button
//       onClick={onClick}
//       disabled={!user}
//       className={cn(
//         "flex items-center gap-2 p-1 rounded-sm transition-colors duration-200",
//         user ? "hover:bg-gray-100" : "opacity-50 cursor-not-allowed",
//       )}
//     >
//       <MessageCircle className="size-4" />
//       <div className="text-xs font-medium tabular-nums">
//         {post._count.comments}
//         <span className="hidden sm:inline"></span>
//       </div>
//     </button>
//   );
// }

"use client";
import { useSession } from "@/app/(main)/SessionProvider";
import { PostData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

interface CommentButtonProps {
  post: PostData;
  onClick: () => void;
}

export default function CommentButton({ post, onClick }: CommentButtonProps) {
  const { user } = useSession();
  const queryClient = useQueryClient();

  // 포스트 피드 데이터에서 실시간으로 댓글 수 계산
  const dynamicCommentCount =
    queryClient
      .getQueryData<{
        pages: Array<{
          posts: PostData[];
        }>;
      }>(["post-feed"])
      ?.pages.flatMap((page) => page.posts)
      .find((p) => p.id === post.id)?._count.comments || post._count.comments;

  return (
    <button
      onClick={onClick}
      disabled={!user}
      className={cn(
        "flex items-center gap-2 p-1 rounded-sm transition-colors duration-200",
        user ? "hover:bg-gray-100" : "opacity-50 cursor-not-allowed",
      )}
    >
      <MessageCircle className="size-4" />
      <div className="text-xs font-medium tabular-nums">
        {dynamicCommentCount}
        <span className="hidden sm:inline"></span>
      </div>
    </button>
  );
}
