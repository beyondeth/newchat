// import { validateRequest } from "@/auth";
// import FollowButton from "@/components/FollowButton";
// import FollowerCount from "@/components/FollowerCount";
// import Linkify from "@/components/Linkify";
// import TrendsSidebar from "@/components/TrendsSidebar";
// import UserAvatar from "@/components/UserAvatar";
// import prisma from "@/lib/prisma";
// import { FollowerInfo, getUserDataSelect, UserData } from "@/lib/types";
// import { formatNumber } from "@/lib/utils";
// import { formatDate } from "date-fns";
// import { Metadata } from "next";
// import { notFound } from "next/navigation";
// import { cache } from "react";
// import EditProfileButton from "./EditProfileButton";
// import UserPosts from "./UserPosts";

// interface PageProps {
//   params: { username: string };
// }

// const getUser = cache(async (username: string, loggedInUserId: string) => {
//   const user = await prisma.user.findFirst({
//     where: {
//       username: {
//         equals: username,
//         mode: "insensitive",
//       },
//     },
//     select: getUserDataSelect(loggedInUserId),
//   });

//   if (!user) notFound();

//   return user;
// });

// export async function generateMetadata({
//   params: { username },
// }: PageProps): Promise<Metadata> {
//   const { user: loggedInUser } = await validateRequest();

//   if (!loggedInUser) return {};

//   const user = await getUser(username, loggedInUser.id);

//   return {
//     title: `${user.displayName} (@${user.username})`,
//   };
// }

// export default async function Page({ params: { username } }: PageProps) {
//   const { user: loggedInUser } = await validateRequest();

//   if (!loggedInUser) {
//     return (
//       <p className="text-destructive">
//         You&apos;re not authorized to view this page.
//       </p>
//     );
//   }

//   const user = await getUser(username, loggedInUser.id);

//   return (
//     <main className="flex w-full min-w-0 gap-5">
//       <div className="w-full min-w-0 space-y-5">
//         <UserProfile user={user} loggedInUserId={loggedInUser.id} />
//         <div className="rounded-2xl bg-card p-5 shadow-sm">
//           <h2 className="text-center text-2xl font-bold">
//             {user.displayName}&apos;s posts
//           </h2>
//         </div>
//         <UserPosts userId={user.id} />
//       </div>
//       <TrendsSidebar />
//     </main>
//   );
// }

// interface UserProfileProps {
//   user: UserData;
//   loggedInUserId: string;
// }

// async function UserProfile({ user, loggedInUserId }: UserProfileProps) {
//   const followerInfo: FollowerInfo = {
//     followers: user._count.followers,
//     isFollowedByUser: user.followers.some(
//       ({ followerId }) => followerId === loggedInUserId,
//     ),
//   };

//   return (
//     <div className="h-fit w-full space-y-5 rounded-2xl bg-card p-5 shadow-sm">
//       <UserAvatar
//         avatarUrl={user.avatarUrl}
//         size={250}
//         className="mx-auto size-full max-h-60 max-w-60 rounded-full"
//       />
//       <div className="flex flex-wrap gap-3 sm:flex-nowrap">
//         <div className="me-auto space-y-3">
//           <div>
//             <h1 className="text-3xl font-bold">{user.displayName}</h1>
//             <div className="text-muted-foreground">@{user.username}</div>
//           </div>
//           <div>Member since {formatDate(user.createdAt, "MMM d, yyyy")}</div>
//           <div className="flex items-center gap-3">
//             <span>
//               Posts:{" "}
//               <span className="font-semibold">
//                 {formatNumber(user._count.posts)}
//               </span>
//             </span>
//             <FollowerCount userId={user.id} initialState={followerInfo} />
//           </div>
//         </div>
//         {user.id === loggedInUserId ? (
//           <EditProfileButton user={user} />
//         ) : (
//           <FollowButton userId={user.id} initialState={followerInfo} />
//         )}
//       </div>
//       {user.bio && (
//         <>
//           <hr />
//           <Linkify>
//             <div className="overflow-hidden whitespace-pre-line break-words">
//               {user.bio}
//             </div>
//           </Linkify>
//         </>
//       )}
//     </div>
//   );
// }

