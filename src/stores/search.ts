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
  isFilterEnabled: boolean;
  setIsFilterEnabled: (value: boolean) => void;
  filterColor: string;
  setFilterColor: (color: string) => void;
  filterCategory: string;
  setFilterCategory: (category: string) => void;
  filterStartDate: Date | undefined;
  setFilterStartDate: (date: Date | undefined) => void;
  filterEndDate: Date | undefined;
  setFilterEndDate: (date: Date | undefined) => void;
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
  },
  isFilterEnabled: false,
  setIsFilterEnabled: (value) => {
    set({ isFilterEnabled: value });
  },
  filterColor: "",
  setFilterColor: (color) => {
    set({ filterColor: color });
  },
  filterCategory: "",
  setFilterCategory: (category) => {
    set({ filterCategory: category });
  },
  filterStartDate: undefined,
  setFilterStartDate: (date) => {
    set({ filterStartDate: date });
  },
  filterEndDate: undefined,
  setFilterEndDate: (date) => {
    set({ filterEndDate: date });
  }
}));

export default useSearchStore;
