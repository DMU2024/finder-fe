import { create } from "zustand";

import { LostFound } from "../apis/lostfound";

interface Search {
  query: string | undefined;
  setQuery: (q: string | undefined) => void;
  items: LostFound[];
  setItems: (items: LostFound[]) => void;
  page: number;
  setPage: (page: number) => void;
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
  page: 0,
  setPage: (page) => {
    set({ page: page });
  }
}));

export default useSearchStore;
