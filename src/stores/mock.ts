import { create } from "zustand";

import { Mock } from "../apis/mock";

interface MockList {
  mockList: Mock[];
  setMockList: (items: Mock[]) => void;
}

const useMockListStore = create<MockList>((set) => ({
  mockList: [],
  setMockList: (items) => {
    set({ mockList: items });
  }
}));

export type { MockList };
export default useMockListStore;
