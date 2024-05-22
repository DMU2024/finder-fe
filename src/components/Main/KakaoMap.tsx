import { Depths } from "@fluentui/react";
import { Button, Card, makeStyles } from "@fluentui/react-components";
import { LocationRegular } from "@fluentui/react-icons";
import { useEffect, useRef, useState } from "react";
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  MarkerClusterer
} from "react-kakao-maps-sdk";

import { getCoord2Address } from "../../apis/coord2Address";
import { getItemsByCoords } from "../../apis/items";
import useItemListStore from "../../stores/itemList";
import usePositionStore from "../../stores/position";
import { mainColor } from "../../styles/color";
import { contentMargin, headerHeight } from "../../styles/margin";

const useStyle = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: `calc(100vh - ${headerHeight} - ${contentMargin})`,
    gap: "15px"
  },
  title: {
    display: "flex",
    alignItems: "baseline",
    marginTop: "68px",
    marginLeft: "8px"
  },
  titleKor: {
    fontSize: "48px",
    fontWeight: "bold"
  },
  titleEng: {
    fontSize: "20px",
    fontWeight: "bold",
    color: mainColor
  },
  position: {
    marginLeft: "auto",
    color: mainColor,
    fontSize: "14px",
    fontWeight: "bold"
  },
  map: {
    width: "100%",
    height: "100%",
    padding: 0,
    borderRadius: "20px",
    boxShadow: Depths.depth16
  },
  control: {
    position: "absolute",
    top: "14px",
    right: "14px",
    zIndex: 1
  },
  popup: {
    display: "flex",
    gap: "8px"
  },
  popupCards: {
    padding: "24px",
    justifyContent: "center",
    boxShadow: Depths.depth16,
    borderRadius: "20px"
  }
});

function KakaoMap() {
  const styles = useStyle();

  const {
    latitude,
    longitude,
    isLoading,
    zoomLevel,
    address,
    setLatitude,
    setLongitude,
    setZoomLevel,
    getCoords,
    getAddress
  } = usePositionStore();

  const [clickedPos, setClickedPos] = useState<{ lat: number; lng: number }>();
  const [clickedAddress, setClickedAddress] = useState<{
    address_name: string;
    building_name: string | null;
  }>();

  const mapRef = useRef<kakao.maps.Map>(null);

  const { itemList, setItemList } = useItemListStore();

  useEffect(() => {
    if (latitude == 0 || longitude == 0) {
      getCoords();
    }
  }, []);

  useEffect(() => {
    if (latitude != 0 && longitude != 0) {
      getAddress();
    }
  }, [latitude, longitude]);

  useEffect(() => {
    const bounds = mapRef.current?.getBounds();
    if (bounds) {
      const [sw, ne] = [bounds.getSouthWest(), bounds.getNorthEast()];
      getItemsByCoords(sw.getLat(), sw.getLng(), ne.getLat(), ne.getLng()).then(
        (data) => {
          setItemList(data);
        }
      );
    }
  }, [latitude, longitude, zoomLevel]);

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <div className={styles.titleKor}>지도</div>
        <div className={styles.titleEng}>MAP</div>
        <div className={styles.position}>
          <LocationRegular />
          {` ${isLoading ? "위치 불러오는 중" : address}`}
        </div>
      </div>
      <Card className={styles.map}>
        <Map
          ref={mapRef}
          center={{ lat: latitude, lng: longitude }}
          level={zoomLevel}
          style={{ width: "100%", height: "100%" }}
          onClick={(_, event) => {
            const latLng = event.latLng;
            const [lat, lng] = [latLng.getLat(), latLng.getLng()];

            setClickedPos({ lat: lat, lng: lng });
            setClickedAddress(undefined);
            getCoord2Address(lat, lng)
              .then(({ address_name, building_name }) =>
                setClickedAddress({
                  address_name: address_name,
                  building_name: building_name
                })
              )
              .catch((err) => setClickedAddress(err));
          }}
          onDragEnd={(map) => {
            const center = map.getCenter();

            setLatitude(center.getLat());
            setLongitude(center.getLng());
          }}
          onZoomChanged={(map) => {
            const center = map.getCenter();

            setLatitude(center.getLat());
            setLongitude(center.getLng());
            setZoomLevel(map.getLevel());
          }}
        >
          <MarkerClusterer averageCenter={true} minLevel={7}>
            {itemList?.map(({ lat, lng }, index) => (
              <MapMarker key={index} position={{ lat: lat, lng: lng }} />
            ))}
          </MarkerClusterer>
          {clickedPos && (
            <>
              <MapMarker
                position={clickedPos}
                onClick={() => setClickedPos(undefined)}
              />
              <CustomOverlayMap position={clickedPos} yAnchor={-0.2}>
                <div
                  className={styles.popup}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    kakao.maps.event.preventMap();
                  }}
                >
                  <Card
                    className={styles.popupCards}
                    style={{
                      backgroundColor: "white",
                      color: "black"
                    }}
                  >
                    {clickedAddress ? (
                      <>
                        <div style={{ fontSize: "20px" }}>
                          {clickedAddress.building_name
                            ? clickedAddress.building_name
                            : clickedAddress.address_name}
                        </div>
                        {clickedAddress.building_name && (
                          <div style={{ color: mainColor }}>
                            {clickedAddress.address_name}
                          </div>
                        )}
                      </>
                    ) : (
                      "불러오는 중"
                    )}
                  </Card>
                  <Card
                    className={styles.popupCards}
                    style={{
                      backgroundColor: mainColor,
                      color: "white"
                    }}
                  >
                    등록
                  </Card>
                </div>
              </CustomOverlayMap>
            </>
          )}
        </Map>
        <Button
          className={styles.control}
          disabled={isLoading}
          shape="circular"
          onClick={() => {
            getCoords();
          }}
        >
          현재 위치로
        </Button>
      </Card>
    </div>
  );
}

export default KakaoMap;
