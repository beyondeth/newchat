// // lib/redis.ts
// import { RedisChatMessage } from "@/lib/chattypes";

// export class RedisChat {
//   private baseUrl: string;
//   private token: string;

//   constructor() {
//     this.baseUrl = process.env.UPSTASH_REDIS_REST_URL!;
//     this.token = process.env.UPSTASH_REDIS_REST_TOKEN!;
//   }

//   async saveMessage(roomId: string, message: RedisChatMessage) {
//     const key = `chat:room:${roomId}:messages`;

//     try {
//       // 메시지 저장
//       await fetch(`${this.baseUrl}/lpush/${key}`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${this.token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify([JSON.stringify(message)]),
//       });

//       // 최근 100개 메시지만 유지
//       await fetch(`${this.baseUrl}/ltrim/${key}/0/99`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${this.token}`,
//         },
//       });

//       // 채널 발행 (Pub/Sub 사용)
//       await fetch(`${this.baseUrl}/publish/chat:room:${roomId}`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${this.token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(message),
//       });
//     } catch (error) {
//       console.error("메시지 저장 중 오류:", error);
//     }
//   }

//   async getMessages(
//     roomId: string,
//     start = 0,
//     end = -1,
//   ): Promise<RedisChatMessage[]> {
//     const key = `chat:room:${roomId}:messages`;

//     try {
//       const response = await fetch(
//         `${this.baseUrl}/lrange/${key}/${start}/${end}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${this.token}`,
//           },
//         },
//       );

//       if (!response.ok) {
//         throw new Error("메시지 조회 실패");
//       }

//       const messages = await response.json();
//       return messages.map((msg: string) => JSON.parse(msg));
//     } catch (error) {
//       console.error("메시지 조회 중 오류:", error);
//       return [];
//     }
//   }
// }

// export function subscribeToRoom(
//   roomId: string,
//   onMessage: (message: string) => void,
// ) {
//   return new Promise<() => void>((resolve) => {
//     const eventSource = new EventSource(`/api/chat/subscribe?roomId=${roomId}`);

//     const messageHandler = (event: MessageEvent) => {
//       onMessage(event.data);
//     };

//     eventSource.addEventListener("message", messageHandler);

//     resolve(() => {
//       eventSource.removeEventListener("message", messageHandler);
//       eventSource.close();
//     });
//   });
// }

// export const redisChat = new RedisChat();

// lib / redis.ts;
// import { RedisChatMessage } from "@/lib/chattypes";

// export class RedisChat {
//   private baseUrl: string;
//   private token: string;

//   constructor() {
//     this.baseUrl = process.env.UPSTASH_REDIS_REST_URL!;
//     this.token = process.env.UPSTASH_REDIS_REST_TOKEN!;
//   }

//   async saveMessage(roomId: string, message: RedisChatMessage) {
//     const key = `chat:room:${roomId}:messages`;

//     try {
//       // 메시지 저장
//       await fetch(`${this.baseUrl}/lpush/${key}`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${this.token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify([JSON.stringify(message)]),
//       });

//       // 최근 100개 메시지만 유지
//       await fetch(`${this.baseUrl}/ltrim/${key}/0/99`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${this.token}`,
//         },
//       });

//       // 채널 발행 (Pub/Sub 사용)
//       await fetch(`${this.baseUrl}/publish/chat:room:${roomId}`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${this.token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify([JSON.stringify(message)]),
//       });
//     } catch (error) {
//       console.error("메시지 저장 중 오류:", error);
//     }
//   }

//   async getMessages(
//     roomId: string,
//     start = 0,
//     end = -1,
//   ): Promise<RedisChatMessage[]> {
//     const key = `chat:room:${roomId}:messages`;

//     try {
//       const response = await fetch(
//         `${this.baseUrl}/lrange/${key}/${start}/${end}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${this.token}`,
//           },
//         },
//       );

//       if (!response.ok) {
//         throw new Error("메시지 조회 실패");
//       }

//       const data = await response.json();

//       if (!Array.isArray(data.result)) {
//         console.error("Unexpected response format:", data);
//         return [];
//       }

