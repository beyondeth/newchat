// "use client";

// import { Button } from "@/components/ui/button";
// import kyInstance from "@/lib/ky";
// import { NotificationCountInfo } from "@/lib/types";
// import { useQuery } from "@tanstack/react-query";
// import { Bell } from "lucide-react";
// import Link from "next/link";

// interface NotificationsButtonProps {
//   initialState: NotificationCountInfo;
// }

// export default function NotificationsButton({
//   initialState,
// }: NotificationsButtonProps) {
//   const { data } = useQuery({
//     queryKey: ["unread-notification-count"],
//     queryFn: () =>
//       kyInstance
//         .get("/api/notifications/unread-count")
//         .json<NotificationCountInfo>(),
//     initialData: initialState,
//     refetchInterval: 60 * 1000,
//   });

//   return (
//     <Button
//       variant="ghost"
//       className="flex items-center justify-start gap-3"
//       title="Notifications"
//       asChild
//     >
//       <Link href="/notifications">
//         <div className="relative">
//           <Bell />
//           {!!data.unreadCount && (
//             <span className="absolute -right-1 -top-1 rounded-full bg-primary px-1 text-xs font-medium tabular-nums text-primary-foreground">
//               {data.unreadCount}
//             </span>
//           )}
//         </div>
//         <span className="hidden lg:inline">알림</span>
//       </Link>
//     </Button>
//   );
// }

// NotificationsButton.tsx
// "use client";

// import { Button } from "@/components/ui/button";
// import kyInstance from "@/lib/ky";
// import { NotificationCountInfo } from "@/lib/types";
// import { useQuery } from "@tanstack/react-query";
// import { Bell } from "lucide-react";
// import Link from "next/link";

// interface NotificationsButtonProps {
//   initialState: NotificationCountInfo;
//   isLoggedIn: boolean; // props 추가
// }

// export default function NotificationsButton({
//   initialState,
//   isLoggedIn,
// }: NotificationsButtonProps) {
//   const { data } = useQuery({
//     queryKey: ["unread-notification-count"],
//     queryFn: () =>
//       kyInstance
//         .get("/api/notifications/unread-count")
//         .json<NotificationCountInfo>(),
//     initialData: initialState,
//     refetchInterval: isLoggedIn ? 60 * 1000 : false, // 로그인한 경우에만 refetch
//     enabled: isLoggedIn, // 로그인한 경우에만 query 실행
//   });

//   return (
//     <Button
//       variant="ghost"
//       className="flex items-center justify-start gap-3 hover:bg-transparent hover:opacity-100"
//       title="Notifications"
//       asChild
//     >
//       <Link href={isLoggedIn ? "/notifications" : "/login"}>
//         <div className="relative">
//           <Bell className=" dark:text-gray-300 stroke-[2px] hover:opacity-100" />
//           {isLoggedIn && !!data.unreadCount && (
//             <span className="absolute -right-1 -top-1 rounded-full bg-primary px-1 text-xs font-medium tabular-nums text-primary-foreground">
//               {data.unreadCount}
//             </span>
//           )}
//         </div>
//         {/* <span className="hidden lg:inline">알림</span> */}
//       </Link>
//     </Button>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import kyInstance from "@/lib/ky";
import { NotificationCountInfo } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Bell } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

interface NotificationsButtonProps {
  initialState: NotificationCountInfo;
  isLoggedIn: boolean;
}

export default function NotificationsButton({
  initialState,
  isLoggedIn,
}: NotificationsButtonProps) {
  // Add client-side only state
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data } = useQuery({
    queryKey: ["unread-notification-count"],
    queryFn: async () => {
      try {
        return await kyInstance
          .get("/api/notifications/unread-count")
          .json<NotificationCountInfo>();
      } catch (error) {
        console.error("Failed to fetch notification count:", error);
        return initialState;
      }
    },
    initialData: initialState,
    refetchInterval: isLoggedIn ? 60 * 1000 : false,
    enabled: isLoggedIn,
    staleTime: 30 * 1000,
  });

  const linkHref = isLoggedIn ? "/notifications" : "/login";
  const buttonLabel = isLoggedIn
    ? "View notifications"
    : "Log in to view notifications";
  const unreadCount = data?.unreadCount ?? 0;

  return (
    <Button
      variant="ghost"
      className="group flex items-center justify-start gap-3 hover:bg-transparent hover:opacity-100"
      title={buttonLabel}
      asChild
    >
      <Link href={linkHref} aria-label={buttonLabel}>
        <div className="relative">
          <Bell
            className="dark:text-gray-300 stroke-[2px] transition-opacity group-hover:opacity-80"
            aria-hidden="true"
          />
          {/* Only show badge after client-side hydration */}
          {isMounted && isLoggedIn && unreadCount > 0 && (
            <span
              className="absolute -right-1 -top-1 rounded-full bg-primary px-1.5 py-0.5 min-w-[1.2rem] text-xs font-medium tabular-nums text-primary-foreground text-center"
              aria-label={`${unreadCount} unread notification${unreadCount === 1 ? "" : "s"}`}
            >
              {unreadCount}
            </span>
          )}
        </div>
      </Link>
    </Button>
  );
}
