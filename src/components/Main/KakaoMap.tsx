import { AxiosError } from "axios";
import { useEffect, useRef } from "react";
import { Map } from "react-kakao-maps-sdk";

import { getCoord2Region } from "../../apis/coord2region";
import { getAddressRequest } from "../../apis/searchAddress";
import usePositionStore from "../../stores/position";

const DEFAULT_LATITUDE = 37.564214;
const DEFAULT_LONGITUDE = 127.001699;
const DEFAULT_LEVEL = 3;

function KakaoMap() {
  const {
    latitude,
    longitude,
    address,
    setLatitude,
    setLongitude,
    setAddress
  } = usePositionStore();
  const mapRef = useRef<kakao.maps.Map>(null);

  const getAddress = () => {
    getAddressRequest(address)
      .then((data) => {
        const doc = data.documents[0];

        setLatitude(Number(doc.y));
        setLongitude(Number(doc.x));
        setAddress(doc.address_name);
      })
      .catch((e: AxiosError) => console.error(e));
  };

  const getPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setPosition(position.coords.latitude, position.coords.longitude);
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
          setPosition(DEFAULT_LATITUDE, DEFAULT_LONGITUDE);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      alert("Geolocation을 사용할 수 없는 환경입니다.");
    }
  };

  const setPosition = (latitude: number, longitude: number) => {
    setLatitude(latitude);
    setLongitude(longitude);
    mapRef.current?.setLevel(DEFAULT_LEVEL);
  };

  useEffect(() => {
    if (latitude == 0 || longitude == 0) {
      getPosition();
    }
  }, []);

  useEffect(() => {
    getCoord2Region(latitude, longitude)
      .then((data) => setAddress(data.documents[0].address_name))
      .catch((e: AxiosError) => console.error(e));
  }, [latitude, longitude]);

  return (
    <div>
      <input value={address} onChange={(e) => setAddress(e.target.value)} />
      <button onClick={() => getAddress()}>검색</button>
      <button onClick={() => getPosition()}>현재 위치로</button>
      <Map
        ref={mapRef}
        center={{ lat: latitude, lng: longitude }}
        isPanto={true}
        level={DEFAULT_LEVEL}
        style={{ width: "500px", height: "500px" }}
        onDragEnd={(map) => {
          const center = map.getCenter();

          setLatitude(center.getLat());
          setLongitude(center.getLng());
        }}
      />
    </div>
  );
}

export default KakaoMap;
