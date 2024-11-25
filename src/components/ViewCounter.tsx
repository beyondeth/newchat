// components/ViewCounter.tsx
"use client";

import { Eye } from "lucide-react";
import { useEffect } from "react";

interface ViewCounterProps {
  postId: string;
  initialViews: number;
}

export default function ViewCounter({
  postId,
  initialViews,
}: ViewCounterProps) {
  useEffect(() => {
    const incrementView = async () => {
      try {
        await fetch(`/api/posts/${postId}/views`, {
          method: "POST",
        });
      } catch (error) {
        console.error("Failed to increment view:", error);
      }
    };

    incrementView();
  }, [postId]);

  return (
    <div className="flex items-center gap-2">
      <Eye className="size-5" />
      <span className="text-sm font-medium tabular-nums">{initialViews}</span>
    </div>
  );
}
