import { validateRequest } from "@/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { redisChat } from "@/lib/redis";
import pusher from "@/lib/pusher";

export async function POST(
  request: Request,
  { params }: { params: { roomId: string } },
) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const roomId = params.roomId;

    // 트랜잭션으로 처리
    await prisma.$transaction(async (tx) => {
      // 1. 먼저 참여자 수 확인
      const remainingParticipants = await tx.chatParticipant.count({
        where: { chatRoomId: roomId },
      });

      // 2. 현재 유저의 참여 정보 삭제
      await tx.chatParticipant.delete({
        where: {
          userId_chatRoomId: {
            userId: user.id,
            chatRoomId: roomId,
          },
        },
      });

      // 3. 마지막 참여자(나가려는 사람이 마지막)였을 때만 메시지와 채팅방 삭제
      if (remainingParticipants === 1) {
        await redisChat.deleteRoomMessages(roomId);
        await tx.chatRoom.delete({
          where: { id: roomId },
        });
      }
    });

    // Pusher에 나가기 이벤트 발행
    await pusher.trigger(`chat_room_${roomId}`, "user-left", {
      userId: user.id,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to leave chat room:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
