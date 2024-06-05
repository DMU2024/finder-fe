import { Depths } from "@fluentui/react";
import { Button, Card, Switch, makeStyles } from "@fluentui/react-components";
import { LocationRegular } from "@fluentui/react-icons";
import { useEffect, useRef } from "react";
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  MarkerClusterer
} from "react-kakao-maps-sdk";

import { getMarkerByCoords } from "../../apis/marker";
import useMainStore from "../../stores/main";
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
    alignItems: "flex-end",
    marginTop: "68px",
    marginLeft: "8px"
  },
  titleKor: {
    fontSize: "48px",
    lineHeight: "48px",
    fontWeight: "bold"
  },
  titleEng: {
    fontSize: "20px",
    lineHeight: "20px",
    fontWeight: "bold",
    color: mainColor
  },
  titleInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginLeft: "auto"
  },
  position: {
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
    backgroundColor: mainColor,
    color: "white",
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
    getCoords
  } = usePositionStore();

  const mapRef = useRef<kakao.maps.Map>(null);

  const {
    markerList,
    setMarkerList,
    selectedMarker,
    setSelectedMarker,
    setPlaceItemList,
    showLostGoods,
    setShowLostGoods
  } = useMainStore();

  useEffect(() => {
    const bounds = mapRef.current?.getBounds();

    if (bounds) {
      const [sw, ne] = [bounds.getSouthWest(), bounds.getNorthEast()];

      getMarkerByCoords(
        sw.getLat(),
        sw.getLng(),
        ne.getLat(),
        ne.getLng(),
        showLostGoods
      ).then((data) => {
        setMarkerList(data);
      });
    }
  }, [latitude, longitude, zoomLevel, showLostGoods]);

  useEffect(() => {
    const map = mapRef.current;

    if (selectedMarker) {
      if (map) {
        map.setLevel(3);
        setZoomLevel(map.getLevel());
      }
      setLatitude(selectedMarker.lat);
      setLongitude(selectedMarker.lng);
    }
  }, [selectedMarker]);

  const renderPopup = () => {
    if (selectedMarker) {
      return (
        <>
          <CustomOverlayMap
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            yAnchor={-0.2}
          >
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
                <div style={{ fontSize: "20px" }}>{selectedMarker.name}</div>
                <div style={{ color: mainColor }}>{selectedMarker.address}</div>
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
      );
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <div className={styles.titleKor}>지도</div>
        <div className={styles.titleEng}>MAP</div>
        <div className={styles.titleInfo}>
          <Switch
            label={"분실물 보기"}
            style={{ fontWeight: "bold" }}
            onChange={(_, { checked }) => {
              setMarkerList([]);
              setSelectedMarker(undefined);
              setPlaceItemList([]);
              setShowLostGoods(checked);
            }}
          />
          <div className={styles.position}>
            <LocationRegular />
            {` ${isLoading ? "위치 불러오는 중" : address}`}
          </div>
        </div>
      </div>
      <Card className={styles.map}>
        <Map
          ref={mapRef}
          center={{ lat: latitude, lng: longitude }}
          level={zoomLevel}
          style={{ width: "100%", height: "100%" }}
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
            {markerList?.map((marker) => (
              <MapMarker
                key={marker._id}
                clickable={true}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => {
                  if (marker._id !== selectedMarker?._id) {
                    setSelectedMarker(marker);
                  } else {
                    setSelectedMarker(undefined);
                  }
                }}
              />
            ))}
          </MarkerClusterer>
          {renderPopup()}
        </Map>
        <Button
          className={styles.control}
          disabled={isLoading}
          shape="circular"
          onClick={() => {
            setSelectedMarker(undefined);
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
