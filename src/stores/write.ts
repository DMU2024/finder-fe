import { create } from "zustand";

interface Write {
  selectedCategory: string | undefined;
  setSelectedCategory: (selected: string | undefined) => void;
  selectedSubcategory: string | undefined;
  setSelectedSubcategory: (selected: string | undefined) => void;
  lostName: string;
  setLostName: (name: string) => void;
  lostDate: Date | undefined;
  setLostDate: (date: Date | undefined) => void;
  lostPlace: string;
  setLostPlace: (place: string) => void;
  lostLat: number;
  setLostLat: (lat: number) => void;
  lostLng: number;
  setLostLng: (lng: number) => void;
  lostInfo: string;
  setLostInfo: (info: string) => void;
}

const useWriteStore = create<Write>((set) => ({
  selectedCategory: undefined,
  setSelectedCategory: (selected) => {
    set({ selectedCategory: selected });
  },
  selectedSubcategory: undefined,
  setSelectedSubcategory: (selected) => {
    set({ selectedSubcategory: selected });
  },
  lostName: "",
  setLostName: (name) => {
    set({ lostName: name });
  },
  lostDate: undefined,
  setLostDate: (date) => {
    set({ lostDate: date });
  },
  lostPlace: "",
  setLostPlace: (place) => {
    set({ lostPlace: place });
  },
  lostLat: 0,
  setLostLat: (lat) => {
    set({ lostLat: lat });
  },
  lostLng: 0,
  setLostLng: (lng) => {
    set({ lostLng: lng });
  },
  lostInfo: "",
  setLostInfo: (info) => {
    set({ lostInfo: info });
  }
}));

export default useWriteStore;
