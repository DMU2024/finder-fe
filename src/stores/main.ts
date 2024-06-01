import { create } from "zustand";

import { LostFound } from "../apis/lostfound";
import { Mock } from "../apis/mock";

interface Main {
  mockList: Mock[];
  setMockList: (items: Mock[]) => void;
  selectedPlace: Mock | undefined;
  setSelectedPlace: (mock: Mock | undefined) => void;
  placeItemList: LostFound[];
  setPlaceItemList: (items: LostFound[]) => void;
  showLostGoods: boolean;
  setShowLostGoods: (value: boolean) => void;
}

const useMainStore = create<Main>((set) => ({
  mockList: [],
  setMockList: (items) => {
    set({ mockList: items });
  },
  selectedPlace: undefined,
  setSelectedPlace: (mock) => {
    set({ selectedPlace: mock });
  },
  placeItemList: [],
  setPlaceItemList: (items) => {
    set({ placeItemList: items });
  },
  showLostGoods: false,
  setShowLostGoods: (value) => {
    set({ showLostGoods: value });
  }
}));

export type { Main };
export default useMainStore;
