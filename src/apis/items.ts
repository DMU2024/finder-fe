import { Instance } from "../utils/axios";

interface Item {
  lat: number;
  lng: number;
  category: string;
}

const getItemsByCoords = async (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) => {
  const { data } = await Instance.get<Item[]>("/items", {
    params: {
      lat_gte: lat1,
      lng_gte: lng1,
      lat_lte: lat2,
      lng_lte: lng2
    }
  });

  return data;
};

export type { Item };
export { getItemsByCoords };
