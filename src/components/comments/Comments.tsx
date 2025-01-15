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

import { CommentsPage, PostData } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import kyInstance from "@/lib/ky";

interface CommentsProps {
  post: PostData;
}

export default function Comments({ post }: CommentsProps) {
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
