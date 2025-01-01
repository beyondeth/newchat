// app/api/auth/kakao/route.ts
import { kakao } from "@/auth";
import { generateState } from "arctic";
import { cookies } from "next/headers";

export async function GET() {
  const state = generateState();

  const url = await kakao.createAuthorizationURL(state, {
    scopes: ["profile_nickname", "profile_image"],
  });

  cookies().set("state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  return Response.redirect(url);
}
