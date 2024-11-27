import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // 공개 경로 설정 (API 경로 제외)
  const publicPaths = ["/", "/login", "/signup", "/api/posts"];

  // 현재 경로가 공개 경로인지 확인
  const isPublicPath = publicPaths.some(
    (path) => request.nextUrl.pathname === path,
  );

  // API 요청인지 확인
  const isApiRoute = request.nextUrl.pathname.startsWith("/api/");

  // 공개 경로면 정상적으로 진행
  if (isPublicPath) {
    return NextResponse.next();
  }

  // API 요청이거나 비공개 경로인데 세션 쿠키가 없으면 로그인 페이지로 리다이렉트
  if ((isApiRoute || !isPublicPath) && !request.cookies.has("auth_session")) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect_to", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 세션 쿠키가 있으면 정상적으로 진행
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
};
