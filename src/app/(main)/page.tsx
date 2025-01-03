// import PostEditor from "@/components/posts/editor/PostEditor";
// // import TrendsSidebar from "@/components/TrendsSidebar";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import FollowingFeed from "./FollowingFeed";
// import ForYouFeed from "./ForYouFeed";

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

// // export default async function Home() {
// //   const posts = await prisma.post.findMany({
// //     include: postDataInclude,
// //     orderBy: { createdAt: "desc" },
// //   });

// //   return (
// //     <main className="flex w-full min-w-0 gap-5">
// //       <div className="w-full min-w-0 space-y-5">
// //         <PostEditor />
// //         {posts.map((post) => (
// //           <Post key={post.id} post={post} />
// //         ))}
// //       </div>
// //       <TrendsSidebar />
// //     </main>
// //   );
// // }

import PostEditor from "@/components/posts/editor/PostEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FollowingFeed from "./FollowingFeed";
import ForYouFeed from "./ForYouFeed";

export default function Home() {
  return (
    <div className="flex justify-center w-full">
      {/* 왼쪽 여백 */}
      <div className="hidden lg:block w-[280px]"></div>

      {/* 메인 컨텐츠 */}
      <main className="flex min-w-0 gap-5">
        <div className="w-full min-w-0 space-y-5 max-w-[32rem]">
          <PostEditor />
          <Tabs defaultValue="for-you">
            <TabsList className="w-full">
              <TabsTrigger value="for-you" className="flex-1">
                추천
              </TabsTrigger>
              <TabsTrigger value="following" className="flex-1">
                팔로잉
              </TabsTrigger>
            </TabsList>
            <TabsContent value="for-you">
              <ForYouFeed />
            </TabsContent>
            <TabsContent value="following">
              <FollowingFeed />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* 오른쪽 여백 */}
      <div className="hidden lg:block w-[280px]"></div>
    </div>
  );
}