//       return data.result
//         .map((messageString: string) => {
//           try {
//             const messageData = JSON.parse(messageString);
//             const message = JSON.parse(
//               messageData[0],
//             ) as RedisChatMessage | null;
//             return message;
//           } catch (error) {
//             console.error("메시지 파싱 오류:", error);
//             return null;
//           }
//         })
//         .filter(
//           (msg: RedisChatMessage | null): msg is RedisChatMessage =>
//             msg !== null,
//         );
//     } catch (error) {
//       console.error("메시지 조회 중 오류:", error);
//       return [];
//     }
//   }
// }

// export function subscribeToRoom(
//   roomId: string,
//   onMessage: (message: string) => void,
// ) {
//   return new Promise<() => void>((resolve) => {
//     const eventSource = new EventSource(`/api/chat/subscribe?roomId=${roomId}`);

//     const messageHandler = (event: MessageEvent) => {
//       onMessage(event.data);
//     };

//     eventSource.addEventListener("message", messageHandler);

//     resolve(() => {
//       eventSource.removeEventListener("message", messageHandler);
//       eventSource.close();
//     });
//   });
// }

// export const redisChat = new RedisChat();

// import { RedisChatMessage } from "@/lib/chattypes";

// export class RedisChat {
//   private baseUrl: string;
//   private token: string;

//   constructor() {
//     this.baseUrl = process.env.UPSTASH_REDIS_REST_URL!;
//     this.token = process.env.UPSTASH_REDIS_REST_TOKEN!;
//   }

//   async saveMessage(roomId: string, message: RedisChatMessage) {
//     const key = `chat:room:${roomId}:messages`;

//     try {
//       // 메시지 저장
//       await fetch(`${this.baseUrl}/lpush/${key}`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${this.token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify([JSON.stringify(message)]),
//       });

//       // 최근 100개 메시지만 유지
//       await fetch(`${this.baseUrl}/ltrim/${key}/0/99`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${this.token}`,
//         },
//       });

//       // 채널 발행 (Pub/Sub 사용)
//       await fetch(`${this.baseUrl}/publish/chat:room:${roomId}`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${this.token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify([JSON.stringify(message)]),
//       });
//     } catch (error) {
//       console.error("메시지 저장 중 오류:", error);
//     }
//   }

//   async getMessages(
//     roomId: string,
//     start = 0,
//     end = -1,
//   ): Promise<RedisChatMessage[]> {
//     const key = `chat:room:${roomId}:messages`;

//     try {
//       const response = await fetch(
//         `${this.baseUrl}/lrange/${key}/${start}/${end}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${this.token}`,
//           },
//         },
//       );

//       if (!response.ok) {
//         throw new Error("메시지 조회 실패");
//       }

//       const data = await response.json();

//       if (!Array.isArray(data.result)) {
//         console.error("Unexpected response format:", data);
//         return [];
//       }

//       // 메시지 배열을 뒤집어서 최신 메시지가 맨 아래에 오도록 함
//       return data.result
//         .reverse() // 배열 순서 반전
//         .map((messageString: string) => {
//           if (!messageString) return null;

//           try {
//             // 메시지 문자열을 바로 파싱 시도
//             const message = JSON.parse(messageString);

//             // 만약 첫 번째 파싱 결과가 배열이면 첫 번째 요소 파싱
//             if (Array.isArray(message)) {
//               return JSON.parse(message[0]);
//             }

//             return message;
//           } catch (error) {
//             console.error("메시지 파싱 오류:", error, messageString);
//             return null;
//           }
//         })
//         .filter(
//           (msg: RedisChatMessage | null): msg is RedisChatMessage =>
//             msg !== null,
//         );
//     } catch (error) {
//       console.error("메시지 조회 중 오류:", error);
//       return [];
//     }
//   }
// }

// export function subscribeToRoom(
//   roomId: string,
//   onMessage: (message: string) => void,
// ) {
//   return new Promise<() => void>((resolve) => {
//     const eventSource = new EventSource(`/api/chat/subscribe?roomId=${roomId}`);

//     const messageHandler = (event: MessageEvent) => {
//       onMessage(event.data);
//     };

//     eventSource.addEventListener("message", messageHandler);

//     resolve(() => {
//       eventSource.removeEventListener("message", messageHandler);
//       eventSource.close();
//     });
//   });
// }

// export const redisChat = new RedisChat();

// import { RedisChatMessage } from "@/lib/chattypes";

// export class RedisChat {
//   private baseUrl: string;
//   private token: string;

