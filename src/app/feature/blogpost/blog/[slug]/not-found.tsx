// app/feature/blogpost/[slug]/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <h2 className="mb-4 text-2xl font-bold">블로그 글을 찾을 수 없습니다</h2>
      <p className="mb-8 text-muted-foreground">
        요청하신 블로그 포스트가 존재하지 않거나 삭제되었을 수 있습니다.
      </p>
      <Link
        href="/blog"
        className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
      >
        블로그 목록으로 돌아가기
      </Link>
    </div>
  );
}
