import { create } from "zustand";

import { ChatHistory } from "../apis/chat";

interface Chat {
  recipient: ChatHistory | undefined;
  setRecipient: (value: ChatHistory | undefined) => void;
}

const useChatStore = create<Chat>((set) => ({
  recipient: undefined,
  setRecipient: (value) => {
    set({ recipient: value });
  }
}));

export type { Chat };
export default useChatStore;
