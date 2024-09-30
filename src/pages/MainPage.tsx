import { useState, useRef } from "react";
import { makeStyles, shorthands } from "@fluentui/react-components";
import ItemList from "../components/Main/ItemList";
import KakaoMap from "../components/Main/KakaoMap";
import MarkerList from "../components/Main/MarkerList";
import Notificiation from "../components/Main/Notification";
import useMainStore from "../stores/main";

const useStyles = makeStyles({
  root: {
    flex: 1,
    position: "relative",
    ...shorthands.padding("16px"),
    "@media (max-width: 390px)": {
      padding: 0,
    },
  },
  content: {
    display: "flex",
    gap: "32px",
    "@media (max-width: 390px)": {
      display: "block",
    },
  },
  left: {
    width: "40%",
    "@media (max-width: 390px)": {
      display: "none",
    },
  },
  right: {
    width: "60%",
    "@media (max-width: 390px)": {
      width: "100%",
      height: "100vh",
      position: "relative",
    },
  },
  modalTrigger: {
    position: "fixed",
    bottom: "16px",
    left: "50%",
    transform: "translateX(-50%)",
    textAlign: "center",
    padding: "8px 16px",
    backgroundColor: "#fff",
    cursor: "pointer",
    zIndex: 0,
    borderRadius: "4px",
    boxShadow: "0 -4px 12px rgba(0, 0, 0, 0.1)",
    "@media (min-width: 391px)": {
      display: "none",
    },
  },
  contentContainer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "80vh",
    backgroundColor: "#fff",
    zIndex: 1,
    overflowY: "auto",
    transform: "translateY(100%)",
    transition: "transform 0.3s ease",
  },
  contentVisible: {
    transform: "translateY(0)",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
    fontSize: "18px",
    color: "#333",
  },
});

function MainPage() {
  const styles = useStyles();
  const { selectedMarker } = useMainStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.root}>
      <Notificiation />
      <div className={styles.content}>
        <div className={styles.left}>
          {selectedMarker ? <ItemList /> : <MarkerList />}
        </div>
        <div className={styles.right}>
          <KakaoMap />
        </div>
      </div>

      <div
        className={styles.modalTrigger}
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        {selectedMarker ? "Item 목록 보기" : "Marker 목록 보기"}
      </div>

      <div
        className={`${styles.contentContainer} ${isModalOpen ? styles.contentVisible : ""}`}
      >
        <div style={{ padding: "16px", position: "relative" }}>
          <div
            className={styles.closeButton}
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(false);
            }}
          >
            X
          </div>
          {selectedMarker ? <ItemList /> : <MarkerList />}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
