// // components/ViewCounter.tsx
// "use client";

// import { Eye } from "lucide-react";
// import { useEffect } from "react";

// interface ViewCounterProps {
//   postId: string;
//   initialViews: number;
// }

// export default function ViewCounter({
//   postId,
//   initialViews,
// }: ViewCounterProps) {
//   useEffect(() => {
//     const incrementView = async () => {
//       try {
//         await fetch(`/api/posts/${postId}/views`, {
//           method: "POST",
//         });
//       } catch (error) {
//         console.error("Failed to increment view:", error);
//       }
//     };

//     incrementView();
//   }, [postId]);

//   return (
//     <div className="flex items-center gap-2">
//       <Eye className="size-5" />
//       <span className="text-sm font-medium tabular-nums">{initialViews}</span>
//     </div>
//   );
// }

// components/posts/ViewCounter.tsx
"use client";

import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

interface ViewCounterProps {
  postId: string;
  initialState: {
    views: number;
    hasViewedByUser: boolean;
  };
}

export default function ViewCounter({
  postId,
  initialState,
}: ViewCounterProps) {
  const [viewCount, setViewCount] = useState(initialState.views);

  useEffect(() => {
    const recordView = async () => {
      try {
        const response = await fetch(`/api/posts/${postId}/view`, {
          method: "POST",
        });

        if (response.ok) {
          const data = await response.json();
          setViewCount(data.viewCount);
        }
      } catch (error) {
        console.error("Failed to record view:", error);
      }
    };

    if (!initialState.hasViewedByUser) {
      recordView();
    }
  }, [postId, initialState.hasViewedByUser]);

  return (
    <div className="flex items-center gap-1 text-muted-foreground">
      <Eye size={20} />
      <span>{viewCount}</span>
    </div>
  );
}
