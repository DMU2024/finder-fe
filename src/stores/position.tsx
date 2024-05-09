import { create } from "zustand";

interface User {
  latitude: number;
  setLatitude: (latitude: number) => void;
  longitude: number;
  setLongitude: (longitude: number) => void;
}

const usePositionStore = create<User>((set) => ({
  latitude: 37.564214,
  setLatitude: (lat: number) => set({ latitude: lat }),
  longitude: 127.001699,
  setLongitude: (lng: number) => set({ longitude: lng })
}));

export default usePositionStore;
