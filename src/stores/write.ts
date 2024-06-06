import { create } from "zustand";

interface Write {
  selectedCategory: string | undefined;
  setSelectedCategory: (selected: string | undefined) => void;
  selectedSubcategory: string | undefined;
  setSelectedSubcategory: (selected: string | undefined) => void;
}

const useWriteStore = create<Write>((set) => ({
  selectedCategory: undefined,
  setSelectedCategory: (selected) => {
    set({ selectedCategory: selected });
  },
  selectedSubcategory: undefined,
  setSelectedSubcategory: (selected) => {
    set({ selectedSubcategory: selected });
  }
}));

export default useWriteStore;
