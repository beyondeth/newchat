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

import PostEditor from "@/components/posts/editor/PostEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FollowingFeed from "./FollowingFeed";
import ForYouFeed from "./ForYouFeed";

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
            <ForYouFeed />
          </TabsContent>
          <TabsContent value="following" className="mt-3">
            <FollowingFeed />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
