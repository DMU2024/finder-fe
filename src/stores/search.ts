import { create } from "zustand";

import { LostFound } from "../apis/lostfound";
import { LostGoods } from "../apis/lostgoods";

interface Search {
  query: string | undefined;
  setQuery: (q: string | undefined) => void;
  items: LostFound[] | LostGoods[];
  setItems: (items: LostFound[] | LostGoods[]) => void;
  prevId: string | undefined;
  setPrevId: (id: string | undefined) => void;
  isLostGoods: boolean;
  setIsLostGoods: (value: boolean) => void;
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
  },
  isLostGoods: false,
  setIsLostGoods: (value) => {
    set({ isLostGoods: value });
  }
}));

export default useSearchStore;
