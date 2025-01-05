// app/feature/blogpost/[slug]/page.tsx
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: {
        slug: params.slug,
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

    if (!post) {
      notFound();
    }

    return (
      <article className="container max-w-4xl py-10">
        <header className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">{post.title}</h1>
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
        </header>

        <div
          className="prose prose-headings:font-title prose-headings:text-foreground prose-p:text-muted-foreground max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    );
  } catch (error) {
    console.error("Error fetching blog post:", error);
    notFound();
  }
}
