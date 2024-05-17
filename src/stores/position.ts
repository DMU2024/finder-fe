import { create } from "zustand";

import { getCoord2Region } from "../apis/coord2region";

interface Position {
  latitude: number;
  setLatitude: (latitude: number) => void;
  longitude: number;
  setLongitude: (longitude: number) => void;
  getCoords: () => void;
  address: string;
  setAddress: (address: string) => void;
  getAddress: () => void;
}

const DEFAULT_LATITUDE = 37.564214;
const DEFAULT_LONGITUDE = 127.001699;

const usePositionStore = create<Position>((set, get) => ({
  latitude: 0,
  setLatitude: (lat: number) => set({ latitude: lat }),
  longitude: 0,
  setLongitude: (lng: number) => set({ longitude: lng }),
  getCoords: () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          set({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (err: GeolocationPositionError) => {
          switch (err.code) {
            case GeolocationPositionError.PERMISSION_DENIED:
              alert("위치 권한을 허용해주세요.");
              break;
            case GeolocationPositionError.POSITION_UNAVAILABLE:
              alert("이용 불가능한 위치입니다.");
              break;
            case GeolocationPositionError.TIMEOUT:
              console.error("연결시간 초과");
              break;
          }
          set({ latitude: DEFAULT_LATITUDE, longitude: DEFAULT_LONGITUDE });
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      alert("Geolocation을 사용할 수 없는 환경입니다.");
    }
  },
  address: "",
  setAddress: (addr: string) => set({ address: addr }),
  getAddress: () => {
    const { latitude, longitude } = get();
    getCoord2Region(latitude, longitude)
      .then((res) => set({ address: res.documents[0].address_name }))
      .catch(() => set({ address: "알 수 없는 위치" }));
  }
}));

export default usePositionStore;
