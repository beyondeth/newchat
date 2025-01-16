// import kyInstance from "@/lib/ky";
// import { CommentsPage, PostData } from "@/lib/types";
// import { useInfiniteQuery } from "@tanstack/react-query";
// import { Loader2 } from "lucide-react";
// import { Button } from "../ui/button";
// import Comment from "./Comment";
// import CommentInput from "./CommentInput";

// interface CommentsProps {
//   post: PostData;
// }

// export default function Comments({ post }: CommentsProps) {
//   const { data, fetchNextPage, hasNextPage, isFetching, status } =
//     useInfiniteQuery({
//       queryKey: ["comments", post.id],
//       queryFn: ({ pageParam }) =>
//         kyInstance
//           .get(
//             `/api/posts/${post.id}/comments`,
//             pageParam ? { searchParams: { cursor: pageParam } } : {},
//           )
//           .json<CommentsPage>(),
//       initialPageParam: null as string | null,
//       getNextPageParam: (firstPage) => firstPage.previousCursor,
//       select: (data) => ({
//         pages: [...data.pages].reverse(),
//         pageParams: [...data.pageParams].reverse(),
//       }),
//     });

//   const comments = data?.pages.flatMap((page) => page.comments) || [];

//   return (
//     <div className="space-y-3">
//       <CommentInput post={post} />
//       {hasNextPage && (
//         <Button
//           variant="link"
//           className="mx-auto block"
//           disabled={isFetching}
//           onClick={() => fetchNextPage()}
//         >
//           이전 댓글 더보기
//         </Button>
//       )}
//       {status === "pending" && <Loader2 className="mx-auto animate-spin" />}
//       {status === "success" && !comments.length && (
//         <p className="text-center text-muted-foreground">
//           아직 댓글이 없습니다.
//         </p>
//       )}
//       {status === "error" && (
//         <p className="text-center text-destructive">
//           댓글을 불러오지 못했어요.
//         </p>
//       )}
//       {/* //댓글 포스트 사이즈// */}
//       <div className="text-sm divide-y">
//         {comments.map((comment) => (
//           <Comment key={comment.id} comment={comment} />
//         ))}
//       </div>
//     </div>
//   );
// }

// Comments.tsx
// import { CommentsPage, PostData } from "@/lib/types";
// import { useInfiniteQuery } from "@tanstack/react-query";
// import { Loader2 } from "lucide-react";
// import Comment from "./Comment";
// import CommentInput from "./CommentInput";
// import kyInstance from "@/lib/ky";

// interface CommentsProps {
//   post: PostData;
// }

// export default function Comments({ post }: CommentsProps) {
//   const { data, fetchNextPage, hasNextPage, isFetching, status } =
//     useInfiniteQuery({
//       queryKey: ["comments", post.id],
//       queryFn: ({ pageParam }) =>
//         kyInstance
//           .get(
//             `/api/posts/${post.id}/comments`,
//             pageParam ? { searchParams: { cursor: pageParam } } : {},
//           )
//           .json<CommentsPage>(),
//       initialPageParam: null as string | null,
//       getNextPageParam: (lastPage) => lastPage.previousCursor,
//     });

//   const comments = data?.pages.flatMap((page) => page.comments) || [];

//   return (
//     <div className="space-y-4">
//       <CommentInput post={post} />

//       <div className="divide-y">
//         {comments.map((comment) => (
//           <Comment key={comment.id} comment={comment} post={post} level={0} />
//         ))}
//       </div>

//       {hasNextPage && (
//         <button
//           onClick={() => fetchNextPage()}
//           disabled={isFetching}
//           className="w-full text-sm text-muted-foreground hover:text-foreground"
//         >
//           {isFetching ? "로딩 중..." : "이전 댓글 더보기"}
//         </button>
//       )}

//       {status === "pending" && (
//         <div className="flex justify-center">
//           <Loader2 className="h-6 w-6 animate-spin" />
//         </div>
//       )}

//       {status === "error" && (
//         <div className="text-center text-destructive">
//           댓글을 불러오지 못했습니다.
//         </div>
//       )}

//       {status === "success" && !comments.length && (
//         <div className="text-center text-muted-foreground">
//           첫 번째 댓글을 남겨보세요.
//         </div>
//       )}
//     </div>
//   );
// }

// import { CommentsPage, PostData } from "@/lib/types";
// import { useInfiniteQuery } from "@tanstack/react-query";
// import { Loader2 } from "lucide-react";
// import Comment from "./Comment";
// import CommentInput from "./CommentInput";
// import kyInstance from "@/lib/ky";

// interface CommentsProps {
//   post: PostData;
// }

