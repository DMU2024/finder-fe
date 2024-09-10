import { create } from "zustand";

import { User } from "../apis/user";

interface Chat {
  recipient: User | undefined;
  setRecipient: (value: User | undefined) => void;
}

const useChatStore = create<Chat>((set) => ({
  recipient: undefined,
  setRecipient: (value) => {
    set({ recipient: value });
  }
}));

export type { Chat };
export default useChatStore;
