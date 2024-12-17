"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import Link from "next/link";
import { PostData } from "@/lib/types";
import { formatRelativeDate } from "@/lib/utils";

interface PostsTableProps {
  posts: PostData[];
  limit?: number;
  title?: string;
}

const PostsTable = ({ posts, limit, title }: PostsTableProps) => {
  const handleDelete = async (postId: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await fetch(`/api/posts/${postId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          // 성공적으로 삭제되면 페이지 새로고침
          window.location.reload();
        } else {
          alert("Failed to delete the post");
        }
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("Error deleting post");
      }
    }
  };

  // Sort posts in desc order based on date
  const sortedPosts: PostData[] = [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  // Filter posts to limit
  const filteredPosts = limit ? sortedPosts.slice(0, limit) : sortedPosts;

  return (
    <div className="mt-10">
      <h3 className="text-2xl mb-4 font-semibold">{title ? title : "Posts"}</h3>
      <Table>
        <TableCaption>A list of recent posts</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Content</TableHead>
            <TableHead className="hidden md:table-cell">Author</TableHead>
            <TableHead className="hidden md:table-cell text-right">
              Date
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPosts.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="max-w-md truncate">
                {post.content}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {post.user.displayName}
              </TableCell>
              <TableCell className="text-right hidden md:table-cell">
                {formatRelativeDate(post.createdAt)}
              </TableCell>
              <TableCell className="flex gap-2">
                <Link href={`/posts/${post.id}`}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs">
                    VIEW
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-xs"
                >
                  DELETE
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PostsTable;
