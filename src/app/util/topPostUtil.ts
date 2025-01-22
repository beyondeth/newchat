// app/util/topPostUtil.ts
import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";
import { TopPost, ProcessedTopPost } from "@/lib/types";

export const getWeeklyTopPosts = unstable_cache(
  async (): Promise<ProcessedTopPost[]> => {
    try {
      const posts = await prisma.$queryRaw<TopPost[]>`
        WITH PostMetrics AS (
          SELECT 
            p.id,
            p.content,
            p."userId",
            p."viewCount",
            COUNT(DISTINCT l."userId") as likes_count,
            COUNT(DISTINCT c.id) as comments_count,
            COUNT(DISTINCT b."userId") as bookmarks_count,
            p."createdAt",
            (
              p."viewCount" * 0.35 + 
              COUNT(DISTINCT l."userId") * 0.30 + 
              COUNT(DISTINCT c.id) * 0.20 + 
              COUNT(DISTINCT b."userId") * 0.15
            ) as score
          FROM posts p
          LEFT JOIN likes l ON p.id = l."postId"
          LEFT JOIN comments c ON p.id = c."postId"
          LEFT JOIN bookmarks b ON p.id = b."postId"
          WHERE p."createdAt" >= NOW() - INTERVAL '7 days'
          GROUP BY p.id, p.content, p."userId", p."viewCount", p."createdAt"
        )
        SELECT 
          pm.*,
          u.id as "userId",
          u.username,
          u."displayName",
          u."avatarUrl"
        FROM PostMetrics pm
        JOIN users u ON pm."userId" = u.id
        ORDER BY pm.score DESC
        LIMIT 5
      `;

      if (!Array.isArray(posts)) {
        console.error("Unexpected response format for weekly top posts");
        return [];
      }

      return posts.map((post) => ({
        id: post.id || "",
        content: post.content || "",
        viewCount: Number(post.viewCount) || 0,
        likes: Number(post.likes_count) || 0,
        comments: Number(post.comments_count) || 0,
        bookmarks: Number(post.bookmarks_count) || 0,
        score: Number(post.score) || 0,
        createdAt: new Date(post.createdAt || Date.now()),
        user: {
          id: post.userId || "",
          username: post.username || "unknown",
          displayName: post.displayName || "삭제된 사용자",
          avatarUrl: post.avatarUrl,
        },
      }));
    } catch (error) {
      console.error("Failed to fetch weekly top posts:", error);
      return [];
    }
  },
  ["weekly_top_posts"],
  {
    revalidate: 60 * 60 * 24, // 1시간마다 갱신
  },
);
