"use client";

import { useRouter } from "next/navigation";
import UserAvatar from "@/components/UserAvatar";

interface User {
  id: string;
  displayName: string;
  avatarUrl: string | null;
  username: string;
}

interface NewChatUserListProps {
  users: User[];
}

export default function NewChatUserList({ users }: NewChatUserListProps) {
  const router = useRouter();

  const handleCreateChat = async (participantId: string) => {
    try {
      const response = await fetch("/api/chat/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ participantId }),
      });

      if (response.ok) {
        const { roomId } = await response.json();
        router.push(`/messages/${roomId}`);
      }
    } catch (error) {
      console.error("채팅방 생성 중 오류 발생:", error);
    }
  };

  return (
    <div className="grid gap-4">
      {users.map((user) => (
        <button
          key={user.id}
          onClick={() => handleCreateChat(user.id)}
          className="flex items-center p-4 border rounded-lg hover:bg-gray-50 w-full"
        >
          <div className="relative w-10 h-10 mr-3">
            <UserAvatar
              avatarUrl={user.avatarUrl}
              size={40}
              className="rounded-full"
            />
          </div>
          <div className="text-left">
            <p className="font-medium">{user.displayName}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
