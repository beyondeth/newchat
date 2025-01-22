// // app/api/chat/subscribe/route.ts
// import { NextRequest } from "next/server";
// import { validateRequest } from "@/auth";
// import prisma from "@/lib/prisma";
// import { RedisChatMessage } from "@/lib/chattypes";

// export async function GET(request: NextRequest) {
//   // 인증 확인
//   const { user, session } = await validateRequest();
//   if (!user || !session) {
//     return new Response("Unauthorized", { status: 401 });
//   }

//   const { searchParams } = new URL(request.url);
//   const roomId = searchParams.get("roomId");

//   if (!roomId) {
//     return new Response("Missing roomId", { status: 400 });
//   }

//   // 채팅방 접근 권한 확인
//   const chatRoom = await prisma.chatRoom.findFirst({
//     where: {
//       id: roomId,
//       participants: {
//         some: {
//           userId: user.id,
//         },
//       },
//     },
//   });

//   if (!chatRoom) {
//     return new Response("Unauthorized access to chat room", { status: 403 });
//   }

//   const headers = {
//     "Content-Type": "text/event-stream",
//     "Cache-Control": "no-cache",
//     Connection: "keep-alive",
//   };

//   const baseUrl = process.env.UPSTASH_REDIS_REST_URL;
//   const token = process.env.UPSTASH_REDIS_REST_TOKEN;

//   if (!baseUrl || !token) {
//     return new Response("Redis configuration missing", { status: 500 });
//   }

//   const stream = new ReadableStream({
//     async start(controller) {
//       try {
//         const key = `chat:room:${roomId}:messages`;

//         const response = await fetch(`${baseUrl}/lrange/${key}/0/10`, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch messages");
//         }

//         const responseBody = await response.text();
//         const messages = JSON.parse(responseBody);

//         if (!Array.isArray(messages.result)) {
//           throw new Error("Invalid message format");
//         }

//         messages.result.forEach((messageString: string) => {
//           try {
//             // Redis에서 가져온 메시지는 배열의 첫 번째 요소에 문자열로 있음
//             const messageData = JSON.parse(messageString);
//             const parsedMessage = JSON.parse(messageData[0]);

//             // SSE 메시지로 보내기
//             controller.enqueue(`data: ${JSON.stringify(parsedMessage)}\n\n`);
//           } catch (parseError) {
//             console.error("메시지 파싱 오류:", parseError, messageString);
//           }
//         });

//         // 연결 유지를 위한 ping 전송
//         const pingInterval = setInterval(() => {
//           controller.enqueue(": ping\n\n");
//         }, 30000);

//         // 연결 종료 시 정리
//         request.signal.addEventListener("abort", () => {
//           clearInterval(pingInterval);
//           controller.close();
//         });
//       } catch (error) {
//         console.error("구독 중 오류:", error);
//         controller.error(error);
//       }
//     },
//   });

//   return new Response(stream, { headers });
// }

// app/api/chat/subscribe/route.ts
// import { NextRequest } from "next/server";
// import { validateRequest } from "@/auth";
// import prisma from "@/lib/prisma";
// import { RedisChatMessage } from "@/lib/chattypes";

// export async function GET(request: NextRequest) {
//   // 인증 확인
//   const { user, session } = await validateRequest();
//   if (!user || !session) {
//     return new Response("Unauthorized", { status: 401 });
//   }

//   const { searchParams } = new URL(request.url);
//   const roomId = searchParams.get("roomId");

//   if (!roomId) {
//     return new Response("Missing roomId", { status: 400 });
//   }

//   // 채팅방 접근 권한 확인
//   const chatRoom = await prisma.chatRoom.findFirst({
//     where: {
//       id: roomId,
//       participants: {
//         some: {
//           userId: user.id,
//         },
//       },
//     },
//   });

//   if (!chatRoom) {
//     return new Response("Unauthorized access to chat room", { status: 403 });
//   }

//   const headers = {
//     "Content-Type": "text/event-stream",
//     "Cache-Control": "no-cache",
//     Connection: "keep-alive",
//   };

//   const baseUrl = process.env.UPSTASH_REDIS_REST_URL;
//   const token = process.env.UPSTASH_REDIS_REST_TOKEN;

//   if (!baseUrl || !token) {
//     return new Response("Redis configuration missing", { status: 500 });
//   }

//   const stream = new ReadableStream({
//     async start(controller) {
//       try {
//         const key = `chat:room:${roomId}:messages`;

//         const response = await fetch(`${baseUrl}/lrange/${key}/0/10`, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch messages");
//         }

//         const responseBody = await response.text();
//         const messages = JSON.parse(responseBody);

//         if (!Array.isArray(messages.result)) {
//           throw new Error("Invalid message format");
//         }

//         // 메시지 배열을 역순으로 변경
//         const reversedMessages = [...messages.result].reverse();

//         reversedMessages.forEach((messageString: string) => {
//           try {
//             // Redis에서 가져온 메시지는 배열의 첫 번째 요소에 문자열로 있음
//             const messageData = JSON.parse(messageString);
//             const parsedMessage = JSON.parse(messageData[0]);

