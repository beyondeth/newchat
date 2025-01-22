// 임시 메시지 제거 후 Pusher 메시지만 사용

"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Send, Camera, MoreVertical } from "lucide-react";
import Image from "next/image";
import { User } from "lucia";
import { formatRelativeDate } from "@/lib/utils";
import {
  ChatMessageType,
  ChatRoomData,
  RedisChatMessage,
} from "@/lib/chattypes";
import PusherClient from "pusher-js";
import type { Channel } from "pusher-js";

const pusherClient = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
});

interface ChatRoomProps {
  roomId: string;
  currentUser: User;
  initialRoom: ChatRoomData;
}

const ChatHeader: React.FC<{
  otherParticipant: ChatParticipant["user"] | undefined;
  isBlocked: boolean;
  onBlock: () => void;
  onUnblock: () => void;
}> = ({ otherParticipant, isBlocked, onBlock, onUnblock }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="p-4 border-b flex justify-between items-center">
      <div className="flex items-center">
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
          {otherParticipant?.avatarUrl ? (
            <Image
              src={otherParticipant.avatarUrl}
              alt={otherParticipant.displayName}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              {otherParticipant?.displayName[0]}
            </div>
          )}
        </div>
        <div className="ml-3">
          <h2 className="text-lg font-semibold">
            {otherParticipant?.displayName}
          </h2>
          {isBlocked && (
            <span className="text-sm text-red-500">차단된 사용자</span>
          )}
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 hover:bg-gray-100 rounded-full"
          aria-label="More actions"
          aria-expanded={isMenuOpen}
          aria-haspopup="true"
        >
          <MoreVertical className="w-5 h-5" />
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border">
            {isBlocked ? (
              <button
                onClick={onUnblock}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
              >
                차단 해제
              </button>
            ) : (
              <button
                onClick={onBlock}
                className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100"
              >
                사용자 차단
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export interface ChatParticipant {
  id: string;
  user: Pick<User, "id" | "username" | "displayName" | "avatarUrl">;
  lastReadAt: Date;
}

const ChatMessages: React.FC<{
  messages: RedisChatMessage[];
  currentUser: User;
  otherParticipant: ChatParticipant["user"] | undefined;
}> = ({ messages, currentUser, otherParticipant }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 초기 로딩시 스크롤을 맨 아래로 - 애니메이션 없이 즉시 이동
  useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]); // messages가 로드되면 즉시 실행

  // 새 메시지가 올 때만 스크롤
  useEffect(() => {
    const isNewMessage =
      messages[messages.length - 1]?.userId === currentUser.id;
    if (isNewMessage) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, currentUser.id]);

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto p-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex mb-4 ${
            msg.userId === currentUser.id ? "justify-end" : "justify-start"
          }`}
        >
          {msg.userId !== currentUser.id && (
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200 mr-2">
              {otherParticipant?.avatarUrl ? (
                <Image
                  src={otherParticipant.avatarUrl}
                  alt={otherParticipant.displayName}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm">
                  {otherParticipant?.displayName[0]}
                </div>
              )}
            </div>
          )}

          <div className="max-w-[70%]">
            {msg.type === ChatMessageType.IMAGE ? (
              <div className="rounded-lg overflow-hidden">
                <Image
                  src={msg.content}
                  alt="Uploaded image"
                  width={300}
                  height={200}
                  className="object-contain"
                />
              </div>
            ) : (
              <div
                className={`px-4 py-2 rounded-lg ${
                  msg.userId === currentUser.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                <div className="text-sm break-words">{msg.content}</div>
              </div>
            )}
            <div className="text-xs text-gray-500 mt-1">
              {msg.createdAt && formatRelativeDate(new Date(msg.createdAt))}
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

const ChatInput: React.FC<{
  onSendMessage: (e: React.FormEvent) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  message: string;
  setMessage: (message: string) => void;
  isBlocked: boolean;
}> = ({ onSendMessage, onImageUpload, message, setMessage, isBlocked }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 모바일 체크
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // 모바일 여부 확인
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // textarea 높이 자동 조절
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [message]);

  // 키 이벤트 핸들링
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // 모바일에서는 Enter 키 이벤트를 처리하지 않음
    if (!isMobile && e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSendMessage(e as any);
    }
  };

  return (
    <form onSubmit={onSendMessage} className="p-4 border-t">
      <div className="flex gap-2">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder={
            isBlocked
              ? "차단된 사용자와는 대화할 수 없습니다"
              : "메시지를 입력하세요..."
          }
          rows={1}
          style={{
            minHeight: "42px",
            maxHeight: "120px",
          }}
          disabled={isBlocked}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 text-gray-500 hover:text-gray-700"
          disabled={isBlocked}
        >
          <Camera className="w-6 h-6" />
        </button>
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300"
          disabled={isBlocked || !message.trim()}
        >
          <Send className="w-6 h-6" />
        </button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onImageUpload}
        disabled={isBlocked}
      />
    </form>
  );
};

