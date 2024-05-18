import { Instance } from "../utils/axios";

interface Marker {
  lat: number;
  lng: number;
}

const getMarkers = async () => {
  const { data } = await Instance.get<Marker[]>("/marker");

  return data;
};

export type { Marker };
export { getMarkers };
