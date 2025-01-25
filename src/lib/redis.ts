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
      console.log("[Redis] 메시지 저장 시작:", {
        roomId,
        messageId: message.id,
      });
      // 1. Redis에 저장
      await fetch(`${this.baseUrl}/lpush/${key}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
      console.log("[Redis] 메시지 저장 완료");

      // 2. 최근 100개 메시지만 유지
      await fetch(`${this.baseUrl}/ltrim/${key}/0/99`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      // 3. 저장 후 Pusher로 실시간 전송
      console.log("[Redis] Pusher 이벤트 발생 시작");
      await pusher.trigger(`chat_room_${roomId}`, "new-message", message);
      console.log("[Redis] Pusher 이벤트 발생 완료");
    } catch (error) {
      console.error("메시지 저장 중 오류:", error);
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

  async deleteRoomMessages(roomId: string) {
    const key = `chat:room:${roomId}:messages`;
    try {
      await fetch(`${this.baseUrl}/del/${key}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
    } catch (error) {
      console.error("Failed to delete room messages:", error);
    }
  }
}

export const redisChat = new RedisChat();
