// app/api/analytics/route.ts
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

interface MonthlyStats {
  month: Date;
  count: number;
}

export async function GET(req: NextRequest) {
  try {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    const [posts, views, users] = await Promise.all([
      // 게시물 통계
      prisma.$queryRaw<MonthlyStats[]>`
        SELECT DATE_TRUNC('month', "createdAt") as month,
               COUNT(*) as count
        FROM posts
        WHERE "createdAt" >= ${startOfYear}
        GROUP BY DATE_TRUNC('month', "createdAt")
        ORDER BY month
      `,

      // 조회수 통계
      prisma.$queryRaw<MonthlyStats[]>`
        SELECT DATE_TRUNC('month', "createdAt") as month,
               COUNT(*) as count
        FROM views
        WHERE "createdAt" >= ${startOfYear}
        GROUP BY DATE_TRUNC('month', "createdAt")
        ORDER BY month
      `,

      // 활성 사용자 통계
      prisma.$queryRaw<MonthlyStats[]>`
        SELECT DATE_TRUNC('month', "createdAt") as month,
               COUNT(*) as count
        FROM users
        WHERE "createdAt" >= ${startOfYear}
        GROUP BY DATE_TRUNC('month', "createdAt")
        ORDER BY month
      `,
    ]);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthlyData = Array.from({ length: 12 }, (_, i) => {
      const monthName = monthNames[i];

      return {
        name: monthName,
        uv: posts.find((p) => new Date(p.month).getMonth() === i)?.count ?? 0,
        pv: views.find((v) => new Date(v.month).getMonth() === i)?.count ?? 0,
        amt: users.find((u) => new Date(u.month).getMonth() === i)?.count ?? 0,
      };
    });

    return Response.json(monthlyData);
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
