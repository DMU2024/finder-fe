import { Depths } from "@fluentui/react";
import { Button, Card, Switch, makeStyles } from "@fluentui/react-components";
import { LocationRegular } from "@fluentui/react-icons";
import { useEffect, useRef } from "react";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import { useNavigate, useSearchParams } from "react-router-dom";

import KakaoMapPopup from "./KakaoMapPopup";
import { getCoord2Address } from "../../apis/kakaoMap";
import { getMarkerByCoords } from "../../apis/marker";
import useGlobalStore from "../../stores/global";
import useMainStore from "../../stores/main";
import usePositionStore from "../../stores/position";
import { mainColor } from "../../styles/color";
import { contentMargin, headerHeight, headerMobileHeight, contentMobileMargin } from "../../styles/margin";

const useStyle = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: `calc(100vh - ${headerHeight} - ${contentMargin})`,
    gap: "15px",
    "@media (max-width: 390px)": {
      height: `calc(100vh - ${headerMobileHeight})`,
      padding: 0,
      zIndex: 0
    },
  },
  title: {
    display: "flex",
    alignItems: "flex-end",
    marginTop: "68px",
    marginLeft: "8px",
    "@media (max-width: 390px)": {
      display: "none",
    },
  },
  titleKor: {
    fontSize: "48px",
    lineHeight: "48px",
    fontWeight: "bold",
  },
  titleEng: {
    fontSize: "20px",
    lineHeight: "20px",
    fontWeight: "bold",
    color: mainColor,
  },
  titleInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginLeft: "auto",
    "@media (max-width: 390px)": {
      display: "none",
    },
  },
  position: {
    color: mainColor,
    fontSize: "14px",
    fontWeight: "bold",
  },
  map: {
    width: "100%",
    height: "100%",
    padding: 0,
    borderRadius: "20px",
    boxShadow: Depths.depth16,
    "@media (max-width: 390px)": {
      borderRadius: 0,
      boxShadow: "none",
      zIndex: 0
    },
  },
  control: {
    position: "absolute",
    top: "14px",
    right: "14px",
    zIndex: 1,
    "@media (max-width: 390px)": {
      top: "8px",
    },
  },
  cardMap: {
    width: "100%",
    height: "100%",
    "@media (max-width: 390px)": {
      height: `calc(100vh - ${headerMobileHeight})`,
    },
  }
});

interface Props {
  handleBookmark: (name: string) => void;
}

function KakaoMap({ handleBookmark }: Props) {
  const styles = useStyle();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    latitude,
    longitude,
    isLoading,
    zoomLevel,
    address,
    clickedInfo,
    setLatitude,
    setLongitude,
    setZoomLevel,
    getCoords,
    setClickedInfo
  } = usePositionStore();

  const mapRef = useRef<kakao.maps.Map>(null);

  const {
    markerList,
    setMarkerList,
    selectedMarker,
    setSelectedMarker,
    showLostGoods,
    setShowLostGoods
  } = useMainStore();

  const { bookmarkMap } = useGlobalStore();

  useEffect(() => {
    if (latitude !== 0 && longitude !== 0) {
      const bounds = mapRef.current?.getBounds();

      if (bounds) {
        const [sw, ne] = [bounds.getSouthWest(), bounds.getNorthEast()];
        const [swLat, swLng, neLat, neLng] = [
          sw.getLat(),
          sw.getLng(),
          ne.getLat(),
          ne.getLng()
        ];

        if (selectedMarker) {
          const { lat, lng } = selectedMarker;
          if (!bounds.contain(new kakao.maps.LatLng(lat, lng))) {
            setSelectedMarker(undefined);
          }
        }

        if (clickedInfo) {
          const { lat, lng } = clickedInfo;
          if (!bounds.contain(new kakao.maps.LatLng(lat, lng))) {
            setClickedInfo(undefined);
          }
        }

        getMarkerByCoords(swLat, swLng, neLat, neLng, showLostGoods).then(
          (data) => {
            setMarkerList(data);
          }
        );
      }
    }
  }, [latitude, longitude, zoomLevel, showLostGoods, mapRef.current]);

  useEffect(() => {
    const map = mapRef.current;

    if (selectedMarker) {
      if (map) {
        map.setLevel(3);
        setZoomLevel(map.getLevel());
      }
      setLatitude(selectedMarker.lat);
      setLongitude(selectedMarker.lng);
      setClickedInfo(undefined);
    }
  }, [selectedMarker]);

  useEffect(() => {
    const place = searchParams.get("place");

    if (place) {
      markerList.map((marker) => {
        if (marker._id === place) {
          setSelectedMarker(marker);
          navigate("/");
          return;
        }
      });
    }
  }, [markerList]);

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <div className={styles.titleKor}>지도</div>
        <div className={styles.titleEng}>MAP</div>
        <div className={styles.titleInfo}>
          <Switch
            checked={showLostGoods}
            label={"분실물 보기"}
            style={{ fontWeight: "bold" }}
            onChange={(_, { checked }) => {
              setMarkerList([]);
              setSelectedMarker(undefined);
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
          className={styles.cardMap}
          onClick={(_, event) => {
            const latLng = event.latLng;
            const [lat, lng] = [latLng.getLat(), latLng.getLng()];

            setSelectedMarker(undefined);
            if (showLostGoods) {
              getCoord2Address(lat, lng)
                .then(({ address_name, building_name }) =>
                  setClickedInfo({
                    address: address_name,
                    name: building_name,
                    lat: lat,
                    lng: lng
                  })
                )
                .catch((err) => {
                  if (err !== "ZERO_RESULT") {
                    console.error(err);
                  }
                });
            }
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
          {clickedInfo && (
            <MapMarker
              position={{ lat: clickedInfo.lat, lng: clickedInfo.lng }}
              onClick={() => setClickedInfo(undefined)}
            />
          )}
          <KakaoMapPopup
            handleBookmark={handleBookmark}
            isBookmarked={bookmarkMap.has(selectedMarker?.name ?? "")}
          />
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
