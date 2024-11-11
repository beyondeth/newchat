import { Metadata } from "next";
import Link from "next/link";
import LoginForm from "./LoginForm";
// import Image from "next/image";
// import loginImage from "@/assets/login-image.jpg";

export const metadata: Metadata = {
  title: "로그인",
};

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[32rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        {/* <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2"> */}
        <div className="w-full space-y-10 overflow-y-auto p-10">
          <h1 className="text-center text-2xl font-bold">로그인</h1>
          <div className="space-y-5">
            <LoginForm />
            {/* <Link href="/signup" className="block text-center hover:underline">
              계정이 없으신가요? 회원가입
            </Link> */}
            <div className="flex items-center justify-center gap-2">
              <span className="text-muted-foreground">계정이 없으신가요?</span>
              <Link
                href="/signup"
                className="text-[#F87A53] font-bold hover:underline"
              >
                회원가입
              </Link>
            </div>
          </div>
        </div>
        {/* <Image
          src={loginImage}
          alt=""
          className="hidden w-1/2 object-cover md:block"
        /> */}
      </div>
    </main>
  );
}

//Image 를 제거하고 max-w-[64rem] -> 32rem 으로 수정함
