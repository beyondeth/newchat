// "use client";

// import { useSession } from "@/app/(main)/SessionProvider";
// import { FollowerInfo, UserData } from "@/lib/types";
// import Link from "next/link";
// import { PropsWithChildren } from "react";
// import FollowButton from "./FollowButton";
// import FollowerCount from "./FollowerCount";
// import Linkify from "./Linkify";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "./ui/tooltip";
// import UserAvatar from "./UserAvatar";

// interface UserTooltipProps extends PropsWithChildren {
//   user: UserData;
// }

// export default function UserTooltip({ children, user }: UserTooltipProps) {
//   const { user: loggedInUser } = useSession();

//   const followerState: FollowerInfo = {
//     followers: user._count.followers,
//     isFollowedByUser: !!user.followers.some(
//       ({ followerId }) => followerId === loggedInUser?.id,
//     ),
//   };

//   return (
//     <TooltipProvider>
//       <Tooltip>
//         <TooltipTrigger asChild>{children}</TooltipTrigger>
//         <TooltipContent>
//           <div className="flex max-w-80 flex-col gap-3 break-words px-1 py-2.5 md:min-w-52">
//             <div className="flex items-center justify-between gap-2">
//               <Link href={`/users/${user.username}`}>
//                 <UserAvatar size={70} avatarUrl={user.avatarUrl} />
//               </Link>
//               {loggedInUser?.id !== user.id && (
//                 <FollowButton userId={user.id} initialState={followerState} />
//               )}
//             </div>
//             <div>
//               <Link href={loggedInUser ? `/users/${user.username}` : "/login"}>
//                 <div className="text-lg font-semibold hover:underline">
//                   {user.displayName}
//                 </div>
//                 <div className="text-muted-foreground">@{user.username}</div>
//               </Link>
//             </div>
//             {user.bio && (
//               <Linkify>
//                 <div className="line-clamp-4 whitespace-pre-line">
//                   {user.bio}
//                 </div>
//               </Linkify>
//             )}
//             {/* 만약 유저툴팁에 포스트 갯수를 넣고 싶으면 아래 추가
//             <span>
//               Posts:{" "}
//               <span className="font-semibold">
//                 {formatNumber(user._count.posts)}
//               </span>
//             </span> */}
//             <FollowerCount userId={user.id} initialState={followerState} />
//           </div>
//         </TooltipContent>
//       </Tooltip>
//     </TooltipProvider>
//   );
// }

// "use client";

// import { useSession } from "@/app/(main)/SessionProvider";
// import { FollowerInfo, UserData } from "@/lib/types";
// import Link from "next/link";
// import { PropsWithChildren } from "react";
// import FollowButton from "./FollowButton";
// import FollowerCount from "./FollowerCount";
// import Linkify from "./Linkify";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "./ui/tooltip";
// import UserAvatar from "./UserAvatar";

// interface UserTooltipProps extends PropsWithChildren {
//   user: UserData;
// }

// export default function UserTooltip({ children, user }: UserTooltipProps) {
//   const { user: loggedInUser } = useSession();

//   const followerState: FollowerInfo = {
//     followers: user._count.followers,
//     isFollowedByUser: !!user.followers.some(
//       ({ followerId }) => followerId === loggedInUser?.id,
//     ),
//   };

//   return (
//     <TooltipProvider>
//       <Tooltip>
//         <TooltipTrigger asChild>{children}</TooltipTrigger>
//         <TooltipContent>
//           <div className="flex max-w-80 flex-col gap-3 break-words px-1 py-2.5 md:min-w-52">
//             <div className="flex items-center justify-between gap-2">
//               <Link href={loggedInUser ? `/users/${user.username}` : "/login"}>
//                 <UserAvatar size={70} avatarUrl={user.avatarUrl} />
//               </Link>
//               {loggedInUser && loggedInUser.id !== user.id && (
//                 <FollowButton userId={user.id} initialState={followerState} />
//               )}
//             </div>
//             <div>
//               <Link href={loggedInUser ? `/users/${user.username}` : "/login"}>
//                 <div className="text-lg font-semibold hover:underline">
//                   {user.displayName}
//                 </div>
//                 <div className="text-muted-foreground">@{user.username}</div>
//               </Link>
//             </div>
//             {user.bio && (
//               <Linkify>
//                 <div className="line-clamp-4 whitespace-pre-line">
//                   {user.bio}
//                 </div>
//               </Linkify>
//             )}
//             <div
//               className={!loggedInUser ? "opacity-50 cursor-not-allowed" : ""}
//             >
//               <FollowerCount userId={user.id} initialState={followerState} />
//             </div>
//           </div>
//         </TooltipContent>
//       </Tooltip>
//     </TooltipProvider>
//   );
// }

"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import { FollowerInfo, UserData } from "@/lib/types";
import Link from "next/link";
import { PropsWithChildren } from "react";
import FollowButton from "./FollowButton";
import FollowerCount from "./FollowerCount";
import Linkify from "./Linkify";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import UserAvatar from "./UserAvatar";

interface UserTooltipProps extends PropsWithChildren {
  user: UserData;
}

export default function UserTooltip({ children, user }: UserTooltipProps) {
  const { user: loggedInUser } = useSession();

  // 안전한 기본값 제공
  const followerState: FollowerInfo = {
    followers: user?._count?.followers ?? 0,
    isFollowedByUser: user?.followers
      ? !!user.followers.some(
          ({ followerId }) => followerId === loggedInUser?.id,
        )
      : false,
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <div className="flex max-w-80 flex-col gap-3 break-words px-1 py-2.5 md:min-w-52">
            <div className="flex items-center justify-between gap-2">
              <Link href={loggedInUser ? `/users/${user.username}` : "/login"}>
                <UserAvatar size={70} avatarUrl={user.avatarUrl} />
              </Link>
              {loggedInUser && loggedInUser.id !== user.id && (
                <FollowButton userId={user.id} initialState={followerState} />
              )}
            </div>
            <div>
              <Link href={loggedInUser ? `/users/${user.username}` : "/login"}>
                <div className="text-lg font-semibold hover:underline">
                  {user.displayName}
                </div>
                <div className="text-muted-foreground">@{user.username}</div>
              </Link>
            </div>
            {user.bio && (
              <Linkify>
                <div className="line-clamp-4 whitespace-pre-line">
                  {user.bio}
                </div>
              </Linkify>
            )}
            <div
              className={!loggedInUser ? "opacity-50 cursor-not-allowed" : ""}
            >
              <FollowerCount userId={user.id} initialState={followerState} />
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
