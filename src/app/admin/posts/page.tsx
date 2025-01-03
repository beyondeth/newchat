import PostsTable from "@/components/adminPosts/PostsTable";

import PostsPagination from "@/components/adminPosts/PostsPagination";
import prisma from "@/lib/prisma";
import { getPostDataInclude } from "@/lib/types";
import AdminBackButton from "@/adminBackButton";

async function PostsPage() {
  // 서버에서 posts 데이터 가져오기
  const posts = await prisma.post.findMany({
    include: getPostDataInclude(""), // 로그인한 유저 ID가 필요없는 경우 빈 문자열 전달
    orderBy: {
      createdAt: "desc",
    },
    take: 10, // 한 페이지당 표시할 게시물 수
  });

  return (
    <>
      <AdminBackButton text="Go Back" link="/admin" />

      <PostsTable posts={posts} />
      <PostsPagination />
    </>
  );
}

export default PostsPage;
