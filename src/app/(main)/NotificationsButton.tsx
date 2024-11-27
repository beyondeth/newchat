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
"use client";

import { Button } from "@/components/ui/button";
import kyInstance from "@/lib/ky";
import { NotificationCountInfo } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Bell } from "lucide-react";
import Link from "next/link";

interface NotificationsButtonProps {
  initialState: NotificationCountInfo;
  isLoggedIn: boolean; // props 추가
}

export default function NotificationsButton({
  initialState,
  isLoggedIn,
}: NotificationsButtonProps) {
  const { data } = useQuery({
    queryKey: ["unread-notification-count"],
    queryFn: () =>
      kyInstance
        .get("/api/notifications/unread-count")
        .json<NotificationCountInfo>(),
    initialData: initialState,
    refetchInterval: isLoggedIn ? 60 * 1000 : false, // 로그인한 경우에만 refetch
    enabled: isLoggedIn, // 로그인한 경우에만 query 실행
  });

  return (
    <Button
      variant="ghost"
      className="flex items-center justify-start gap-3"
      title="Notifications"
      asChild
    >
      <Link href={isLoggedIn ? "/notifications" : "/login"}>
        <div className="relative">
          <Bell />
          {isLoggedIn && !!data.unreadCount && (
            <span className="absolute -right-1 -top-1 rounded-full bg-primary px-1 text-xs font-medium tabular-nums text-primary-foreground">
              {data.unreadCount}
            </span>
          )}
        </div>
        <span className="hidden lg:inline">알림</span>
      </Link>
    </Button>
  );
}
