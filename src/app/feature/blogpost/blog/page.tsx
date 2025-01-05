// app/feature/blogpost/blog/page.tsx
import Link from "next/link";
import prisma from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

function getContentPreview(content: string) {
  // HTML 태그 제거
  const plainText = content.replace(/<[^>]+>/g, "");
  // 공백 정리
  const trimmedText = plainText.replace(/\s+/g, " ").trim();
  // 100자로 제한하고 말줄임표 추가
  return trimmedText.length > 100
    ? `${trimmedText.slice(0, 100)}...`
    : trimmedText;
}

export default async function BlogPosts() {
  const posts = await prisma.blogPost.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          displayName: true,
          username: true,
          avatarUrl: true,
        },
      },
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
  });

  if (!posts.length) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <h2 className="mb-2 text-2xl font-bold">아직 작성된 글이 없습니다</h2>
        <p className="text-muted-foreground">
          곧 새로운 글이 업데이트될 예정입니다.
        </p>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="container max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">블로그</h1>
          <Link
            href="/feature/blogpost"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            글 작성하기
          </Link>
        </div>

        <div className="divide-y divide-border">
          {posts.map((post) => (
            <article key={post.id} className="py-6">
              <Link
                href={`/feature/blogpost/blog/${post.slug}`}
                className="group block hover:no-underline"
              >
                <h2 className="mb-2 text-xl font-semibold group-hover:text-primary">
                  {post.title}
                </h2>

                {post.excerpt ? (
                  <p className="mb-3 text-muted-foreground">{post.excerpt}</p>
                ) : (
                  <p className="mb-3 text-muted-foreground line-clamp-2">
                    {getContentPreview(post.content)}
                  </p>
                )}

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    {post.user.avatarUrl && (
                      <img
                        src={post.user.avatarUrl}
                        alt={post.user.displayName || post.user.username}
                        className="h-5 w-5 rounded-full"
                      />
                    )}
                    <span>{post.user.displayName || post.user.username}</span>
                  </div>
                  <time>
                    {formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                      locale: ko,
                    })}
                  </time>
                  <div className="flex gap-4">
                    <span>좋아요 {post._count.likes}</span>
                    <span>댓글 {post._count.comments}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
