import { create } from "zustand";

import { BookMark } from "@/apis/bookmark";

interface Global {
  bookmarkMap: Map<string, BookMark>;
  setBookmarkMap: (bookmarks: Map<string, BookMark>) => void;
}

const useGlobalStore = create<Global>((set) => ({
  bookmarkMap: new Map(),
  setBookmarkMap: (bookmarks) => {
    set({ bookmarkMap: bookmarks });
  }
}));

export type { Global };
export default useGlobalStore;
