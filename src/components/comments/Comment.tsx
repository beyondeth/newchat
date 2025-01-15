// import { useSession } from "@/app/(main)/SessionProvider";
// import { CommentData } from "@/lib/types";
// import { formatRelativeDate } from "@/lib/utils";
// import Link from "next/link";
// import UserAvatar from "../UserAvatar";
// import UserTooltip from "../UserTooltip";
// import CommentMoreButton from "./CommentMoreButton";

// interface CommentProps {
//   comment: CommentData;
//   level?: number;
// }

// export default function Comment({ comment }: CommentProps) {
//   const { user } = useSession();

//   return (
//     <div className="group/comment flex gap-3 py-3">
//       <span className="hidden sm:inline">
//         <UserTooltip user={comment.user}>
//           <Link href={`/users/${comment.user.username}`}>
//             <UserAvatar avatarUrl={comment.user.avatarUrl} size={40} />
//           </Link>
//         </UserTooltip>
//       </span>
//       <div>
//         <div className="flex items-center gap-1 text-sm">
//           <UserTooltip user={comment.user}>
//             <Link
//               href={`/users/${comment.user.username}`}
//               className="font-medium text-sm hover:underline"
//             >
//               {comment.user.displayName}
//             </Link>
//           </UserTooltip>
//           <span className="text-xs text-muted-foreground">
//             {formatRelativeDate(comment.createdAt)}
//           </span>
//           {/* <span>답글</span> */}
//         </div>
//         <div>{comment.content}</div>
//       </div>
//       {comment.user.id === user?.id && (
//         <CommentMoreButton
//           comment={comment}
//           className="ms-auto opacity-0 transition-opacity group-hover/comment:opacity-100"
//         />
//       )}
//     </div>
//   );
// }

// import { useSession } from "@/app/(main)/SessionProvider";
// import { CommentData, PostData } from "@/lib/types";
// import { formatRelativeDate } from "@/lib/utils";
// import { MessageSquare } from "lucide-react";
// import Link from "next/link";
// import { useState } from "react";
// import UserAvatar from "../UserAvatar";
// import UserTooltip from "../UserTooltip";
// import CommentInput from "./CommentInput";
// import CommentMoreButton from "./CommentMoreButton";

// // 수정된 타입 정의
// type CommentWithoutPost = Omit<CommentData, "post">;

// interface CommentProps {
//   comment: CommentWithoutPost;
//   post: PostData;
//   level: number;
// }

// export default function Comment({ comment, post, level }: CommentProps) {
//   const { user } = useSession();
//   const [showReplyInput, setShowReplyInput] = useState(false);

//   const MAX_DEPTH = 100;
//   const canReply = level < MAX_DEPTH && user;

//   return (
//     <div className="py-3">
//       <div
//         className={`group/comment flex gap-3 ${
//           level > 0 ? "ml-8 pl-4 border-l-2 border-muted" : ""
//         }`}
//       >
//         <div className="flex-shrink-0">
//           <UserTooltip user={comment.user}>
//             <Link href={`/users/${comment.user.username}`}>
//               <UserAvatar avatarUrl={comment.user.avatarUrl} size={32} />
//             </Link>
//           </UserTooltip>
//         </div>

//         <div className="flex-1 space-y-1">
//           <div className="flex items-center gap-2">
//             <UserTooltip user={comment.user}>
//               <Link
//                 href={`/users/${comment.user.username}`}
//                 className="font-medium hover:underline"
//               >
//                 {comment.user.displayName}
//               </Link>
//             </UserTooltip>
//             <span className="text-sm text-muted-foreground">
//               {formatRelativeDate(comment.createdAt)}
//             </span>
//           </div>

//           <div className="text-sm">{comment.content}</div>

//           {canReply && (
//             <button
//               onClick={() => setShowReplyInput(!showReplyInput)}
//               className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
//             >
//               <MessageSquare className="h-3 w-3" />
//               답글달기
//             </button>
//           )}
//         </div>

//         {user?.id === comment.user.id && (
//           <CommentMoreButton
//             comment={comment}
//             className="opacity-0 transition-opacity group-hover/comment:opacity-100"
//           />
//         )}
//       </div>

//       {showReplyInput && (
//         <div className="ml-8 mt-2">
//           <CommentInput
//             post={post}
//             parentId={comment.id}
//             onSuccess={() => setShowReplyInput(false)}
//           />
//         </div>
//       )}

//       {comment.replies?.map((reply) => (
//         <Comment
//           key={reply.id}
//           comment={reply as CommentWithoutPost} // 타입 단언 추가
//           post={post}
//           level={level + 1}
//         />
//       ))}
//     </div>
//   );
// }

// import { useSession } from "@/app/(main)/SessionProvider";
// import { CommentData, PostData } from "@/lib/types";
// import { formatRelativeDate } from "@/lib/utils";
// import { MessageSquare } from "lucide-react";
// import Link from "next/link";
// import { useState } from "react";
// import UserAvatar from "../UserAvatar";
// import UserTooltip from "../UserTooltip";
// import CommentInput from "./CommentInput";
// import CommentMoreButton from "./CommentMoreButton";

