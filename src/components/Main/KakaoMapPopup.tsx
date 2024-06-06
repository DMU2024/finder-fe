import { Depths } from "@fluentui/react";
import { Card, makeStyles } from "@fluentui/react-components";
import { CustomOverlayMap } from "react-kakao-maps-sdk";

import useMainStore from "../../stores/main";
import { mainColor } from "../../styles/color";

const useStyles = makeStyles({
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

function KakaoMapPopup() {
  const styles = useStyles();
  const { selectedMarker } = useMainStore();

  return (
    <>
      {selectedMarker && (
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
      )}
    </>
  );
}

export default KakaoMapPopup;
