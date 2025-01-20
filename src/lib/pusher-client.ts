// lib/pusher-client.ts
import PusherClient from "pusher-js";

// 타입 안전성을 위해 환경변수가 없을 경우 처리 추가
if (
  !process.env.NEXT_PUBLIC_PUSHER_KEY ||
  !process.env.NEXT_PUBLIC_PUSHER_CLUSTER
) {
  throw new Error("Missing Pusher environment variables");
}

const pusherClient = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
});

export default pusherClient;
