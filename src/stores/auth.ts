import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Auth {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  userId: number | undefined;
  setUserId: (value: number | undefined) => void;
}

const useAuthStore = create(
  persist<Auth>(
    (set) => ({
      isLoggedIn: false,
      setIsLoggedIn: (value) => {
        set({ isLoggedIn: value });
      },
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
export { useAuthStore };
