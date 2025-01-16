import { Instance } from "@/utils/axios";

interface Marker {
  _id: string;
  name: string;
  date: string;
  address: string;
  category: string;
  info: string;
  lat: number;
  lng: number;
  userId?: number;
}

const getMarkerByCoords = async (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
  isLostGoods: boolean
) => {
  const endpoint = isLostGoods ? "/api/lostgoods" : "/api/place";

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
  const { data } = await Instance.post<Marker>("/api/lostgoods", {
    ...mock
  });

  return data;
};

export type { Marker };
export { getMarkerByCoords, postMarker };
