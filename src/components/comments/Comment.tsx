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

// const MAX_DEPTH = 4;

// export default function Comment({ comment, post, level }: CommentProps) {
//   const { user } = useSession();
//   const [showReplyInput, setShowReplyInput] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // level이 MAX_DEPTH 이상일 때는 부모 댓글의 replies에 추가되도록
//   const parentId = level >= MAX_DEPTH ? comment.parentId : comment.id;
//   const canReply = !!user; // 로그인한 사용자만 답글 가능

//   const handleReplySubmit = async () => {
//     setIsLoading(true);
//     try {
//       // 답글 처리 로직
//       setShowReplyInput(false);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div
//       style={{
//         paddingLeft: `${Math.min(level, MAX_DEPTH) * 20}px`,
//       }}
//       className="py-3"
//     >
//       <div className="group/comment flex gap-3">
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

//           <div className="text-sm">
//             {comment.content ? comment.content : "댓글이 삭제되었습니다"}
//           </div>

//           {canReply && (
//             <button
//               onClick={() => setShowReplyInput(!showReplyInput)}
//               className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
//               disabled={isLoading}
//             >
//               <MessageSquare className="h-3 w-3" />
//               {isLoading ? "처리 중..." : "답글달기"}
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
//             parentId={parentId} // MAX_DEPTH에 도달하면 부모 댓글의 ID를 사용
//             onSuccess={handleReplySubmit}
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
//   const [isLoading, setIsLoading] = useState(false);

//   // 4단계부터는 모두 같은 레벨(3)로 표시
//   const displayLevel = Math.min(level, 3);
//   const canReply = !!user;

//   const handleReplySubmit = async () => {
//     setIsLoading(true);
//     try {
//       setShowReplyInput(false);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // 사용자 정보가 없는 경우 기본값 제공
//   const commentUser = comment.user || {
//     username: "unknown",
//     displayName: "알 수 없는 사용자",
//     avatarUrl: "/default-avatar.png",
//   };

//   return (
//     <div className="py-3">
//       <div style={{ paddingLeft: `12px` }}>
//         <div
//           className={`group/comment flex gap-3 ${
//             displayLevel > 0 ? "pl-4" : ""
//           }`}
//         >
//           <div className="flex-shrink-0">
//             <UserTooltip user={commentUser}>
//               <Link href={`/users/${commentUser.username}`}>
//                 <UserAvatar avatarUrl={commentUser.avatarUrl} size={32} />
//               </Link>
//             </UserTooltip>
//           </div>

//           <div className="flex-1 space-y-1">
//             <div className="flex items-center gap-2">
//               <UserTooltip user={commentUser}>
//                 <Link
//                   href={`/users/${commentUser.username}`}
//                   className="font-medium hover:underline"
//                 >
//                   {commentUser.displayName}
//                 </Link>
//               </UserTooltip>
//               <span className="text-sm text-muted-foreground">
//                 {formatRelativeDate(comment.createdAt)}
//               </span>
//             </div>

//             <div className="text-sm">
//               {comment.content ? comment.content : "댓글이 삭제되었습니다"}
//             </div>

//             {canReply && (
//               <button
//                 onClick={() => setShowReplyInput(!showReplyInput)}
//                 className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
//                 disabled={isLoading}
//               >
//                 <MessageSquare className="h-3 w-3" />
//                 {isLoading ? "처리 중..." : "답글달기"}
//               </button>
//             )}
//           </div>

//           {user?.id === commentUser.id && (
//             <CommentMoreButton
//               comment={comment}
//               className="opacity-0 transition-opacity group-hover/comment:opacity-100"
//             />
//           )}
//         </div>

//         {showReplyInput && (
//           <div className="ml-8 mt-2">
//             <CommentInput
//               post={post}
//               parentId={comment.id}
//               onSuccess={handleReplySubmit}
//               placeholder={`${commentUser.displayName}님에게 답글 쓰기...`}
//             />
//           </div>
//         )}

//         {comment.replies?.map((reply) => (
//           <Comment
//             key={reply.id}
//             comment={reply as CommentWithoutPost}
//             post={post}
//             level={level + 1}
//           />
//         ))}
//       </div>
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
//   const [isLoading, setIsLoading] = useState(false);

//   // 4단계부터는 모두 같은 레벨(3)로 표시
//   const displayLevel = Math.min(level, 3);
//   const canReply = !!user;

//   const handleReplySubmit = async () => {
//     setIsLoading(true);
//     try {
//       setShowReplyInput(false);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // 삭제된 댓글 여부 확인
//   const isDeleted = comment.deleted || !comment.content;

//   // 사용자 정보가 없는 경우 기본값 제공
//   const commentUser = comment.user || {
//     username: "unknown",
//     displayName: "알 수 없는 사용자",
//     avatarUrl: "/default-avatar.png",
//   };