//   constructor() {
//     this.baseUrl = process.env.UPSTASH_REDIS_REST_URL!;
//     this.token = process.env.UPSTASH_REDIS_REST_TOKEN!;
//   }

//   async saveMessage(roomId: string, message: RedisChatMessage) {
//     const key = `chat:room:${roomId}:messages`;

//     try {
//       // 메시지 저장
//       await fetch(`${this.baseUrl}/lpush/${key}`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${this.token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(message),
//       });

//       // 최근 100개 메시지만 유지
//       await fetch(`${this.baseUrl}/ltrim/${key}/0/99`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${this.token}`,
//         },
//       });
//     } catch (error) {
//       console.error("메시지 저장 중 오류:", error);
//     }
//   }

//   async publishMessag(roomId: string, message: RedisChatMessage) {
//     try {
//       await fetch(`${this.baseUrl}/publish/chat:room:${roomId}`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${this.token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(message),
//       });
//     } catch (error) {
//       console.error("메시지 발행 실패:", error);
//     }
//   }

//   async getMessages(
//     roomId: string,
//     start = 0,
//     end = -1,
//   ): Promise<RedisChatMessage[]> {
//     const key = `chat:room:${roomId}:messages`;

//     try {
//       const response = await fetch(
//         `${this.baseUrl}/lrange/${key}/${start}/${end}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${this.token}`,
//           },
//         },
//       );

//       if (!response.ok) {
//         throw new Error("메시지 조회 실패");
//       }

//       const data = await response.json();

//       if (!Array.isArray(data.result)) {
//         console.error("Unexpected response format:", data);
//         return [];
//       }

//       // 메시지 배열을 뒤집어서 최신 메시지가 맨 아래에 오도록 함
//       return data.result
//         .reverse()
//         .map((messageString: string) => {
//           if (!messageString) return null;

//           try {
//             const message = JSON.parse(messageString);
//             return message;
//           } catch (error) {
//             console.error("메시지 파싱 오류:", error, messageString);
//             return null;
//           }
//         })
//         .filter(
//           (msg: RedisChatMessage | null): msg is RedisChatMessage =>
//             msg !== null,
//         );
//     } catch (error) {
//       console.error("메시지 조회 중 오류:", error);
//       return [];
//     }
//   }

//   // 메시지 발행 메서드 추가
//   async publishMessage(roomId: string, message: RedisChatMessage) {
//     try {
//       await fetch(`${this.baseUrl}/publish/chat:room:${roomId}`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${this.token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(message),
//       });
//     } catch (error) {
//       console.error("메시지 발행 실패:", error);
//     }
//   }
// }

// export function subscribeToRoom(
//   roomId: string,
//   onMessage: (message: RedisChatMessage) => void,
// ) {
//   return new Promise<() => void>((resolve) => {
//     const eventSource = new EventSource(`/api/chat/subscribe?roomId=${roomId}`);

//     const messageHandler = (event: MessageEvent) => {
//       try {
//         const message = JSON.parse(event.data);
//         onMessage(message);
//       } catch (error) {
//         console.error("메시지 파싱 오류:", error);
//       }
//     };

//     eventSource.addEventListener("message", messageHandler);

//     resolve(() => {
//       eventSource.removeEventListener("message", messageHandler);
//       eventSource.close();
//     });
//   });
// }

// export const redisChat = new RedisChat();

// import { RedisChatMessage } from "@/lib/chattypes";

// export class RedisChat {
//   private baseUrl: string;
//   private token: string;

//   constructor() {
//     this.baseUrl = process.env.UPSTASH_REDIS_REST_URL!;
//     this.token = process.env.UPSTASH_REDIS_REST_TOKEN!;
//   }

//   async saveMessage(roomId: string, message: RedisChatMessage) {
//     const key = `chat:room:${roomId}:messages`;

//     try {
//       // 메시지 저장
//       await fetch(`${this.baseUrl}/lpush/${key}`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${this.token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(message),
//       });

//       // 최근 100개 메시지만 유지
//       await fetch(`${this.baseUrl}/ltrim/${key}/0/99`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${this.token}`,
//         },
//       });
//     } catch (error) {
//       console.error("메시지 저장 중 오류:", error);
//     }
//   }

//   async publishMessage(roomId: string, message: RedisChatMessage) {
//     try {
//       await fetch(`${this.baseUrl}/publish/chat:room:${roomId}`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${this.token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(message),
//       });
//     } catch (error) {
//       console.error("메시지 발행 실패:", error);
//     }
//   }

