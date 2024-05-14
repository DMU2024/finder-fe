import { create } from "zustand";

interface Option {
  isDarkTheme: boolean;
  setIsDarkTheme: () => void;
}

const useOptionStore = create<Option>((set) => ({
  isDarkTheme: false,
  setIsDarkTheme: () => set((state) => ({ isDarkTheme: !state.isDarkTheme }))
}));

export default useOptionStore;
