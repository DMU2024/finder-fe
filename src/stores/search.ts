import { create } from "zustand";

import { LostFound } from "../apis/lostfound";

interface Search {
  query: string;
  setQuery: (q: string) => void;
  items: LostFound[];
  setItems: (items: LostFound[]) => void;
  page: number;
  setPage: (page: number) => void;
  scrollTop: number;
  setScrollTop: (pos: number) => void;
}

const useSearchStore = create<Search>((set) => ({
  query: "",
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
  },
  scrollTop: 0,
  setScrollTop: (pos) => {
    set({ scrollTop: pos });
  }
}));

export default useSearchStore;
