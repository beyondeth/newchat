import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getUserDataSelect, ProcessedTopPost } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { unstable_cache } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";
import FollowButton from "./FollowButton";
import UserAvatar from "./UserAvatar";
import UserTooltip from "./UserTooltip";
import { getWeeklyTopPosts } from "@/app/util/topPostUtil";

export default function TrendsSidebar() {
  return (
    <div className="sticky top-[5.25rem] hidden h-fit w-72 flex-none space-y-5 md:block lg:w-80">
      <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
        <TrendingTopics />
        <WhoToFollow />
      </Suspense>
    </div>
  );
}

async function WhoToFollow() {
  const { user } = await validateRequest();

  if (!user) return null;

  const usersToFollow = await prisma.user.findMany({
    where: {
      NOT: {
        id: user.id,
      },
      followers: {
        none: {
          followerId: user.id,
        },
      },
    },
    select: getUserDataSelect(user.id),
    take: 5,
  });

  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-md text-muted-foreground">회원님을 위한 추천</div>
      {usersToFollow.map((user) => (
        <div
          key={user.id}
          className="flex items-center justify-between gap-3 text-sm"
        >
          <UserTooltip user={user}>
            <Link
              href={`/users/${user.username}`}
              className="flex items-center gap-3"
            >
              <UserAvatar avatarUrl={user.avatarUrl} className="flex-none" />
              <div>
                <p className="line-clamp-1 break-all hover:underline">
                  {user.displayName}
                </p>
                <p className="line-clamp-1 break-all text-muted-foreground">
                  @{user.username}
                </p>
              </div>
            </Link>
          </UserTooltip>
          <FollowButton
            userId={user.id}
            initialState={{
              followers: user._count.followers,
              isFollowedByUser: user.followers.some(
                ({ followerId }) => followerId === user.id,
              ),
            }}
          />
        </div>
      ))}
    </div>
  );
}

// 트렌드 토픽 ? 추천 게시물 ? //

// const getTrendingTopics = unstable_cache(
//   async () => {
//     const result = await prisma.$queryRaw<{ hashtag: string; count: bigint }[]>`
//             SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count
//             FROM posts
//             GROUP BY (hashtag)
//             HAVING COUNT(*) >= 1
//             ORDER BY count DESC, hashtag ASC
//             LIMIT 5

//         `;

//     return result.map((row) => ({
//       hashtag: row.hashtag,
//       count: Number(row.count),
//     }));
//   },
//   ["trending_topics"],
//   {
//     // revalidate: 3 * 60 * 60,
//   },
// );

async function TrendingTopics() {
  try {
    const posts = await getWeeklyTopPosts().catch(() => []);

    if (!posts || posts.length === 0) {
      return (
        <div className="rounded-2xl bg-card p-5 shadow-sm">
          <div className="text-sm text-muted-foreground">
            현재 인기 게시물이 없습니다
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
        <div className="text-md text-muted-foreground">인기 게시물</div>
        {posts.map((post, index) => (
          <Link key={post.id} href={`/posts/${post.id}`} className="block">
            <div className="flex gap-3">
              <div className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                {index + 1}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <UserAvatar
                    avatarUrl={post.user?.avatarUrl ?? null}
                    className="h-5 w-5"
                  />
                  <span className="text-sm font-medium hover:underline">
                    {post.user?.displayName ?? "삭제된 사용자"}
                  </span>
                </div>

                <p className="line-clamp-1 text-sm text-muted-foreground">
                  {post.content || "내용 없음"}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error loading trending posts:", error);
    return (
      <div className="rounded-2xl bg-card p-5 shadow-sm">
        <div className="text-sm text-muted-foreground">
          일시적인 오류가 발생했습니다
        </div>
      </div>
    );
  }
}
