import { Instance } from "../utils/axios";

interface Chat {
  sender: number;
  message: string;
  messageDate: string;
  messageTime: string;
}

const getMessages = async (userId1: number, userId2: number) => {
  const roomId = [userId1, userId2].sort().join("_");
  const { data } = await Instance.get<Chat[]>("api/chat/messages", {
    params: {
      roomId: roomId
    }
  });

  return data;
};

export type { Chat };
export { getMessages };
