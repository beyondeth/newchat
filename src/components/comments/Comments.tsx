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
//       refetchOnWindowFocus: false,
//       staleTime: 5000,
//       // select: (data) => ({
//       //   pages: [...data.pages].reverse(),
//       //   pageParams: [...data.pageParams].reverse(),
//       // }),
//     });

//   // const comments = data?.pages.flatMap((page) => page.comments) || [];
//   // 댓글 데이터를 직접 여기서 처리
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
//         <div className="text-center text-sm text-muted-foreground">
//           첫 번째 댓글을 남겨보세요.
//         </div>
//       )}
//     </div>
//   );
// }

// 로딩상태 삭제 //
import { CommentsPage, PostData } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import kyInstance from "@/lib/ky";

interface CommentsProps {
  post: PostData;
}

export default function Comments({ post }: CommentsProps) {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
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
    refetchOnWindowFocus: false,
    staleTime: 5000,
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
          className="w-full text-sm text-muted-foreground hover:text-foreground"
        >
          이전 댓글 더보기
        </button>
      )}

      {status === "error" && (
        <div className="text-center text-destructive">
          댓글을 불러오지 못했습니다.
        </div>
      )}

      {status === "success" && !comments.length && (
        <div className="text-center text-sm text-muted-foreground">
          첫 번째 댓글을 남겨보세요.
        </div>
      )}
    </div>
  );
}