// export default function Comments({ post }: CommentsProps) {
//   const { data, fetchNextPage, hasNextPage, isFetching, status } =
//     useInfiniteQuery({
//       queryKey: ["comments", post.id],
//       queryFn: ({ pageParam }) =>
//         kyInstance
//           .get(
//             `/api/posts/${post.id}/comments`,
//             pageParam ? { searchParams: { cursor: pageParam } } : {},
//           )
//           .json<CommentsPage>(),
//       initialPageParam: null as string | null,
//       getNextPageParam: (lastPage) => lastPage.previousCursor,
//     });

//   const comments = data?.pages.flatMap((page) => page.comments) || [];

//   return (
//     <div className="space-y-4">
//       <CommentInput post={post} />

//       <div className="divide-y">
//         {comments
//           .filter((comment) => !comment.parentId)
//           .map((comment) => (
//             <Comment key={comment.id} comment={comment} post={post} level={0} />
//           ))}
//       </div>

//       {hasNextPage && (
//         <button
//           onClick={() => fetchNextPage()}
//           disabled={isFetching}
//           className="w-full text-sm text-muted-foreground hover:text-foreground"
//         >
//           {isFetching ? "로딩 중..." : "이전 댓글 더보기"}
//         </button>
//       )}

//       {status === "pending" && (
//         <div className="flex justify-center">
//           <Loader2 className="h-6 w-6 animate-spin" />
//         </div>
//       )}

//       {status === "error" && (
//         <div className="text-center text-destructive">
//           댓글을 불러오지 못했습니다.
//         </div>
//       )}

//       {status === "success" && !comments.length && (
//         <div className="text-center text-muted-foreground">
//           첫 번째 댓글을 남겨보세요.
//         </div>
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

// type CommentWithoutPost = Omit<CommentData, "post">;

// interface CommentProps {
//   comment: CommentWithoutPost;
//   post: PostData;
//   level: number;
// }

// export default function Comment({ comment, post, level }: CommentProps) {
//   const { user } = useSession();
//   const [showReplyInput, setShowReplyInput] = useState(false);
//   const [showReplies, setShowReplies] = useState(true); // 기본적으로 답글 표시
//   const [isLoading, setIsLoading] = useState(false);

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
//       <div style={{ paddingLeft: `${level * 20}px` }}>
//         <div className="group/comment flex gap-3">
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

//         {comment.replies && comment.replies.length > 0 && (
//           <>
//             <button
//               onClick={() => setShowReplies(!showReplies)}
//               className="ml-8 mt-2 text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
//             >
//               <MessageSquare className="h-3 w-3" />
//               {showReplies ? "답글 숨기기" : `답글 ${comment.replies.length}개`}
//             </button>

//             {showReplies &&
//               comment.replies
//                 .filter(
//                   (reply) =>
//                     !reply.deleted ||
//                     (reply.deleted && reply.replies?.length > 0),
//                 )
//                 .map((reply) => (
//                   <Comment
//                     key={reply.id}
//                     comment={reply as CommentWithoutPost}
//                     post={post}
//                     level={level + 1}
//                   />
//                 ))}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

import { CommentsPage, PostData } from "@/lib/types";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import kyInstance from "@/lib/ky";

interface CommentsProps {
  post: PostData;
}

export default function Comments({ post }: CommentsProps) {
  const queryClient = useQueryClient();

  // 컴포넌트 마운트 시 즉시 데이터 프리페치
  useEffect(() => {
    queryClient.prefetchInfiniteQuery({
      queryKey: ["comments", post.id],
      queryFn: ({ pageParam }) =>
        kyInstance
          .get(
            `/api/posts/${post.id}/comments`,
            pageParam ? { searchParams: { cursor: pageParam } } : {},
          )
          .json<CommentsPage>(),
      initialPageParam: null as string | null,
    });
  }, [post.id, queryClient]);

  const { data, fetchNextPage, hasNextPage, isFetching, status } =
    useInfiniteQuery({
      queryKey: ["comments", post.id],
      queryFn: ({ pageParam }) =>
        kyInstance
          .get(
            `/api/posts/${post.id}/comments`,
            pageParam ? { searchParams: { cursor: pageParam } } : {},
          )
          .json<CommentsPage>(),
      initialPageParam: null as string | null,
      getNextPageParam: (lastPage) => lastPage.previousCursor,
    });

  const comments = data?.pages.flatMap((page) => page.comments) || [];

  return (
    <div className="space-y-4">
      <CommentInput post={post} />

      <div className="divide-y">
        {comments
          .filter((comment) => !comment.parentId)
          .map((comment) => (
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
