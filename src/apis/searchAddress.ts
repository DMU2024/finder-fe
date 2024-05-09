import { KakaoInstance } from "../utils/axios";

interface SearchAddressResponse {
  meta: object;
  documents: Document[];
}

interface Document {
  address_name: string;
  address_type: string;
  x: string;
  y: string;
  address: Address;
  road_address: RoadAddress;
}

interface Address {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  region_3depth_h_name: string;
  h_code: string;
  b_code: string;
  mountain_yn: string;
  main_address_no: string;
  sub_address_no: string;
  x: string;
  y: string;
}

interface RoadAddress {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  road_name: string;
  underground_yn: string;
  main_building_no: string;
  sub_building_no: string;
  building_name: string;
  zone_no: string;
  x: string;
  y: string;
}

const getAddressRequest = async (
  query: string,
  analyze_type?: string,
  page?: number,
  size?: number
) => {
  const { data } = await KakaoInstance.get<SearchAddressResponse>(
    "/search/address",
    {
      params: {
        query: query,
        analyze_type: analyze_type,
        page: page,
        size: size
      }
    }
  );

  return data;
};

export { getAddressRequest };
