// app/api/books/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query") || "프로그래밍";

  if (!process.env.NAVER_CLIENT_ID || !process.env.NAVER_CLIENT_SECRET) {
    return NextResponse.json(
      { error: "API 키가 설정되지 않았습니다." },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(
      `https://openapi.naver.com/v1/search/book.json?query=${encodeURIComponent(query)}&display=10`,
      {
        headers: {
          "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID,
          "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`API 응답 에러: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { error: "도서 데이터를 가져오는데 실패했습니다." },
      { status: 500 },
    );
  }
}