// type CommentWithoutPost = Omit<CommentData, "post">;

// interface CommentProps {
//   comment: CommentWithoutPost;
//   post: PostData;
//   level: number;
// }

// export default function Comment({ comment, post, level }: CommentProps) {
//   const { user } = useSession();
//   const [showReplyInput, setShowReplyInput] = useState(false);

//   const MAX_DEPTH = 5;
//   const canReply = level < MAX_DEPTH && user;

//   return (
//     <div style={{ paddingLeft: `${level * 20}px` }} className="py-3">
//       <div className="group/comment flex gap-3 py-3">
//         <div className="flex-shrink-0">
//           <UserTooltip user={comment.user}>
//             <Link href={`/users/${comment.user.username}`}>
//               <UserAvatar avatarUrl={comment.user.avatarUrl} size={32} />
//             </Link>
//           </UserTooltip>
//         </div>

//         <div className="flex-1 space-y-1">
//           <div className="flex items-center gap-2">
//             <UserTooltip user={comment.user}>
//               <Link
//                 href={`/users/${comment.user.username}`}
//                 className="font-medium hover:underline"
//               >
//                 {comment.user.displayName}
//               </Link>
//             </UserTooltip>
//             <span className="text-sm text-muted-foreground">
//               {formatRelativeDate(comment.createdAt)}
//             </span>
//           </div>

//           <div className="text-sm">{comment.content}</div>

//           {canReply && (
//             <button
//               onClick={() => setShowReplyInput(!showReplyInput)}
//               className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
//             >
//               <MessageSquare className="h-3 w-3" />
//               답글달기
//             </button>
//           )}
//         </div>

//         {user?.id === comment.user.id && (
//           <CommentMoreButton
//             comment={comment}
//             className="opacity-0 transition-opacity group-hover/comment:opacity-100"
//           />
//         )}
//       </div>

//       {showReplyInput && (
//         <div className="ml-8">
//           <CommentInput
//             post={post}
//             parentId={comment.id}
//             onSuccess={() => setShowReplyInput(false)}
//           />
//         </div>
//       )}

//       {comment.replies?.map((reply) => (
//         <Comment
//           key={reply.id}
//           comment={reply as CommentWithoutPost}
//           post={post}
//           level={level + 1}
//         />
//       ))}
//     </div>
//   );
// }

import { useSession } from "@/app/(main)/SessionProvider";
import { CommentData, PostData } from "@/lib/types";
import { formatRelativeDate } from "@/lib/utils";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import UserAvatar from "../UserAvatar";
import UserTooltip from "../UserTooltip";
import CommentInput from "./CommentInput";
import CommentMoreButton from "./CommentMoreButton";

type CommentWithoutPost = Omit<CommentData, "post">;

interface CommentProps {
  comment: CommentWithoutPost;
  post: PostData;
  level: number;
}

const MAX_DEPTH = 5;

export default function Comment({ comment, post, level }: CommentProps) {
  const { user } = useSession();
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const canReply = level < MAX_DEPTH && user;

  const handleReplySubmit = async () => {
    setIsLoading(true);
    try {
      // 답글 처리 로직
      setShowReplyInput(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ paddingLeft: `${level * 20}px` }} className="py-3">
      <div className="group/comment flex gap-3">
        <div className="flex-shrink-0">
          <UserTooltip user={comment.user}>
            <Link href={`/users/${comment.user.username}`}>
              <UserAvatar avatarUrl={comment.user.avatarUrl} size={32} />
            </Link>
          </UserTooltip>
        </div>

        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <UserTooltip user={comment.user}>
              <Link
                href={`/users/${comment.user.username}`}
                className="font-medium hover:underline"
              >
                {comment.user.displayName}
              </Link>
            </UserTooltip>
            <span className="text-sm text-muted-foreground">
              {formatRelativeDate(comment.createdAt)}
            </span>
          </div>

          <div className="text-sm">
            {comment.content ? comment.content : "댓글이 삭제되었습니다"}
          </div>

          {canReply && (
            <button
              onClick={() => setShowReplyInput(!showReplyInput)}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
              disabled={isLoading}
            >
              <MessageSquare className="h-3 w-3" />
              {isLoading ? "처리 중..." : "답글달기"}
            </button>
          )}
        </div>

        {user?.id === comment.user.id && (
          <CommentMoreButton
            comment={comment}
            className="opacity-0 transition-opacity group-hover/comment:opacity-100"
          />
        )}
      </div>

      {showReplyInput && (
        <div className="ml-8">
          <CommentInput
            post={post}
            parentId={comment.id}
            onSuccess={handleReplySubmit}
          />
        </div>
      )}

      {comment.replies?.map((reply) => (
        <Comment
          key={reply.id}
          comment={reply as CommentWithoutPost}
          post={post}
          level={level + 1}
        />
      ))}
    </div>
  );
}
