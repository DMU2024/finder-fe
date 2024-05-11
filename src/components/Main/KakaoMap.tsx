import { Button, Card, makeStyles } from "@fluentui/react-components";
import { LocationRegular } from "@fluentui/react-icons";
import { AxiosError } from "axios";
import { useEffect, useRef } from "react";
import { Map } from "react-kakao-maps-sdk";

import { getCoord2Region } from "../../apis/coord2region";
import { getAddressRequest } from "../../apis/searchAddress";
import usePositionStore from "../../stores/position";
import { contentMargin, headerHeight } from "../../styles/margin";

const useStyle = makeStyles({
  root: {
    height: `calc(100vh - ${headerHeight} - ${contentMargin} - 72px)`
  },
  title: {
    display: "flex"
  },
  position: {
    marginLeft: "auto"
  },
  map: {
    width: "100%",
    height: "100%",
    padding: 0,
    borderRadius: "24px"
  },
  control: {
    position: "absolute",
    top: "14px",
    right: "14px",
    zIndex: 1
  }
});

const DEFAULT_LATITUDE = 37.564214;
const DEFAULT_LONGITUDE = 127.001699;
const DEFAULT_LEVEL = 3;

function KakaoMap() {
  const styles = useStyle();

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
      .catch((e: AxiosError) => setAddress("알 수 없는 위치"));
  }, [latitude, longitude]);

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <h1>지도</h1>
        <h3>MAP</h3>
        <h5 className={styles.position}>
          <LocationRegular />
          {address}
        </h5>
      </div>
      <Card className={styles.map}>
        <Map
          ref={mapRef}
          center={{ lat: latitude, lng: longitude }}
          isPanto={true}
          level={DEFAULT_LEVEL}
          style={{ width: "100%", height: "100%" }}
          onDragEnd={(map) => {
            const center = map.getCenter();

            setLatitude(center.getLat());
            setLongitude(center.getLng());
          }}
        />
        <Button
          className={styles.control}
          shape="circular"
          onClick={() => getPosition()}
        >
          현재 위치로
        </Button>
      </Card>
    </div>
  );
}

export default KakaoMap;
