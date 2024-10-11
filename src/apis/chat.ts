import { Instance } from "../utils/axios";

interface ChatHistory {
  userId: number;
  username: string;
  profileImage: string;
  thumbnailImage: string;
  message: string;
  messageDate: string;
}

interface Chat {
  sender: number;
  message: string;
  messageDate: string;
  messageTime: string;
}

const getChatHistories = async (userId: number) => {
  const { data } = await Instance.get<ChatHistory[]>("/api/chat/histories", {
    params: { userId: userId }
  });

  return data;
};

const getMessages = async (userId1: number, userId2: number) => {
  const roomId = [userId1, userId2].sort().join("_");
  const { data } = await Instance.get<Chat[]>("/api/chat/messages", {
    params: {
      roomId: roomId
    }
  });

  return data;
};

export type { ChatHistory, Chat };
export { getChatHistories, getMessages };
