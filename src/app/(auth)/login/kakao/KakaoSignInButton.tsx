import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function KakaoSignInButton() {
  return (
    <Button
      variant="outline"
      className="bg-[#FEE500] text-black hover:bg-[#FEE500]/90 hover:text-black border-none"
      asChild
    >
      <a href="/login/kakao" className="flex w-full items-center gap-4">
        <KakaoIcon />
        <span>카카오 로그인</span>
      </a>
    </Button>
  );
}

function KakaoIcon() {
  return (
    <svg width="1.2em" height="1.2em" viewBox="0 0 20 20" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 3C5.85786 3 2.5 5.68041 2.5 8.99143C2.5 11.1814 3.95139 13.0932 6.09184 14.2237L5.30014 17.1082C5.25202 17.2592 5.44193 17.3858 5.57477 17.2927L9.27255 14.9087C9.51053 14.9322 9.75305 14.9443 10 14.9443C14.1421 14.9443 17.5 12.2639 17.5 8.95286C17.5 5.64183 14.1421 3 10 3Z"
        fill="black"
      />
    </svg>
  );
}