//             // SSE 메시지로 보내기
//             controller.enqueue(`data: ${JSON.stringify(parsedMessage)}\n\n`);
//           } catch (parseError) {
//             console.error("메시지 파싱 오류:", parseError, messageString);
//           }
//         });

//         // 연결 유지를 위한 ping 전송
//         const pingInterval = setInterval(() => {
//           controller.enqueue(": ping\n\n");
//         }, 30000);

//         // 연결 종료 시 정리
//         request.signal.addEventListener("abort", () => {
//           clearInterval(pingInterval);
//           controller.close();
//         });
//       } catch (error) {
//         console.error("구독 중 오류:", error);
//         controller.error(error);
//       }
//     },
//   });

//   return new Response(stream, { headers });
// }

// app/api/chat/subscribe/route.ts

import { NextRequest } from "next/server";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { RedisChatMessage } from "@/lib/chattypes";

export async function GET(request: NextRequest) {
  const { user, session } = await validateRequest();
  if (!user || !session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const roomId = searchParams.get("roomId");

  if (!roomId) {
    return new Response("Missing roomId", { status: 400 });
  }

  const chatRoom = await prisma.chatRoom.findFirst({
    where: {
      id: roomId,
      participants: {
        some: {
          userId: user.id,
        },
      },
    },
  });

  if (!chatRoom) {
    return new Response("Unauthorized access to chat room", { status: 403 });
  }

  const headers = {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  };

  const baseUrl = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!baseUrl || !token) {
    return new Response("Redis configuration missing", { status: 500 });
  }

  return new Response(
    new ReadableStream({
      async start(controller) {
        let isStreamClosed = false;
        const encoder = new TextEncoder();
        const sentMessageIds = new Set<string>();

        // 안전한 메시지 전송 함수
        const safeSend = (message: string, messageId?: string) => {
          if (!isStreamClosed) {
            try {
              if (messageId) {
                // 이미 보낸 메시지인지 확인
                if (sentMessageIds.has(messageId)) {
                  return;
                }
                sentMessageIds.add(messageId);
              }

              controller.enqueue(encoder.encode(message));
            } catch (error) {
              console.error("메시지 전송 실패:", error);
              isStreamClosed = true;
              try {
                controller.close();
              } catch {}
            }
          }
        };

        // Ping 타이머 관리
        let pingTimer: NodeJS.Timeout | null = null;

        const startPingTimer = () => {
          if (pingTimer) clearInterval(pingTimer);

          pingTimer = setInterval(() => {
            if (!isStreamClosed) {
              try {
                safeSend(`: ping\n\n`);
              } catch (error) {
                console.error("Ping 전송 오류:", error);
                if (pingTimer) clearInterval(pingTimer);
                isStreamClosed = true;
                try {
                  controller.close();
                } catch {}
              }
            }
          }, 30000);
        };

        // 정리 함수
        const cleanup = () => {
          isStreamClosed = true;
          if (pingTimer) clearInterval(pingTimer);
          try {
            controller.close();
          } catch {}
        };

        try {
          const key = `chat:room:${roomId}:messages`;

          // 최근 메시지 로드
          const response = await fetch(`${baseUrl}/lrange/${key}/0/10`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error("메시지 로드 실패");
          }

          const responseBody = await response.text();
          const messages = JSON.parse(responseBody);

          if (!Array.isArray(messages.result)) {
            throw new Error("잘못된 메시지 형식");
          }

          // 메시지 배열을 역순으로 변경
          const reversedMessages = [...messages.result].reverse();

          reversedMessages.forEach((messageString: string) => {
            if (isStreamClosed) return;

            try {
              const parsedMessage = JSON.parse(messageString);

              // 현재 채팅방의 메시지만 전송
              if (parsedMessage.chatRoomId === roomId) {
                safeSend(
                  `data: ${JSON.stringify(parsedMessage)}\n\n`,
                  parsedMessage.id,
                );
              }
            } catch (parseError) {
              console.error("메시지 파싱 오류:", parseError, messageString);
            }
          });

          // Redis Pub/Sub 채널 구독
          const subscribeResponse = await fetch(
            `${baseUrl}/subscribe/chat:room:${roomId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          const reader = subscribeResponse.body?.getReader();
          const decoder = new TextDecoder();

          // Ping 타이머 시작
          startPingTimer();

          if (reader) {
            while (true) {
              if (isStreamClosed) break;

              const result = await reader.read();
              if (result.done) break;

              try {
                const messageString = decoder.decode(result.value);
                const message = JSON.parse(messageString);

                // 현재 채팅방의 메시지만 전송
                if (message.chatRoomId === roomId) {
                  safeSend(`data: ${JSON.stringify(message)}\n\n`, message.id);
                }
              } catch (error) {
                console.error("실시간 메시지 수신 오류:", error);
              }
            }
          }
        } catch (error) {
          console.error("구독 중 오류:", error);
          cleanup();
        } finally {
          cleanup();
        }
      },
    }),
    { headers },
  );
}
