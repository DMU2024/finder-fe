import { create } from "zustand";

import { Item } from "../apis/items";

interface ItemList {
  itemList: Item[];
  setItemList: (items: Item[]) => void;
}

const useItemListStore = create<ItemList>((set) => ({
  itemList: [],
  setItemList: (items) => {
    set({ itemList: items });
  }
}));

export type { Item, ItemList };
export default useItemListStore;
