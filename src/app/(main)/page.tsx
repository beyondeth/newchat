// import PostEditor from "@/components/posts/editor/PostEditor";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import FollowingFeed from "./FollowingFeed";
// import ForYouFeed from "./ForYouFeed";
// // import TrendsSidebar from "@/components/TrendsSidebar";

// export default function Home() {
//   return (
//     <main className="flex w-full min-w-0 gap-5">
//       <div className="w-full min-w-0 space-y-5 max-h-[40rem] max-w-[32rem]">
//         <PostEditor />
//         <Tabs defaultValue="for-you">
//           <TabsList>
//             <TabsTrigger value="for-you">추천</TabsTrigger>
//             <TabsTrigger value="following">팔로잉</TabsTrigger>
//           </TabsList>
//           <TabsContent value="for-you">
//             <ForYouFeed />
//           </TabsContent>
//           <TabsContent value="following">
//             <FollowingFeed />
//           </TabsContent>
//         </Tabs>
//       </div>
//       {/* <TrendsSidebar /> */}
//     </main>
//   );
// }

// export default async function Home() {
//   const posts = await prisma.post.findMany({
//     include: postDataInclude,
//     orderBy: { createdAt: "desc" },
//   });

//   return (
//     <main className="flex w-full min-w-0 gap-5">
//       <div className="w-full min-w-0 space-y-5">
//         <PostEditor />
//         {posts.map((post) => (
//           <Post key={post.id} post={post} />
//         ))}
//       </div>
//       <TrendsSidebar />
//     </main>
//   );
// }

// import PostEditor from "@/components/posts/editor/PostEditor";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import FollowingFeed from "./FollowingFeed";
// import ForYouFeed from "./ForYouFeed";

// export default function Home() {
//   return (
//     <main className="flex justify-center w-full min-w-0">
//       <div className="w-full min-w-0 space-y-3 max-w-3xl">
//         <div className="max-w-[32rem] mx-auto">
//           <PostEditor />
//         </div>
//         <Tabs defaultValue="for-you" className="max-w-[32rem] mx-auto">
//           <TabsList>
//             <TabsTrigger value="for-you">추천</TabsTrigger>
//             <TabsTrigger value="following">팔로잉</TabsTrigger>
//           </TabsList>
//           <TabsContent value="for-you" className="mt-3">
//             <ForYouFeed />
//           </TabsContent>
//           <TabsContent value="following" className="mt-3">ㄴ
//             <FollowingFeed />
//           </TabsContent>
//         </Tabs>
//       </div>
//     </main>
//   );
// }

import { Suspense } from "react";
import PostEditor from "@/components/posts/editor/PostEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FollowingFeed from "./FollowingFeed";
import ForYouFeed from "./ForYouFeed";
import { Skeleton } from "@/components/ui/skeleton";

// 포스트 스켈레톤 UI
function PostSkeleton() {
  return (
    <div className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex justify-between gap-3">
        <div className="flex gap-3">
          <Skeleton className="h-10 w-10 rounded-full" /> {/* 프로필 이미지 */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" /> {/* 사용자 이름 */}
            <Skeleton className="h-3 w-16" /> {/* 날짜 */}
          </div>
        </div>
      </div>
      <Skeleton className="h-20 w-full" /> {/* 본문 내용 */}
      <Skeleton className="h-48 w-full rounded-2xl" /> {/* 미디어 영역 */}
      <hr className="text-muted-foreground" />
      <div className="flex justify-between">
        <div className="flex gap-5">
          <Skeleton className="h-6 w-16" /> {/* 좋아요 버튼 */}
          <Skeleton className="h-6 w-16" /> {/* 댓글 버튼 */}
          <Skeleton className="h-6 w-16" /> {/* 조회수 */}
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-6 w-8" /> {/* 공유 버튼 */}
          <Skeleton className="h-6 w-8" /> {/* 북마크 버튼 */}
        </div>
      </div>
    </div>
  );
}

// 피드 스켈레톤 UI
function FeedSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <PostSkeleton key={i} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex justify-center w-full min-w-0">
      <div className="w-full min-w-0 space-y-3 max-w-3xl">
        <div className="max-w-[32rem] mx-auto">
          <PostEditor />
        </div>
        <Tabs defaultValue="for-you" className="max-w-[32rem] mx-auto">
          <TabsList>
            <TabsTrigger value="for-you">추천</TabsTrigger>
            <TabsTrigger value="following">팔로잉</TabsTrigger>
          </TabsList>
          <TabsContent value="for-you" className="mt-3">
            <Suspense fallback={<FeedSkeleton />}>
              <ForYouFeed />
            </Suspense>
          </TabsContent>
          <TabsContent value="following" className="mt-3">
            <Suspense fallback={<FeedSkeleton />}>
              <FollowingFeed />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
