// app/messages/page.tsx
import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import ChatRoomList from "@/components/chat/ChatRoomList";
import { chatRoomSelect } from "@/lib/chattypes";
import Navbar from "@/app/(main)/Navbar";

export default async function MessagesPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  // 대화 가능한 사용자 목록 조회
  const users = await prisma.user.findMany({
    where: {
      NOT: {
        id: user.id,
      },
      // 차단된 사용자 제외
      AND: {
        NOT: {
          blockedByUsers: {
            some: {
              blockerId: user.id,
            },
          },
        },
      },
    },
    select: {
      id: true,
      displayName: true,
      avatarUrl: true,
      username: true,
    },
  });

  // 채팅방 목록 조회
  const rooms = await prisma.chatRoom.findMany({
    where: {
      participants: {
        some: {
          userId: user.id,
        },
      },
    },
    select: chatRoomSelect,
    orderBy: {
      lastMessageAt: "desc",
    },
  });

  return (
    <>
      <Navbar />
      <div className="container max-w-4xl mx-auto py-6">
        <ChatRoomList rooms={rooms} currentUserId={user.id} />
      </div>
    </>
  );
}
