// 임시 메시지 제거 후 Pusher 메시지만 사용

"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Send, Camera, MoreVertical, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { User } from "lucia";
import { formatRelativeDate } from "@/lib/utils";
import {
  ChatMessageType,
  ChatRoomData,
  RedisChatMessage,
} from "@/lib/chattypes";
import pusherClient from "@/lib/pusher-client";
import type { Channel } from "pusher-js";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { LeaveRoomAlert } from "@/components/chat/LeaveRoomAlert";
import { leaveChatRoom } from "@/lib/api/chat";
import {
  sendMessage,
  blockUser,
  unblockUser,
  getMessages,
} from "@/lib/api/chat";

interface ChatRoomProps {
  roomId: string;
  currentUser: User;
  initialRoom: ChatRoomData;
}

const ChatHeader: React.FC<{
  roomId: string;
  otherParticipant: ChatParticipant["user"] | undefined;
  isBlocked: boolean;
  onBlock: () => void;
  onUnblock: () => void;
}> = ({ roomId, otherParticipant, isBlocked, onBlock, onUnblock }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showLeaveAlert, setShowLeaveAlert] = useState(false);

  const handleBack = () => {
    queryClient.prefetchQuery({
      queryKey: ["chatRooms"],
      queryFn: () => fetch("/api/chat/rooms").then((res) => res.json()),
    });
    router.push("/messages");
  };

  const handleLeave = async () => {
    try {
      await leaveChatRoom(roomId);
      router.push("/messages");
    } catch (error) {
      console.error("Failed to leave chat room:", error);
    }
  };

  return (
    <div className="p-4 border-b flex justify-between items-center">
      <div className="flex items-center gap-3">
        <button
          onClick={handleBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="뒤로 가기"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
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
            <button
              onClick={() => setShowLeaveAlert(true)}
              className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100 border-t"
            >
              나가기
            </button>
          </div>
        )}
      </div>
      <LeaveRoomAlert
        isOpen={showLeaveAlert}
        onClose={() => setShowLeaveAlert(false)}
        onConfirm={handleLeave}
      />
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

  // 안전한 날짜 포맷팅 함수
  const formatMessageDate = (timestamp: number) => {
    try {
      const date = new Date(timestamp);
      // timestamp가 유효한지 확인
      if (isNaN(date.getTime())) {
        return null;
      }

      return date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        weekday: "short",
      });
    } catch (error) {
      console.error("날짜 포맷팅 오류:", error);
      return null;
    }
  };

  // 이전 메시지의 날짜를 추적
  let currentDate = "";

  // formatTime 함수 추가
  const formatTime = (timestamp: number) => {
    try {
      const date = new Date(timestamp);
      return date
        .toLocaleTimeString("ko-KR", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
        .replace(/^0/, "")
        .replace(" ", "");
    } catch (error) {
      return "";
    }
  };

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => {
        // 안전하게 날짜 처리
        const messageDate = formatMessageDate(message.createdAt);

        // 날짜가 유효하고 이전 날짜와 다를 때만 구분선 표시
        const showDateDivider = messageDate && messageDate !== currentDate;
        if (showDateDivider) {
          currentDate = messageDate;
        }

        // 여기서 메시지 소유자 판단
        const isMyMessage = message.userId === currentUser.id;

        return (
          <React.Fragment key={message.id}>
            {showDateDivider && messageDate && (
              <div className="flex justify-center my-4">
                <div className="bg-[#2F2F2F] text-gray-300 px-4 py-1 rounded-full text-sm">
                  {messageDate}
                </div>
              </div>
            )}

            <div
              className={`flex ${isMyMessage ? "justify-end" : "justify-start"} mb-2`}
            >
              {!isMyMessage && (
                <div className="flex flex-col">
                  <div className="flex items-start gap-2 mb-1">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                      {otherParticipant?.avatarUrl ? (
                        <Image
                          src={otherParticipant.avatarUrl}
                          alt=""
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-sm">
                          {otherParticipant?.displayName?.[0]}
                        </div>
                      )}
                    </div>
                    <span className="text-[15px] text-gray-900 mt-1">
                      {otherParticipant?.displayName}
                    </span>
                  </div>

                  <div className="flex items-end gap-1 ml-12">
                    <div className="px-3 py-2 rounded-lg bg-[#333333] text-white max-w-[260px]">
                      <span className="text-[15px] break-words leading-[22px]">
                        {message.content}
                      </span>
                    </div>
                    <span className="text-[13px] text-gray-500 min-w-[45px]">
                      {formatTime(message.createdAt)}
                    </span>
                  </div>
                </div>
              )}

              {isMyMessage && (
                <div className="flex items-end gap-1">
                  <span className="text-[13px] text-gray-500 min-w-[45px] text-right">
                    {formatTime(message.createdAt)}
                  </span>
                  <div className="px-3 py-2 rounded-lg bg-yellow-400 text-black max-w-[260px]">
                    <span className="text-[15px] break-words leading-[22px]">
                      {message.content}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </React.Fragment>
        );
      })}
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
    if (!isMobile && e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      console.log("[ChatRoom] Enter 키 이벤트 발생");
      e.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log("[ChatRoom] 폼 제출 이벤트 발생");
        onSendMessage(e);
      }}
      className="p-4 border-t"
    >
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
          {/* <Camera className="w-6 h-6" /> */}
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
  const isSending = useRef(false);
  const router = useRouter();

  useEffect(() => {
    const loadMessages = async () => {
      try {
        console.log("[ChatRoom] 초기 메시지 로드 시작");
        const data = await getMessages(roomId, 20);
        setMessages(data.messages);
        console.log("[ChatRoom] 초기 메시지 로드 완료");
      } catch (error) {
        console.error("Failed to load messages:", error);
        setError("Failed to load messages. Please try again.");
      }
    };

    loadMessages();

    const channelName = `chat_room_${roomId}`;
    console.log("[ChatRoom] Pusher 채널 구독:", channelName);
    const channel = pusherClient.subscribe(channelName);

    channel.bind("new-message", (newMessage: RedisChatMessage) => {
      console.log("[ChatRoom] Pusher 새 메시지 수신:", {
        messageId: newMessage.id,
      });
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      console.log("[ChatRoom] Pusher 구독 해제:", channelName);
      channel.unbind("new-message");
      pusherClient.unsubscribe(channelName);
    };
  }, [roomId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending.current) return;
    if (!message.trim() || isBlocked) return;

    try {
      isSending.current = true;
      console.log("[ChatRoom] handleSendMessage 실행");

      await sendMessage(roomId, {
        content: message.trim(),
        type: ChatMessageType.TEXT,
        chatRoomId: roomId,
      });

      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
      setError("Failed to send message. Please try again.");
    } finally {
      isSending.current = false;
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
    const otherParticipant = initialRoom.participants.find(
      (p) => p.user.id !== currentUser.id,
    )?.user;
    if (!otherParticipant) return;

    try {
      await blockUser(otherParticipant.id);
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
      await unblockUser(otherParticipant.id);
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
        roomId={roomId}
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
