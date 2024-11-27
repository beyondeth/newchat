import kyInstance from "@/lib/ky";
import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { useSession } from "../SessionProvider";

export default function useInitializeChatClient() {
  const { user } = useSession();
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);

  useEffect(() => {
    if (!user) return; // user가 없으면 early return
    const client = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_KEY!);

    client
      .connectUser(
        {
          id: user!.id,
          username: user!.username,
          name: user!.displayName,
          image: user!.avatarUrl,
        },
        async () =>
          kyInstance
            .get("/api/get-token")
            .json<{ token: string }>()
            .then((data) => data.token),
      )
      .catch((error) => console.error("Failed to connect user", error))
      .then(() => setChatClient(client));

    return () => {
      setChatClient(null);
      client
        .disconnectUser()
        .catch((error) => console.error("Failed to disconnect user", error))
        .then(() => console.log("Connection closed"));
    };
  }, [user]);
  // }, [user.id, user.username, user.displayName, user.avatarUrl]);

  return chatClient;
}
