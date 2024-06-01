import { Instance } from "../utils/axios";

interface Mock {
  name: string;
  date: string;
  address: string;
  category: string;
  info: string;
  lat: number;
  lng: number;
}

const getMockByCoords = async (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
  isLostGoods: boolean
) => {
  const endpoint = isLostGoods ? "/mock" : "/place";

  const { data } = await Instance.get<Mock[]>(endpoint, {
    params: {
      lat_gte: lat1,
      lng_gte: lng1,
      lat_lte: lat2,
      lng_lte: lng2
    }
  });

  return data;
};

const postMock = async (mock: Mock) => {
  const { data } = await Instance.post<Mock>("/mock", {
    ...mock
  });

  return data;
};

export type { Mock };
export { getMockByCoords, postMock };
