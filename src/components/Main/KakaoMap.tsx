import { AxiosError } from "axios";
import { useEffect, useRef } from "react";
import { Map } from "react-kakao-maps-sdk";

import { getCoord2Region } from "../../apis/coord2region";
import { getAddressRequest } from "../../apis/searchAddress";
import usePositionStore from "../../stores/position";

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
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          mapRef.current?.setLevel(3);
        },
        (err: GeolocationPositionError) => alert(err.message),
        { enableHighAccuracy: true, timeout: 10 }
      );
    } else {
      alert("Geolocation을 사용할 수 없는 환경입니다.");
    }
  };

  useEffect(() => {
    getPosition();
  }, []);

  useEffect(() => {
    getCoord2Region(latitude, longitude)
      .then((data) => setAddress(data.documents[0].address_name))
      .catch((e: AxiosError) => console.error(e));
  }, [latitude, longitude]);

  return (
    <>
      <input value={address} onChange={(e) => setAddress(e.target.value)} />
      <button onClick={() => getAddress()}>검색</button>
      <button onClick={() => getPosition()}>현재 위치로</button>
      <Map
        ref={mapRef}
        center={{ lat: latitude, lng: longitude }}
        isPanto={true}
        level={3}
        style={{ width: "100vw", height: "100vh" }}
        onDragEnd={(map) => {
          const center = map.getCenter();

          setLatitude(center.getLat());
          setLongitude(center.getLng());
        }}
      />
    </>
  );
}

export default KakaoMap;