export default function ChatRoom({
  roomId,
  currentUser,
  initialRoom,
}: ChatRoomProps) {
  const [messages, setMessages] = useState<RedisChatMessage[]>([]);
  const [message, setMessage] = useState("");
  const [isBlocked, setIsBlocked] = useState(initialRoom.isBlocked);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        // 최근 메시지 20개를 가져옵니다
        const response = await fetch(
          `/api/chat/rooms/${roomId}/messages?limit=20`,
        );
        if (!response.ok) {
          throw new Error("Failed to load messages");
        }
        const data = await response.json();
        // reverse() 제거 - 최근 메시지가 배열의 끝에 오도록
        setMessages(data.messages);
      } catch (error) {
        console.error("Failed to load messages:", error);
        setError("Failed to load messages. Please try again.");
      }
    };

    loadMessages();

    const channelName = `chat_room_${roomId}`;
    const channel = pusherClient.subscribe(channelName);

    channel.bind("new-message", (newMessage: RedisChatMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      channel.unbind("new-message");
      pusherClient.unsubscribe(channelName);
    };
  }, [roomId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isBlocked) return;

    try {
      const response = await fetch(`/api/chat/rooms/${roomId}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: message.trim(),
          type: ChatMessageType.TEXT,
          chatRoomId: roomId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
      setError("Failed to send message. Please try again.");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || isBlocked) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("chatRoomId", roomId);

    try {
      const response = await fetch("/api/chat/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      console.error("Failed to upload image:", error);
      setError("Failed to upload image. Please try again.");
    }
  };

  const handleBlock = async () => {
    const otherParticipant: ChatParticipant["user"] | undefined =
      initialRoom.participants.find((p) => p.user.id !== currentUser.id)?.user;
    if (!otherParticipant) return;

    try {
      const response = await fetch("/api/chat/block", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blockedId: otherParticipant.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to block user");
      }
      setIsBlocked(true);
    } catch (error) {
      console.error("Failed to block user:", error);
      setError("Failed to block user. Please try again.");
    }
  };

  const handleUnblock = async () => {
    const otherParticipant = initialRoom.participants.find(
      (p) => p.user.id !== currentUser.id,
    )?.user;
    if (!otherParticipant) return;

    try {
      const response = await fetch("/api/chat/unblock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blockedId: otherParticipant.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to unblock user");
      }
      setIsBlocked(false);
    } catch (error) {
      console.error("Failed to unblock user:", error);
      setError("Failed to unblock user. Please try again.");
    }
  };

  const otherParticipant = initialRoom.participants.find(
    (p) => p.user.id !== currentUser.id,
  )?.user;

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow">
      <ChatHeader
        otherParticipant={otherParticipant}
        isBlocked={isBlocked}
        onBlock={handleBlock}
        onUnblock={handleUnblock}
      />

      {isBlocked && (
        <div className="bg-red-50 p-4 text-red-700 text-center text-sm">
          차단된 사용자와는 더 이상 대화할 수 없습니다
        </div>
      )}

      {error && (
        <div className="bg-red-50 p-4 text-red-700 text-center text-sm">
          {error}
        </div>
      )}

      <ChatMessages
        messages={messages}
        currentUser={currentUser}
        otherParticipant={otherParticipant}
      />

      <ChatInput
        onSendMessage={handleSendMessage}
        onImageUpload={handleImageUpload}
        message={message}
        setMessage={setMessage}
        isBlocked={isBlocked}
      />
    </div>
  );
}
