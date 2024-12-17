import { Metadata } from "next";
import Link from "next/link";
import SignUpForm from "./SignUpForm";

export const metadata: Metadata = {
  title: "계정 만들기",
};

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[32rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        {/* <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2"> */}
        <div className="w-full space-y-10 overflow-y-auto p-10">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold">회원가입</h1>
            <p className="text-muted-foreground">
              사용하실 이메일 주소와 닉네임을 정해주세요.{" "}
            </p>
          </div>
          <div className="space-y-5">
            <SignUpForm />
            {/* <Link href="/login" className="block text-center hover:underline">
              Already have an account? Log in
            </Link> */}
            <div className="flex items-center justify-center gap-2">
              <span className="text-muted-foreground">
                이미 계정이 있으신가요?
              </span>
              <Link
                href="/login"
                className="text-[#F87A53] font-bold hover:underline"
              >
                로그인
              </Link>
            </div>
          </div>
        </div>
        {/* <Image
          src={signupImage}
          alt=""
          className="hidden w-1/2 object-cover md:block"
        /> */}
      </div>
    </main>
  );
}
