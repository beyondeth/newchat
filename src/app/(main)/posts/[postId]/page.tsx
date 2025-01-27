// import { validateRequest } from "@/auth";
// import FollowButton from "@/components/FollowButton";
// import Linkify from "@/components/Linkify";
// import Post from "@/components/posts/Post";
// import UserAvatar from "@/components/UserAvatar";
// import UserTooltip from "@/components/UserTooltip";
// import prisma from "@/lib/prisma";
// import { getPostDataInclude, UserData } from "@/lib/types";
// import { Loader2 } from "lucide-react";
// import { Metadata } from "next";
// import Link from "next/link";
// import { notFound } from "next/navigation";
// import { cache, Suspense } from "react";

// interface PageProps {
//   params: { postId: string };
// }

// const getPost = cache(async (postId: string, loggedInUserId: string) => {
//   // 포스트 조회와 조회수 증가를 트랜잭션으로 처리
//   const post = await prisma.$transaction(async (tx) => {
//     // 먼저 포스트를 가져옴
//     const post = await tx.post.findUnique({
//       where: {
//         id: postId,
//       },
//       include: {
//         ...getPostDataInclude(loggedInUserId),
//         views: {
//           where: {
//             userId: loggedInUserId,
//           },
//         },
//       },
//     });

//     if (!post) notFound();

//     // 이 사용자가 아직 조회하지 않은 경우에만 조회수 증가
//     if (post.views.length === 0) {
//       // PostView 레코드 생성
//       await tx.postView.create({
//         data: {
//           postId: post.id,
//           userId: loggedInUserId,
//         },
//       });

//       // 전체 조회수 증가
//       await tx.post.update({
//         where: { id: post.id },
//         data: {
//           viewCount: {
//             increment: 1,
//           },
//         },
//       });
//     }

//     return post;
//   });

//   if (!post) notFound();

//   return post;
// });

// export async function generateMetadata({
//   params: { postId },
// }: PageProps): Promise<Metadata> {
//   const { user } = await validateRequest();

//   if (!user) return {};

//   const post = await getPost(postId, user.id);

//   return {
//     title: `${post.user.displayName}: ${post.content.slice(0, 50)}...`,
//   };
// }

// export default async function Page({ params: { postId } }: PageProps) {
//   const { user } = await validateRequest();

//   if (!user) {
//     return (
//       <p className="text-destructive">
//         이 페이지를 볼 수 있는 권한이 없습니다.
//       </p>
//     );
//   }

//   const post = await getPost(postId, user.id);

//   return (
//     <main className="flex w-full min-w-0 gap-5">
//       <div className="w-full min-w-0 space-y-5">
//         <Post post={post} />
//       </div>
//       <div className="sticky top-[5.25rem] hidden h-fit w-80 flex-none lg:block">
//         <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
//           <UserInfoSidebar user={post.user} />
//         </Suspense>
//       </div>
//     </main>
//   );
// }

// interface UserInfoSidebarProps {
//   user: UserData;
// }

// async function UserInfoSidebar({ user }: UserInfoSidebarProps) {
//   const { user: loggedInUser } = await validateRequest();

//   if (!loggedInUser) return null;

//   return (
//     <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
//       <div className="text-xl font-bold">About this user</div>
//       <UserTooltip user={user}>
//         <Link
//           href={`/users/${user.username}`}
//           className="flex items-center gap-3"
//         >
//           <UserAvatar avatarUrl={user.avatarUrl} className="flex-none" />
//           <div>
//             <p className="line-clamp-1 break-all font-semibold hover:underline">
//               {user.displayName}
//             </p>
//             <p className="line-clamp-1 break-all text-muted-foreground">
//               @{user.username}
//             </p>
//           </div>
//         </Link>
//       </UserTooltip>
//       <Linkify>
//         <div className="line-clamp-6 whitespace-pre-line break-words text-muted-foreground">
//           {user.bio}
//         </div>
//       </Linkify>
//       {user.id !== loggedInUser.id && (
//         <FollowButton
//           userId={user.id}
//           initialState={{
//             followers: user._count.followers,
//             isFollowedByUser: user.followers.some(
//               ({ followerId }) => followerId === loggedInUser.id,
//             ),
//           }}
//         />
//       )}
//     </div>
//   );
// }

