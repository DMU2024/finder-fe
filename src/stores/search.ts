import { create } from "zustand";

import { LostFound, LostFoundQuery } from "../apis/lostfound";

interface Search {
  query: LostFoundQuery | undefined;
  setQuery: (query: LostFoundQuery | undefined) => void;
  items: LostFound[];
  setItems: (items: LostFound[]) => void;
  page: number;
  setPage: (page: number) => void;
  scrollTop: number;
  setScrollTop: (pos: number) => void;
  isFilterEnabled: boolean;
  setIsFilterEnabled: (value: boolean) => void;
}

const useSearchStore = create<Search>((set) => ({
  query: undefined,
  setQuery: (query) => {
    set({ query: query });
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
  },
  isFilterEnabled: false,
  setIsFilterEnabled: (value) => {
    set({ isFilterEnabled: value });
  }
}));

export default useSearchStore;