//   // 자식 댓글 중 삭제되지 않은 댓글이 있는지 확인
//   const hasVisibleReplies = comment.replies?.some((reply) => !reply.deleted);

//   // 삭제된 댓글이고 자식 댓글도 없으면 null 반환
//   if (isDeleted && !hasVisibleReplies) {
//     return null;
//   }

//   return (
//     <div className="py-3">
//       <div style={{ paddingLeft: `12px` }}>
//         <div
//           className={`group/comment flex gap-3 ${
//             displayLevel > 0 ? "pl-4" : ""
//           }`}
//         >
//           <div className="flex-shrink-0">
//             <UserTooltip user={commentUser}>
//               <Link href={`/users/${commentUser.username}`}>
//                 <UserAvatar avatarUrl={commentUser.avatarUrl} size={32} />
//               </Link>
//             </UserTooltip>
//           </div>

//           <div className="flex-1 space-y-1">
//             <div className="flex items-center gap-2">
//               <UserTooltip user={commentUser}>
//                 <Link
//                   href={`/users/${commentUser.username}`}
//                   className="font-medium hover:underline"
//                 >
//                   {commentUser.displayName}
//                 </Link>
//               </UserTooltip>
//               <span className="text-sm text-muted-foreground">
//                 {formatRelativeDate(comment.createdAt)}
//               </span>
//             </div>

//             <div
//               className={`text-sm ${isDeleted ? "text-muted-foreground italic" : ""}`}
//             >
//               {isDeleted ? "댓글이 삭제되었습니다" : comment.content}
//             </div>

//             {canReply && !isDeleted && (
//               <button
//                 onClick={() => setShowReplyInput(!showReplyInput)}
//                 className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
//                 disabled={isLoading}
//               >
//                 <MessageSquare className="h-3 w-3" />
//                 {isLoading ? "처리 중..." : "답글달기"}
//               </button>
//             )}
//           </div>

//           {user?.id === commentUser.id && !isDeleted && (
//             <CommentMoreButton
//               comment={comment}
//               className="opacity-0 transition-opacity group-hover/comment:opacity-100"
//             />
//           )}
//         </div>

//         {showReplyInput && !isDeleted && (
//           <div className="ml-8 mt-2">
//             <CommentInput
//               post={post}
//               parentId={comment.id}
//               onSuccess={handleReplySubmit}
//               placeholder={`${commentUser.displayName}님에게 답글 쓰기...`}
//             />
//           </div>
//         )}

//         {comment.replies
//           ?.filter(
//             (reply) =>
//               !reply.deleted ||
//               (reply.deleted && reply.replies && reply.replies.length > 0),
//           )
//           .map((reply) => (
//             <Comment
//               key={reply.id}
//               comment={reply as CommentWithoutPost}
//               post={post}
//               level={level + 1}
//             />
//           ))}
//       </div>
//     </div>
//   );
// }

import { CommentsPage, PostData, CommentData } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import kyInstance from "@/lib/ky";

interface CommentProps {
  comment: CommentData;
  post: PostData;
  level: number;
}

export default function Comments({ post }: CommentProps) {
  const { data, fetchNextPage, hasNextPage, isFetching, status } =
    useInfiniteQuery({
      queryKey: ["comments", post.id],
      queryFn: async ({ pageParam }) => {
        const response = await kyInstance
          .get(
            `/api/posts/${post.id}/comments`,
            pageParam ? { searchParams: { cursor: pageParam } } : {},
          )
          .json<CommentsPage>();

        // 마지막 댓글의 ID를 커서로 사용
        const newCursor =
          response.comments.length > 0
            ? response.comments[response.comments.length - 1].id
            : null;

        return {
          ...response,
          previousCursor: newCursor,
        };
      },
      initialPageParam: null as string | null,
      getNextPageParam: (lastPage) => lastPage.previousCursor,
      // 최대 10페이지까지만 로드
      maxPages: 10,
    });

  // 최상위 댓글만 필터링 및 정렬
  const comments = (data?.pages.flatMap((page) => page.comments) || [])
    .filter((comment) => !comment.parentId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  return (
    <div className="space-y-4">
      <CommentInput post={post} />

      <div>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} post={post} level={0} />
        ))}
      </div>

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetching}
          className="w-full text-sm text-muted-foreground hover:text-foreground"
        >
          {isFetching ? "로딩 중..." : "이전 댓글 더보기"}
        </button>
      )}

      {status === "pending" && (
        <div className="flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      )}

      {status === "error" && (
        <div className="text-center text-destructive">
          댓글을 불러오지 못했습니다.
        </div>
      )}

      {status === "success" && !comments.length && (
        <div className="text-center text-muted-foreground">
          첫 번째 댓글을 남겨보세요.
        </div>
      )}
    </div>
  );
}