//   async getMessages(
//     roomId: string,
//     start = 0,
//     end = -1,
//   ): Promise<RedisChatMessage[]> {
//     const key = `chat:room:${roomId}:messages`;

//     try {
//       const response = await fetch(
//         `${this.baseUrl}/lrange/${key}/${start}/${end}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${this.token}`,
//           },
//         },
//       );

//       if (!response.ok) {
//         throw new Error("메시지 조회 실패");
//       }

//       const data = await response.json();

//       if (!Array.isArray(data.result)) {
//         console.error("Unexpected response format:", data);
//         return [];
//       }

//       // 메시지 배열을 뒤집어서 최신 메시지가 맨 아래에 오도록 함
//       return data.result
//         .reverse()
//         .map((messageString: string) => {
//           if (!messageString) return null;

//           try {
//             const message = JSON.parse(messageString);
//             return message;
//           } catch (error) {
//             console.error("메시지 파싱 오류:", error, messageString);
//             return null;
//           }
//         })
//         .filter(
//           (msg: RedisChatMessage | null): msg is RedisChatMessage =>
//             msg !== null,
//         );
//     } catch (error) {
//       console.error("메시지 조회 중 오류:", error);
//       return [];
//     }
//   }
// }

// export function subscribeToRoom(
//   roomId: string,
//   onMessage: (message: RedisChatMessage) => void,
// ) {
//   return new Promise<() => void>((resolve) => {
//     const eventSource = new EventSource(`/api/chat/subscribe?roomId=${roomId}`);

//     const messageHandler = (event: MessageEvent) => {
//       try {
//         const message = JSON.parse(event.data);
//         onMessage(message);
//       } catch (error) {
//         console.error("메시지 파싱 오류:", error);
//       }
//     };

//     eventSource.addEventListener("message", messageHandler);

//     resolve(() => {
//       eventSource.removeEventListener("message", messageHandler);
//       eventSource.close();
//     });
//   });
// }

// export const redisChat = new RedisChat();

import { RedisChatMessage } from "@/lib/chattypes";
import pusher from "@/lib/pusher";

export class RedisChat {
  private baseUrl: string;
  private token: string;

  constructor() {
    this.baseUrl = process.env.UPSTASH_REDIS_REST_URL!;
    this.token = process.env.UPSTASH_REDIS_REST_TOKEN!;
  }

  async saveMessage(roomId: string, message: RedisChatMessage) {
    const key = `chat:room:${roomId}:messages`;

    try {
      // 메시지 저장
      await fetch(`${this.baseUrl}/lpush/${key}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      // 최근 100개 메시지만 유지
      await fetch(`${this.baseUrl}/ltrim/${key}/0/99`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
    } catch (error) {
      console.error("메시지 저장 중 오류:", error);
    }
  }

  async publishMessage(roomId: string, message: RedisChatMessage) {
    try {
      await fetch(`${this.baseUrl}/publish/chat:room:${roomId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      // Pusher로 메시지 발행
      await pusher.trigger(`chat_room_${roomId}`, "new-message", message);
    } catch (error) {
      console.error("메시지 발행 실패:", error);
    }
  }

  async getMessages(
    roomId: string,
    start = 0,
    end = -1,
  ): Promise<RedisChatMessage[]> {
    const key = `chat:room:${roomId}:messages`;

    try {
      const response = await fetch(
        `${this.baseUrl}/lrange/${key}/${start}/${end}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("메시지 조회 실패");
      }

      const data = await response.json();

      if (!Array.isArray(data.result)) {
        console.error("Unexpected response format:", data);
        return [];
      }

      // 메시지 배열을 뒤집어서 최신 메시지가 맨 아래에 오도록 함
      return data.result
        .reverse()
        .map((messageString: string) => {
          if (!messageString) return null;

          try {
            const message = JSON.parse(messageString);
            return message;
          } catch (error) {
            console.error("메시지 파싱 오류:", error, messageString);
            return null;
          }
        })
        .filter(
          (msg: RedisChatMessage | null): msg is RedisChatMessage =>
            msg !== null,
        );
    } catch (error) {
      console.error("메시지 조회 중 오류:", error);
      return [];
    }
  }
}

export const redisChat = new RedisChat();
