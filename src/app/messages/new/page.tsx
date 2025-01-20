import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import NewChatUserList from "@/components/chat/NewChatUserList";

export default async function NewChatPage() {
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
    },
  });

  return (
    <div className="container max-w-4xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">새로운 대화 시작</h1>
      <NewChatUserList users={users} />
    </div>
  );
}
