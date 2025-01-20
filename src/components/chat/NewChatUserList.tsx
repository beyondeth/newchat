"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

interface User {
  id: string;
  displayName: string;
  avatarUrl?: string | null;
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
          <div className="relative w-10 h-10 rounded-full mr-3 overflow-hidden">
            {user.avatarUrl ? (
              <Image
                src={user.avatarUrl}
                alt={user.displayName}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                {user.displayName[0]}
              </div>
            )}
          </div>
          <div className="text-left">
            <p className="font-medium">{user.displayName}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
