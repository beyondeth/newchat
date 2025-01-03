// "use client";

// import { Button } from "@/components/ui/button";
// import kyInstance from "@/lib/ky";
// import { MessageCountInfo } from "@/lib/types";
// import { useQuery } from "@tanstack/react-query";
// import { Mail } from "lucide-react";
// import Link from "next/link";

// interface MessagesButtonProps {
//   initialState: MessageCountInfo;
// }

// export default function MessagesButton({ initialState }: MessagesButtonProps) {
//   const { data } = useQuery({
//     queryKey: ["unread-messages-count"],
//     queryFn: () =>
//       kyInstance.get("/api/messages/unread-count").json<MessageCountInfo>(),
//     initialData: initialState,
//     refetchInterval: 60 * 1000,
//   });

//   return (
//     <Button
//       variant="ghost"
//       className="flex items-center justify-start gap-3"
//       title="Messages"
//       asChild
//     >
//       <Link href="/messages">
//         <div className="relative">
//           <Mail />
//           {!!data.unreadCount && (
//             <span className="absolute -right-1 -top-1 rounded-full bg-primary px-1 text-xs font-medium tabular-nums text-primary-foreground">
//               {data.unreadCount}
//             </span>
//           )}
//         </div>
//         <span className="hidden lg:inline">Messages</span>
//       </Link>
//     </Button>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import kyInstance from "@/lib/ky";
import { MessageCountInfo } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

interface MessagesButtonProps {
  initialState: MessageCountInfo;
}

export default function MessagesButton({ initialState }: MessagesButtonProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data, error } = useQuery({
    queryKey: ["unread-messages-count"],
    queryFn: async () => {
      try {
        return await kyInstance
          .get("/api/messages/unread-count")
          .json<MessageCountInfo>();
      } catch (error) {
        console.error("메시지 수 조회 실패:", error);
        return initialState;
      }
    },
    initialData: initialState,
    refetchInterval: 60 * 1000,
    enabled: isMounted,
    staleTime: 30 * 1000, // 불필요한 리페치 방지
  });

  if (!isMounted) return null;

  const unreadCount = data?.unreadCount ?? 0;
  const buttonLabel = `메시지 ${unreadCount > 0 ? `(${unreadCount}개의 읽지 않은 메시지)` : ""}`;

  return (
    <Button
      variant="ghost"
      className="group flex items-center justify-start gap-3 hover:bg-transparent hover:opacity-100"
      title={buttonLabel}
      asChild
    >
      <Link href="/messages" aria-label={buttonLabel}>
        <div className="relative">
          <Mail
            className="dark:text-gray-300 transition-opacity group-hover:opacity-80"
            aria-hidden="true"
          />
          {unreadCount > 0 && (
            <span
              className="absolute -right-1 -top-1 rounded-full bg-primary px-1.5 py-0.5 min-w-[1.2rem] text-xs font-medium tabular-nums text-primary-foreground text-center"
              aria-hidden="true"
            >
              {unreadCount}
            </span>
          )}
        </div>
        <span className="hidden lg:inline">메시지</span>
      </Link>
    </Button>
  );
}
