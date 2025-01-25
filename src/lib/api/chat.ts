export interface SendMessageParams {
  content: string;
  type: string;
  chatRoomId: string;
}

export async function leaveChatRoom(roomId: string) {
  const response = await fetch(`/api/chat/rooms/${roomId}/leave`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to leave chat room");
  }

  return response.json();
}

export async function sendMessage(roomId: string, params: SendMessageParams) {
  const response = await fetch(`/api/chat/rooms/${roomId}/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  return response.json();
}

export async function blockUser(blockedId: string) {
  const response = await fetch("/api/chat/block", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ blockedId }),
  });

  if (!response.ok) {
    throw new Error("Failed to block user");
  }

  return response.json();
}

export async function unblockUser(blockedId: string) {
  const response = await fetch("/api/chat/unblock", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ blockedId }),
  });

  if (!response.ok) {
    throw new Error("Failed to unblock user");
  }

  return response.json();
}

export async function getMessages(roomId: string, limit = 20) {
  const response = await fetch(
    `/api/chat/rooms/${roomId}/messages?limit=${limit}`,
  );

  if (!response.ok) {
    throw new Error("Failed to load messages");
  }

  return response.json();
}
