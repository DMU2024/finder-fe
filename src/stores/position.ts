import { create } from "zustand";

interface Position {
  latitude: number;
  setLatitude: (latitude: number) => void;
  longitude: number;
  setLongitude: (longitude: number) => void;
  isLoading: boolean;
  getCoords: () => void;
  zoomLevel: number;
  setZoomLevel: (zoomLevel: number) => void;
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
  isLoading: false,
  getCoords: () => {
    set({ isLoading: true });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          set({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            isLoading: false
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
          set({
            latitude: DEFAULT_LATITUDE,
            longitude: DEFAULT_LONGITUDE,
            isLoading: false
          });
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      alert("Geolocation을 사용할 수 없는 환경입니다.");
    }
  },
  zoomLevel: 3,
  setZoomLevel: (level: number) => set({ zoomLevel: level }),
  address: "",
  setAddress: (addr: string) => set({ address: addr }),
  getAddress: () => {
    const { latitude, longitude } = get();
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.coord2RegionCode(longitude, latitude, (res, status) => {
      if (status == "OK") {
        set({ address: res[0].address_name });
      } else {
        set({ address: "알 수 없는 위치" });
      }
    });
  }
}));

export default usePositionStore;
