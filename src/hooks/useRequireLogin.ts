// hooks/useRequireLogin.ts
"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import { useRouter } from "next/navigation";

export function useRequireLogin() {
  const { user } = useSession();
  const router = useRouter();

  const requireLogin = (event?: React.MouseEvent) => {
    if (!user) {
      event?.preventDefault();
      router.push("/login");
      return true;
    }
    return false;
  };

  return { requireLogin, isLoggedIn: !!user };
}
