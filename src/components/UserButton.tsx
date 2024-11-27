// "use client";

// import { logout } from "@/app/(auth)/actions";
// import { useSession } from "@/app/(main)/SessionProvider";
// import { cn } from "@/lib/utils";
// import { Check, LogOutIcon, Monitor, Moon, Sun, UserIcon } from "lucide-react";
// import { useTheme } from "next-themes";
// import Link from "next/link";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuPortal,
//   DropdownMenuSeparator,
//   DropdownMenuSub,
//   DropdownMenuSubContent,
//   DropdownMenuSubTrigger,
//   DropdownMenuTrigger,
// } from "./ui/dropdown-menu";
// import UserAvatar from "./UserAvatar";
// import { useQueryClient } from "@tanstack/react-query";

// interface UserButtonProps {
//   className?: string;
// }

// export default function UserButton({ className }: UserButtonProps) {
//   const { user } = useSession();

//   const { theme, setTheme } = useTheme();

//   const queryClient = useQueryClient();

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <button className={cn("flex-none rounded-full", className)}>
//           <UserAvatar avatarUrl={user?.avatarUrl} size={40} />
//         </button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent>
//         <DropdownMenuLabel>로그인 중 @{user?.username}</DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         <Link href={`/users/${user?.username}`}>
//           <DropdownMenuItem>
//             <UserIcon className="mr-2 size-4" />
//             프로필
//           </DropdownMenuItem>
//         </Link>
//         <DropdownMenuSub>
//           <DropdownMenuSubTrigger>
//             <Monitor className="mr-2 size-4" />
//             배경테마
//           </DropdownMenuSubTrigger>
//           <DropdownMenuPortal>
//             <DropdownMenuSubContent>
//               <DropdownMenuItem onClick={() => setTheme("system")}>
//                 <Monitor className="mr-2 size-4" />
//                 기본
//                 {theme === "system" && <Check className="ms-2 size-4" />}
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={() => setTheme("light")}>
//                 <Sun className="mr-2 size-4" />낮
//                 {theme === "light" && <Check className="ms-2 size-4" />}
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={() => setTheme("dark")}>
//                 <Moon className="mr-2 size-4" />밤
//                 {theme === "dark" && <Check className="ms-2 size-4" />}
//               </DropdownMenuItem>
//             </DropdownMenuSubContent>
//           </DropdownMenuPortal>
//         </DropdownMenuSub>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem
//           onClick={() => {
//             queryClient.clear();
//             logout();
//           }}
//         >
//           <LogOutIcon className="mr-2 size-4" />
//           로그아웃
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

"use client";

import { logout } from "@/app/(auth)/actions";
import { useSession } from "@/app/(main)/SessionProvider";
import { cn } from "@/lib/utils";
import { Check, LogOutIcon, Monitor, Moon, Sun, UserIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";

interface UserButtonProps {
  className?: string;
}

export default function UserButton({ className }: UserButtonProps) {
  const { user } = useSession();
  const { theme, setTheme } = useTheme();
  const queryClient = useQueryClient();

  if (!user) {
    return (
      <div className="flex gap-1">
        <Link href="/login">
          <Button variant="ghost">로그인</Button>
        </Link>
        <Link href="/signup">
          <Button variant="ghost">회원가입</Button>
        </Link>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("flex-none rounded-full", className)}>
          <UserAvatar avatarUrl={user.avatarUrl} size={40} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>로그인 중 @{user.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={`/users/${user.username}`}>
          <DropdownMenuItem>
            <UserIcon className="mr-2 size-4" />
            프로필
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Monitor className="mr-2 size-4" />
            배경테마
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Monitor className="mr-2 size-4" />
                기본
                {theme === "system" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 size-4" />낮
                {theme === "light" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 size-4" />밤
                {theme === "dark" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            queryClient.clear();
            logout();
          }}
        >
          <LogOutIcon className="mr-2 size-4" />
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
