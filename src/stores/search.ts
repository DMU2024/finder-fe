import { create } from "zustand";

import { LostFound } from "../apis/lostfound";

interface Search {
  query: string | undefined;
  setQuery: (q: string | undefined) => void;
  items: LostFound[];
  setItems: (items: LostFound[]) => void;
  prevId: string | undefined;
  setPrevId: (id: string | undefined) => void;
}

const useSearchStore = create<Search>((set) => ({
  query: undefined,
  setQuery: (q) => {
    set({ query: q });
  },
  items: [],
  setItems: (items) => {
    set({ items: items });
  },
  prevId: undefined,
  setPrevId: (id) => {
    set({ prevId: id });
  }
}));

export default useSearchStore;
