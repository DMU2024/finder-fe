import { useEffect, useRef } from "react";
import { Map } from "react-kakao-maps-sdk";

import usePositionStore from "../../stores/position";

function KakaoMap() {
  const { latitude, longitude, setLatitude, setLongitude } = usePositionStore();
  const mapRef = useRef<kakao.maps.Map>(null);

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

  return (
    <>
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
