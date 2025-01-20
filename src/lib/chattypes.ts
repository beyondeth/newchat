// types/chat.ts
import { Prisma } from "@prisma/client";
import { User } from "lucia";

// Redis에 저장될 실시간 메시지 타입
export interface RedisChatMessage {
  id: string;
  content: string;
  type: ChatMessageType;
  userId: string;
  chatRoomId: string;
  createdAt: number;
  readBy: string[];
}

export enum ChatMessageType {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  FILE = "FILE",
  SYSTEM = "SYSTEM",
}

export enum ChatRoomType {
  DIRECT = "DIRECT",
  GROUP = "GROUP",
}

// Prisma select 타입
export const chatRoomSelect = {
  id: true,
  name: true,
  type: true,
  lastMessageAt: true,
  createdAt: true,
  isBlocked: true, // 차단 여부
  blockedAt: true, // 차단된 시간
  blockedById: true, // 차단한 사용자 ID
  blockReason: true, // 차단 사유
  participants: {
    include: {
      user: {
        select: {
          id: true,
          username: true,
          displayName: true,
          avatarUrl: true,
        },
      },
    },
  },
  messages: {
    take: 1,
    orderBy: {
      createdAt: "desc" as const,
    },
    select: {
      id: true,
      content: true,
      type: true,
      createdAt: true,
      readBy: true,
      user: {
        select: {
          id: true,
          username: true,
          displayName: true,
        },
      },
    },
  },
} satisfies Prisma.ChatRoomSelect;

export type ChatRoomData = Prisma.ChatRoomGetPayload<{
  select: typeof chatRoomSelect;
}>;

// Redis 키 패턴
export const REDIS_KEYS = {
  ROOM_MESSAGES: (roomId: string) => `chat:room:${roomId}:messages`,
  ROOM_USERS_ONLINE: (roomId: string) => `chat:room:${roomId}:online`,
  TYPING: (roomId: string) => `chat:room:${roomId}:typing`,
} as const;

// API 응답 타입
export interface ChatRoomsResponse {
  rooms: ChatRoomData[];
  nextCursor: string | null;
}

export interface ChatMessagesResponse {
  messages: RedisChatMessage[];
  nextCursor: string | null;
}

// 채팅방 참여자 정보
export interface ChatParticipant {
  id: string;
  user: Pick<User, "id" | "username" | "displayName" | "avatarUrl">;
  lastReadAt: Date;
}
