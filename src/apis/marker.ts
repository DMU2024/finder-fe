import { Instance } from "../utils/axios";

interface Marker {
  name: string;
  date: string;
  address: string;
  category: string;
  info: string;
  lat: number;
  lng: number;
}

const getMarkerByCoords = async (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
  isLostGoods: boolean
) => {
  const endpoint = isLostGoods ? "/mock" : "/place";

  const { data } = await Instance.get<Marker[]>(endpoint, {
    params: {
      lat_gte: lat1,
      lng_gte: lng1,
      lat_lte: lat2,
      lng_lte: lng2
    }
  });

  return data;
};

const postMarker = async (mock: Marker) => {
  const { data } = await Instance.post<Marker>("/mock", {
    ...mock
  });

  return data;
};

export type { Marker };
export { getMarkerByCoords, postMarker };
