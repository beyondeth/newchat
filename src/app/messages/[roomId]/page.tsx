// app/messages/[roomId]/page.tsx
import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import { chatRoomSelect } from "@/lib/chattypes";
import ChatRoom from "@/components/chat/ChatRoom";

export default async function ChatRoomPage({
  params,
}: {
  params: { roomId: string };
}) {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const room = await prisma.chatRoom.findUnique({
    where: {
      id: params.roomId,
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
    <div className="container max-w-4xl mx-auto h-[calc(100vh-4rem)] py-6">
      <ChatRoom roomId={room.id} currentUser={user} initialRoom={room} />
    </div>
  );
}
