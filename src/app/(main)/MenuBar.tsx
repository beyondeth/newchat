import { validateRequest } from "@/auth";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { BookmarkPlus, Home, Mail } from "lucide-react";
import Link from "next/link";
import NotificationsButton from "./NotificationsButton";

interface MenuBarProps {
  className?: string;
}

export default async function MenuBar({ className }: MenuBarProps) {
  const { user } = await validateRequest();

  // if (!user) return null;

  const unreadNotificationCount = user
    ? await prisma.notification.count({
        where: {
          recipientId: user?.id,
          read: false,
        },
      })
    : 0;

  return (
    <div className={className}>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Home"
        asChild
      >
        <Link href="/">
          <Home />
          <span className="hidden lg:inline">홈</span>
        </Link>
      </Button>
      {/* <NotificationsButton
        initialState={{ unreadCount: unreadNotificationCount }}
      /> */}
      <NotificationsButton
        initialState={{ unreadCount: unreadNotificationCount }}
        isLoggedIn={!!user}
      />
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Messages"
        asChild
      >
        {/* <Link href="/messages"> */}
        <Link href={user ? "/messages" : "/login"}>
          <Mail />
          <span className="hidden lg:inline">메시지</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Bookmarks"
        asChild
      >
        {/* <Link href="/bookmarks"> */}
        <Link href={user ? "/bookmarks" : "/login"}>
          <BookmarkPlus />
          <span className="hidden lg:inline">즐겨찾기</span>
        </Link>
      </Button>
    </div>
  );
}
