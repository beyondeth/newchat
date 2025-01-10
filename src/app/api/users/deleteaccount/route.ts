// app/api/users/deleteaccount/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { validateRequest, lucia } from "@/auth";
import { cookies } from "next/headers";
import { verify } from "@node-rs/argon2";

export async function DELETE(req: Request) {
  const { user, session } = await validateRequest();

  if (!user || !session) {
    return NextResponse.json(
      { error: "로그인이 필요합니다." },
      { status: 401 },
    );
  }

  try {
    const { password } = await req.json();

    console.log("1. 사용자 조회 시작:", user.id);
    const userDetails = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        passwordHash: true,
        googleId: true,
        kakaoId: true,
      },
    });

    if (!userDetails) {
      console.log("2. 사용자를 찾을 수 없음:", user.id);
      return NextResponse.json(
        { error: "사용자를 찾을 수 없습니다." },
        { status: 404 },
      );
    }

    console.log(
      "3. 소셜 로그인 여부:",
      !!userDetails.googleId || !!userDetails.kakaoId,
    );

    // 일반 회원인 경우에만 비밀번호 검증
    if (!userDetails.googleId && !userDetails.kakaoId) {
      if (!password) {
        return NextResponse.json(
          { error: "비밀번호를 입력해주세요." },
          { status: 400 },
        );
      }

      console.log("4. 비밀번호 검증 시작");
      const isValid = await verify(userDetails.passwordHash || "", password);
      console.log("5. 비밀번호 검증 결과:", isValid);

      if (!isValid) {
        return NextResponse.json(
          { error: "비밀번호가 일치하지 않습니다." },
          { status: 403 },
        );
      }
    }

    console.log("6. 계정 삭제 시작");

    // 트랜잭션으로 모든 삭제 작업 처리
    await prisma.$transaction(async (tx) => {
      // PostView 삭제
      await tx.postView.deleteMany({
        where: { userId: user.id },
      });

      // BlogPostView 삭제
      await tx.blogPostView.deleteMany({
        where: { userId: user.id },
      });

      // Session 삭제
      await tx.session.deleteMany({
        where: { userId: user.id },
      });

      // 마지막으로 사용자 삭제
      await tx.user.delete({
        where: { id: user.id },
      });
    });

    console.log("7. 계정 삭제 완료");

    // 세션 쿠키 삭제
    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    console.log("8. 세션 쿠키 삭제 완료");

    return NextResponse.json({
      success: true,
      message: "계정이 성공적으로 삭제되었습니다.",
    });
  } catch (error) {
    console.error("계정 삭제 중 오류 세부 내용:", error);
    if (error instanceof Error) {
      console.error("에러 메시지:", error.message);
      console.error("에러 스택:", error.stack);
    }
    return NextResponse.json(
      { error: "계정 삭제 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
