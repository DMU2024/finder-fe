import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Option {
  isDarkTheme: boolean;
  setIsDarkTheme: (value: boolean) => void;
}

const useOptionStore = create(
  persist<Option>(
    (set) => ({
      isDarkTheme: false,
      setIsDarkTheme: (value) => set({ isDarkTheme: value })
    }),
    {
      name: "option",
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export default useOptionStore;
