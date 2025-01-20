// components/NewChatUserItem.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface NewChatUserItemProps {
  user: {
    id: string;
    displayName: string;
  };
}

export default function NewChatUserItem({ user }: NewChatUserItemProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateChat = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/chat/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ participantId: user.id }),
      });

      if (response.ok) {
        const { roomId } = await response.json();
        router.push(`/messages/${roomId}`);
      } else {
        console.error("채팅방 생성 실패");
      }
    } catch (error) {
      console.error("네트워크 오류", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCreateChat}
      disabled={isLoading}
      className={`
        flex items-center p-4 border rounded-lg w-full
        ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"}
      `}
    >
      {user.displayName}
      {isLoading && (
        <span className="ml-2 text-sm text-gray-500">생성 중...</span>
      )}
    </button>
  );
}
