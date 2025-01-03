// "use client";

// import { SearchIcon } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { Input } from "./ui/input";

// export default function SearchField() {
//   const router = useRouter();

//   function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     const form = e.currentTarget;
//     const q = (form.q as HTMLInputElement).value.trim();
//     if (!q) return;
//     router.push(`/search?q=${encodeURIComponent(q)}`);
//   }

//   return (
//     <form onSubmit={handleSubmit} method="GET" action="/search">
//       <div className="relative">
//         <Input name="q" placeholder="검색" className="pe-10" />
//         <SearchIcon className="absolute right-3 top-1/2 size-5 -translate-y-1/2 transform text-muted-foreground" />
//       </div>
//     </form>
//   );
// }

"use client";

import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function SearchField() {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.q as HTMLInputElement).value.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
    setIsExpanded(false);
  }

  return (
    <div className="flex items-center">
      <form
        onSubmit={handleSubmit}
        method="GET"
        action="/search"
        className="relative flex items-center"
      >
        <Input
          name="q"
          placeholder="검색"
          className={cn(
            "pe-10 transition-all duration-300 ease-in-out mr-2",
            isExpanded ? "w-[200px] opacity-100" : "w-0 opacity-0 p-0 border-0",
          )}
        />
        <button
          type={isExpanded ? "submit" : "button"}
          onClick={() => !isExpanded && setIsExpanded(true)}
          className="flex items-center justify-center"
        >
          <SearchIcon className="size-6 text-gray-700 dark:text-gray-300 stroke-[2px]" />
        </button>
        {isExpanded && (
          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            className="ml-2"
          >
            <X className="size-5 text-muted-foreground" />
          </button>
        )}
      </form>
    </div>
  );
}
