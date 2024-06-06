import { Depths } from "@fluentui/react";
import { Card, makeStyles } from "@fluentui/react-components";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import { useNavigate } from "react-router-dom";

import useMainStore from "../../stores/main";
import usePositionStore from "../../stores/position";
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
  const navigate = useNavigate();

  const { clickedInfo } = usePositionStore();
  const { selectedMarker } = useMainStore();
  const info = selectedMarker || clickedInfo;

  return (
    <>
      {info && (
        <CustomOverlayMap
          position={{ lat: info.lat, lng: info.lng }}
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
              <div style={{ fontSize: "20px" }}>
                {info.name ? info.name : info.address}
              </div>
              {info.name && (
                <div style={{ color: mainColor }}>{info.address}</div>
              )}
            </Card>
            {!("_id" in info) && (
              <Card
                className={styles.popupCards}
                style={{
                  backgroundColor: mainColor,
                  color: "white",
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate("/write");
                }}
              >
                등록
              </Card>
            )}
          </div>
        </CustomOverlayMap>
      )}
    </>
  );
}

export default KakaoMapPopup;
