import DashboardCard from "@/components/admindashboard/DashboardCard";
import AnalyticsChart from "@/components/admindashboard/AnalyticsChart";
import { Folder, MessageCircle, Newspaper, User } from "lucide-react";
import PostsTable from "@/components/adminPosts/PostsTable";
import prisma from "@/lib/prisma";
import { getPostDataInclude } from "@/lib/types";
import AdminUser from "@/components/AdminUser";

export default async function Page() {
  // 통계 데이터 가져오기
  const [postsCount, usersCount, commentsCount] = await Promise.all([
    prisma.post.count(),
    prisma.user.count(),
    prisma.comment.count(),
  ]);

  // 최근 게시물 5개 가져오기
  const recentPosts = await prisma.post.findMany({
    include: getPostDataInclude(""),
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between gap-5 mb-5">
        <DashboardCard
          title="Posts"
          count={postsCount}
          icon={<Newspaper className="text-slate-500" size={72} />}
        />
        <DashboardCard
          title="Categories"
          count={12}
          icon={<Folder className="text-slate-500" size={72} />}
        />
        <DashboardCard
          title="Users"
          count={usersCount}
          icon={<User className="text-slate-500" size={72} />}
        />
        <DashboardCard
          title="Comments"
          count={commentsCount}
          icon={<MessageCircle className="text-slate-500" size={72} />}
        />
      </div>

      <AnalyticsChart />
      <AdminUser />
      <PostsTable posts={recentPosts} title="Latest Posts" limit={5} />
    </>
  );
}