// app/posts/[postId]/page.tsx
import { validateRequest } from "@/auth";
import FollowButton from "@/components/FollowButton";
import Linkify from "@/components/Linkify";
import Post from "@/components/posts/Post";
import UserAvatar from "@/components/UserAvatar";
import UserTooltip from "@/components/UserTooltip";
import prisma from "@/lib/prisma";
import { getPostDataInclude, UserData } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache, Suspense } from "react";

interface PageProps {
  params: { postId: string };
}

const getPost = cache(async (postId: string, loggedInUserId: string) => {
  // 포스트 조회와 조회수 증가를 트랜잭션으로 처리
  const post = await prisma.$transaction(async (tx) => {
    // 먼저 포스트를 가져옴
    const post = await tx.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        ...getPostDataInclude(loggedInUserId),
        views: {
          where: {
            userId: loggedInUserId,
          },
        },
      },
    });

    if (!post) notFound();

    // ⭐️ 여기서부터 새로 추가된 부분 ⭐️
    const transformedPost = {
      ...post,
      bookInfo: post.bookInfo
        ? {
            ...post.bookInfo,
            link: post.bookInfo.link ?? null,
          }
        : null,
    };
    // ⭐️ 여기까지 새로 추가된 부분 ⭐️

    // 이 사용자가 아직 조회하지 않은 경우에만 조회수 증가
    if (post.views.length === 0) {
      // PostView 레코드 생성
      await tx.postView.create({
        data: {
          postId: post.id,
          userId: loggedInUserId,
        },
      });

      // 전체 조회수 증가
      await tx.post.update({
        where: { id: post.id },
        data: {
          viewCount: {
            increment: 1,
          },
        },
      });
    }

    // ⭐️ return post를 아래와 같이 변경 ⭐️
    return transformedPost;
  });

  if (!post) notFound();

  return post;
});

export async function generateMetadata({
  params: { postId },
}: PageProps): Promise<Metadata> {
  const { user } = await validateRequest();

  if (!user) return {};

  const post = await getPost(postId, user.id);

  return {
    title: `${post.user.displayName}: ${post.content.slice(0, 50)}...`,
  };
}

export default async function Page({ params: { postId } }: PageProps) {
  const { user } = await validateRequest();

  if (!user) {
    return (
      <p className="text-destructive">
        이 페이지를 볼 수 있는 권한이 없습니다.
      </p>
    );
  }

  const post = await getPost(postId, user.id);

  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <Post post={post} />
      </div>
      <div className="sticky top-[5.25rem] hidden h-fit w-80 flex-none lg:block">
        <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
          <UserInfoSidebar user={post.user} />
        </Suspense>
      </div>
    </main>
  );
}

interface UserInfoSidebarProps {
  user: UserData;
}

async function UserInfoSidebar({ user }: UserInfoSidebarProps) {
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) return null;

  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-xl font-bold">About this user</div>
      <UserTooltip user={user}>
        <Link
          href={`/users/${user.username}`}
          className="flex items-center gap-3"
        >
          <UserAvatar avatarUrl={user.avatarUrl} className="flex-none" />
          <div>
            <p className="line-clamp-1 break-all font-semibold hover:underline">
              {user.displayName}
            </p>
            <p className="line-clamp-1 break-all text-muted-foreground">
              @{user.username}
            </p>
          </div>
        </Link>
      </UserTooltip>
      <Linkify>
        <div className="line-clamp-6 whitespace-pre-line break-words text-muted-foreground">
          {user.bio}
        </div>
      </Linkify>
      {user.id !== loggedInUser.id && (
        <FollowButton
          userId={user.id}
          initialState={{
            followers: user._count.followers,
            isFollowedByUser: user.followers.some(
              ({ followerId }) => followerId === loggedInUser.id,
            ),
          }}
        />
      )}
    </div>
  );
}
