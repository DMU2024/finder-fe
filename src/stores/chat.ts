import { create } from "zustand";

interface Chat {
  recipientId: number | undefined;
  setRecipientId: (value: number | undefined) => void;
}

const useChatStore = create<Chat>((set) => ({
  recipientId: undefined,
  setRecipientId: (value) => {
    set({ recipientId: value });
  }
}));

export type { Chat };
export default useChatStore;
