"use client";

import React, { useState } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { Search, X } from "lucide-react";
import { ChatRoomData } from "@/lib/chattypes";
import UserAvatar from "@/components/UserAvatar";
import { useRouter } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";
import Link from "next/link";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

interface ChatRoomListProps {
  rooms: ChatRoomData[];
  currentUserId: string;
}

export default function ChatRoomList({
  rooms,
  currentUserId,
}: ChatRoomListProps) {
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [roomToLeave, setRoomToLeave] = useState<string | null>(null);

  // 검색 기능
  React.useEffect(() => {
    const searchUsers = async () => {
      if (!debouncedSearch) {
        setSearchResults([]);
        return;
      }

      try {
        const response = await fetch(`/api/users/search?q=${debouncedSearch}`);
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data.users);
        }
      } catch (error) {
        console.error("Failed to search users:", error);
      }
    };

    searchUsers();
  }, [debouncedSearch]);

  // 새 채팅방 생성
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
        setIsSearching(false);
        setSearchQuery("");
      }
    } catch (error) {
      console.error("Failed to create chat room:", error);
    }
  };

  const getOtherParticipant = (room: ChatRoomData) => {
    return room.participants.find((p) => p.user.id !== currentUserId)?.user;
  };

  const getLastMessage = (room: ChatRoomData) => {
    return room.messages?.[0] || null;
  };

  const handleLeaveRoom = async (roomId: string) => {
    try {
      const response = await fetch(`/api/chat/rooms/${roomId}/leave`, {
        method: "POST",
      });

      if (response.ok) {
        // 로컬 상태 업데이트 (채팅방 목록에서 제거)
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to leave chat room:", error);
    } finally {
      setRoomToLeave(null);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">채팅</h2>
        <button
          onClick={() => setIsSearching(!isSearching)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      {isSearching && (
        <div className="p-4 border-b">
          <input
            type="text"
            placeholder="사용자 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
          {searchResults.length > 0 && (
            <div className="mt-2 border rounded-lg divide-y">
              {searchResults.map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleCreateChat(user.id)}
                  className="w-full p-3 flex items-center hover:bg-gray-50"
                >
                  <UserAvatar
                    avatarUrl={user.avatarUrl}
                    size={40}
                    className="rounded-full"
                  />
                  <div className="ml-3">
                    <p className="font-medium">{user.displayName}</p>
                    <p className="text-sm text-gray-500">@{user.username}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        {rooms.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            채팅방이 없습니다
          </div>
        ) : (
          rooms.map((room) => {
            const otherUser = getOtherParticipant(room);
            const lastMessage = getLastMessage(room);

            return (
              <div key={room.id} className="relative group">
                <Link
                  href={`/messages/${room.id}`}
                  className="block hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center p-4 border-b">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                      {otherUser?.avatarUrl ? (
                        <Image
                          src={otherUser.avatarUrl}
                          alt={otherUser.displayName}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                          {otherUser?.displayName[0]}
                        </div>
                      )}
                    </div>

                    <div className="ml-4 flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-sm font-medium truncate">
                          {otherUser?.displayName}
                        </h3>
                        {lastMessage && (
                          <span className="text-xs text-gray-500">
                            {formatDistanceToNow(
                              new Date(lastMessage.createdAt),
                              {
                                addSuffix: true,
                                locale: ko,
                              },
                            )}
                          </span>
                        )}
                      </div>
                      {lastMessage && (
                        <p className="text-sm text-gray-500 truncate">
                          {lastMessage.content}
                        </p>
                      )}
                    </div>

                    {room.isBlocked && (
                      <div className="ml-2 px-2 py-1 text-xs text-red-500 bg-red-50 rounded">
                        차단됨
                      </div>
                    )}
                  </div>
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setRoomToLeave(room.id);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1 text-sm text-red-500 hover:bg-red-50 rounded-md border border-red-200"
                >
                  나가기
                </button>
              </div>
            );
          })
        )}
      </div>

      <AlertDialog.Root
        open={!!roomToLeave}
        onOpenChange={() => setRoomToLeave(null)}
      >
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 bg-black/30" />
          <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-[90vw] max-w-md">
            <AlertDialog.Title className="text-lg font-bold">
              채팅방 나가기
            </AlertDialog.Title>
            <AlertDialog.Description className="mt-2 space-y-2 text-center text-gray-600">
              <p>모든 대화 내용이 삭제되며 복구할 수 없습니다.</p>
              <p>정말 나가시겠습니까?</p>
            </AlertDialog.Description>
            <div className="mt-6 flex justify-end gap-4">
              <AlertDialog.Cancel asChild>
                <button className="px-4 py-2 text-sm rounded-md border hover:bg-gray-50">
                  아니오
                </button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <button
                  onClick={() => roomToLeave && handleLeaveRoom(roomToLeave)}
                  className="px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                  예
                </button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  );
}
