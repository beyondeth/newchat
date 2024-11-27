// "use client";

// import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
// import Post from "@/components/posts/Post";
// import PostsLoadingSkeleton from "@/components/posts/PostsLoadingSkeleton";
// import kyInstance from "@/lib/ky";
// import { PostsPage } from "@/lib/types";
// import { useInfiniteQuery } from "@tanstack/react-query";
// import { Loader2 } from "lucide-react";

// export default function ForYouFeed() {
//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetching,
//     isFetchingNextPage,
//     status,
//   } = useInfiniteQuery({
//     queryKey: ["post-feed", "for-you"],
//     queryFn: ({ pageParam }) =>
//       kyInstance
//         .get(
//           "/api/posts/for-you",
//           pageParam ? { searchParams: { cursor: pageParam } } : {},
//         )
//         .json<PostsPage>(),
//     initialPageParam: null as string | null,
//     getNextPageParam: (lastPage) => lastPage.nextCursor,
//   });

//   const posts = data?.pages.flatMap((page) => page.posts) || [];

//   if (status === "pending") {
//     return <PostsLoadingSkeleton />;
//   }

//   if (status === "success" && !posts.length && !hasNextPage) {
//     return (
//       <p className="text-center text-muted-foreground">
//         아직 게시글이 없습니다.
//       </p>
//     );
//   }

//   if (status === "error") {
//     return (
//       <p className="text-center text-destructive">
//         게시글을 불러오는 중 에러가 발생했습니다.
//       </p>
//     );
//   }

//   return (
//     <InfiniteScrollContainer
//       className="space-y-5"
//       onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
//     >
//       {posts.map((post) => (
//         <Post key={post.id} post={post} />
//       ))}
//       {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
//     </InfiniteScrollContainer>
//   );
// }

"use client";

import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import Post from "@/components/posts/Post";
import PostsLoadingSkeleton from "@/components/posts/PostsLoadingSkeleton";
import kyInstance from "@/lib/ky";
import { PostsPage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSession } from "@/app/(main)/SessionProvider";

export default function ForYouFeed() {
  const { user } = useSession();

  // 로그인하지 않은 사용자를 위한 기본 피드 API 엔드포인트
  const endpoint = user ? "/api/posts/for-you" : "/api/posts";

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["post-feed", endpoint],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(endpoint, pageParam ? { searchParams: { cursor: pageParam } } : {})
        .json<PostsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (status === "pending") {
    return <PostsLoadingSkeleton />;
  }

  if (status === "success" && !posts.length && !hasNextPage) {
    return (
      <div className="text-center">
        <p className="text-muted-foreground">
          {user
            ? "아직 게시글이 없습니다."
            : "더 많은 게시글을 보려면 로그인하세요."}
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <p className="text-center text-destructive">
        게시글을 불러오는 중 에러가 발생했습니다.
      </p>
    );
  }

  return (
    <InfiniteScrollContainer
      className="space-y-5"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
      {!user && posts.length > 0 && (
        <div className="my-8 text-center">
          <p className="mb-2 text-muted-foreground">
            더 많은 게시글을 보고 싶으신가요?
          </p>
          <a
            href="/login"
            className="inline-block rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            로그인하기
          </a>
        </div>
      )}
    </InfiniteScrollContainer>
  );
}
