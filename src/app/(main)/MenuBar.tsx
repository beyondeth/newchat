"use client";

import { validateRequest } from "@/auth";
import { BookmarkPlus, CirclePlus, Home, Search, User } from "lucide-react";
import Link from "next/link";
import UnifiedSearch from "@/components/UnifiedSearch";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface MenuBarProps {
  className?: string;
  unreadNotificationCount?: number;
}

export default function MenuBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();

  const handleWriteClick = () => {
    // 현재 경로가 홈이 아니면 홈으로만 이동
    if (window.location.pathname !== "/") {
      router.push("/");
    }
    // 홈에서는 아무 동작 하지 않음 - 사용자가 직접 입력 시작
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 sm:hidden z-50">
      <nav className="flex justify-around items-center h-16 px-4 max-w-screen-sm mx-auto">
        <Link href="/" className="flex flex-col items-center gap-1">
          <Home className="w-6 h-6" />
          <span className="text-xs">홈</span>
        </Link>

        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex flex-col items-center gap-1 "
        >
          <Search className="w-6 h-6" />
          <span className="text-xs">검색</span>
        </button>

        <button
          onClick={handleWriteClick}
          className="flex flex-col items-center gap-1"
        >
          <CirclePlus className="w-6 h-6" />
          <span className="text-xs">글쓰기</span>
        </button>

        <Link href="/bookmarks" className="flex flex-col items-center gap-1">
          <BookmarkPlus className="w-6 h-6" />
          <span className="text-xs">북마크</span>
        </Link>

        {/* <Link
          href={user ? `/users/${user.username}` : "/login"}
          className="flex flex-col items-center gap-1 text-gray-500"
        >
          <User className="w-6 h-6" />
          <span className="text-xs">내 정보</span>
        </Link> */}
      </nav>

      <UnifiedSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
