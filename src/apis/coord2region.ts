import { KakaoInstance } from "../utils/axios";

interface Coord2RegionResponse {
  meta: object;
  documents: Document[];
}

interface Document {
  region_type: string;
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  region_4depth_name: string;
  code: string;
  x: number;
  y: number;
}

const getCoord2Region = async (
  latitude: number,
  longitude: number,
  input_coord?: string,
  output_coord?: string
) => {
  const { data } = await KakaoInstance.get<Coord2RegionResponse>(
    "/geo/coord2regioncode",
    {
      params: {
        x: `${longitude}`,
        y: `${latitude}`,
        input_coord: input_coord,
        output_coord: output_coord
      }
    }
  );

  return data;
};

export { getCoord2Region };
