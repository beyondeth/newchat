import TrendsSidebar from "@/components/TrendsSidebar";
import { Metadata } from "next";
import Notifications from "./Notifications";
import { Bell, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Notifications",
};

export default function Page() {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <div className="rounded-2xl bg-card p-5 shadow-sm">
          <div className="flex items-center justify-center gap-2">
            <Bell className="size-5" />
            <span className="text-md font-bold">알림</span>
          </div>
        </div>
        <Notifications />
      </div>
      <TrendsSidebar />
    </main>
  );
}
