import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Auth {
  userId: number | undefined;
  setUserId: (value: number | undefined) => void;
}

const useAuthStore = create(
  persist<Auth>(
    (set) => ({
      userId: undefined,
      setUserId: (value) => {
        set({ userId: value });
      }
    }),
    {
      name: "auth"
    }
  )
);

export type { Auth };
export default useAuthStore;
