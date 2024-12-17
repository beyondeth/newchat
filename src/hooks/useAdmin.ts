// hooks/useAdmin.ts

import { useSession } from "@/app/(main)/SessionProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAdmin() {
  const { user } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!user?.isAdmin) {
      router.push("/");
    }
  }, [user, router]);

  return !!user?.isAdmin;
}
