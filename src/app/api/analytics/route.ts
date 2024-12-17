// app/api/analytics/route.ts
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

interface MonthlyStats {
  month: Date;
  count: string;
}

export async function GET(req: NextRequest) {
  try {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    const [posts, users, views] = await Promise.all([
      // 게시물 통계
      prisma.$queryRaw<MonthlyStats[]>`
        SELECT 
          DATE_TRUNC('month', "createdAt")::date as month,
          COUNT(*)::text as count
        FROM "posts"
        WHERE "createdAt" >= ${startOfYear}
        GROUP BY DATE_TRUNC('month', "createdAt")::date
        ORDER BY month;
      `,

      // 활성 사용자 통계
      prisma.$queryRaw<MonthlyStats[]>`
        SELECT 
          DATE_TRUNC('month', "createdAt")::date as month,
          COUNT(*)::text as count
        FROM "users"
        WHERE "createdAt" >= ${startOfYear}
        GROUP BY DATE_TRUNC('month', "createdAt")::date
        ORDER BY month;
      `,

      // 조회수 통계 - views 테이블 사용
      prisma.$queryRaw<MonthlyStats[]>`
        SELECT 
          DATE_TRUNC('month', "createdAt")::date as month,
          COUNT(*)::text as count
        FROM "views"
        WHERE "createdAt" >= ${startOfYear}
        GROUP BY DATE_TRUNC('month', "createdAt")::date
        ORDER BY month;
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
        uv: Number(
          posts.find((p) => new Date(p.month).getMonth() === i)?.count ?? 0,
        ),
        pv: Number(
          views.find((v) => new Date(v.month).getMonth() === i)?.count ?? 0,
        ),
        amt: Number(
          users.find((u) => new Date(u.month).getMonth() === i)?.count ?? 0,
        ),
      };
    });

    return Response.json(monthlyData);
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}
