import { create } from "zustand";

import { LostFound } from "../apis/lostfound";
import { Marker } from "../apis/marker";

interface Main {
  markerList: Marker[];
  setMarkerList: (items: Marker[]) => void;
  selectedMarker: Marker | undefined;
  setSelectedMarker: (marker: Marker | undefined) => void;
  placeItemList: LostFound[];
  setPlaceItemList: (items: LostFound[]) => void;
  showLostGoods: boolean;
  setShowLostGoods: (value: boolean) => void;
  page: number;
  setPage: (page: number) => void;
  scrollTop: number;
  setScrollTop: (pos: number) => void;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

const useMainStore = create<Main>((set) => ({
  markerList: [],
  setMarkerList: (items) => {
    set({ markerList: items });
  },
  selectedMarker: undefined,
  setSelectedMarker: (marker) => {
    set({ selectedMarker: marker });
  },
  placeItemList: [],
  setPlaceItemList: (items) => {
    set({ placeItemList: items });
  },
  showLostGoods: false,
  setShowLostGoods: (value) => {
    set({ showLostGoods: value });
  },
  page: 0,
  setPage: (page) => {
    set({ page: page });
  },
  scrollTop: 0,
  setScrollTop: (pos) => {
    set({ scrollTop: pos });
  },
  isModalOpen: false,
  setIsModalOpen: (value) => {
    set({ isModalOpen: value });
  }
}));

export type { Main };
export default useMainStore;
