const geocoder = new kakao.maps.services.Geocoder();

interface Coord2AddressResult {
  address_name: string;
  building_name: string | null;
}

const getCoord2Address = async (latitude: number, longitude: number) => {
  return new Promise<Coord2AddressResult>((resolve, reject) => {
    geocoder.coord2Address(longitude, latitude, (result, status) => {
      if (status === "OK") {
        const res = result[0];
        console.log(result);
        if (res.road_address) {
          resolve({
            address_name: res.road_address.address_name,
            building_name: res.road_address.building_name
          });
        } else {
          resolve({
            address_name: res.address.address_name,
            building_name: null
          });
        }
      } else {
        reject(status);
      }
    });
  });
};

export type { Coord2AddressResult };
export { getCoord2Address };
