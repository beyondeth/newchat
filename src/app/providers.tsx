"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";
import PostHogPageView from "./PostHogPageView";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST;

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!POSTHOG_KEY || !POSTHOG_HOST) {
      console.warn("PostHog configuration is missing");
      return;
    }

    try {
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        person_profiles: "identified_only",
        capture_pageview: false,
        autocapture: false, // 자동 이벤트 캡처 비활성화로 성능 향상
        loaded: (posthog) => {
          if (process.env.NODE_ENV === "development") {
            posthog.debug(); // 개발 환경에서만 디버그 모드 활성화
          }
        },
      });
    } catch (error) {
      console.error("Failed to initialize PostHog:", error);
    }
  }, []);

  // PostHog가 설정되지 않았을 때도 앱이 정상적으로 작동하도록
  if (!POSTHOG_KEY || !POSTHOG_HOST) {
    return <>{children}</>;
  }

  return (
    <PHProvider client={posthog}>
      <PostHogPageView />
      {children}
    </PHProvider>
  );
}
