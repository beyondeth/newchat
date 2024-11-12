import SearchField from "@/components/SearchField";
import UserButton from "@/components/UserButton";
import Image from "next/image";
import Link from "next/link";
import hashlogo from "@/assets/QQ.png";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-5 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold text-primary"
        >
          <Image src={hashlogo} alt="Logo" width={50} height={50} priority />
          {/* <span>Q2Q.kr</span> */}
          <span>건설업 품질관리자 커뮤니티</span>
        </Link>
        <SearchField />

        <UserButton className="sm:ms-auto" />
      </div>
    </header>
  );
}
