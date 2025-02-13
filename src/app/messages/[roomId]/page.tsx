// app/messages/[roomId]/page.tsx
import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import { chatRoomSelect } from "@/lib/chattypes";
import ChatRoom from "@/components/chat/ChatRoom";
import Navbar from "@/app/(main)/Navbar";

export default async function ChatRoomPage({
  params: { roomId },
}: {
  params: { roomId: string };
}) {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const room = await prisma.chatRoom.findUnique({
    where: {
      id: roomId,
      participants: {
        some: {
          userId: user.id,
        },
      },
    },
    select: chatRoomSelect,
  });

  if (!room) redirect("/messages");

  return (
    <>
      <Navbar />
      <div className="container max-w-4xl mx-auto h-[calc(100vh-4rem)] py-6">
        <ChatRoom roomId={room.id} currentUser={user} initialRoom={room} />
      </div>
    </>
  );
}