import { validateRequest } from "@/auth";
import FollowButton from "@/components/FollowButton";
import FollowerCount from "@/components/FollowerCount";
import Linkify from "@/components/Linkify";
import TrendsSidebar from "@/components/TrendsSidebar";
import UserAvatar from "@/components/UserAvatar";
import prisma from "@/lib/prisma";
import { FollowerInfo, getUserDataSelect, UserData } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { formatDate } from "date-fns";
import { ko } from "date-fns/locale";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import EditProfileButton from "./EditProfileButton";
import UserPosts from "./UserPosts";

interface PageProps {
  params: { username: string };
}

const getUser = cache(async (username: string, loggedInUserId: string) => {
  // URL 디코딩 추가
  const decodedUsername = decodeURIComponent(username);
  const user = await prisma.user.findFirst({
    where: {
      username: {
        equals: decodedUsername,
        mode: "insensitive",
      },
    },
    select: getUserDataSelect(loggedInUserId),
  });

  if (!user) notFound();

  return user;
});

export async function generateMetadata({
  params: { username },
}: PageProps): Promise<Metadata> {
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) return {};

  // URL 디코딩 추가
  const decodedUsername = decodeURIComponent(username);
  const user = await getUser(decodedUsername, loggedInUser.id);

  return {
    title: `${user.displayName} (@${user.username})`,
  };
}

export default async function Page({ params: { username } }: PageProps) {
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) {
    return (
      <p className="text-destructive">
        이 페이지를 볼 수 있는 권한이 없습니다.
      </p>
    );
  }

  const decodedUsername = decodeURIComponent(username);
  const user = await getUser(decodedUsername, loggedInUser.id);

  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <UserProfile user={user} loggedInUserId={loggedInUser.id} />
        <div className="rounded-2xl bg-card p-5 shadow-sm">
          <h2 className="text-center text-sm">
            『 {user.displayName} 』 님의 작성글
          </h2>
        </div>
        <UserPosts userId={user.id} />
      </div>
      <TrendsSidebar />
    </main>
  );
}

interface UserProfileProps {
  user: UserData;
  loggedInUserId: string;
}

async function UserProfile({ user, loggedInUserId }: UserProfileProps) {
  const followerInfo: FollowerInfo = {
    followers: user._count.followers,
    isFollowedByUser: user.followers.some(
      ({ followerId }) => followerId === loggedInUserId,
    ),
  };

  return (
    <div className="h-fit w-full space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <UserAvatar
        avatarUrl={user.avatarUrl}
        size={250}
        className="mx-auto size-full max-h-60 max-w-60 rounded-full"
      />
      <div className="flex flex-wrap gap-3 sm:flex-nowrap">
        <div className="me-auto space-y-3">
          <div>
            <h1 className="text-md font-bold">{user.displayName}</h1>
            <div className="text-sm text-muted-foreground">
              @{user.username}
            </div>
          </div>
          <div className=" text-sm">
            가입일:
            {formatDate(user.createdAt, "yyyy년 M월 d일", { locale: ko })}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm">
              게시물:
              <span className="">{formatNumber(user._count.posts)}</span>
            </span>
            <FollowerCount userId={user.id} initialState={followerInfo} />
          </div>
        </div>
        {user.id === loggedInUserId ? (
          <EditProfileButton user={user} />
        ) : (
          <FollowButton userId={user.id} initialState={followerInfo} />
        )}
      </div>
      {user.bio && (
        <>
          <hr />
          <Linkify>
            <div className="overflow-hidden whitespace-pre-line break-words text-sm">
              {user.bio}
            </div>
          </Linkify>
        </>
      )}
    </div>
  );
}
