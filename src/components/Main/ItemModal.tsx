import { makeStyles, tokens } from "@fluentui/react-components";
import { useState } from "react";

import ItemList from "@/components/Main/ItemList";
import MarkerList from "@/components/Main/MarkerList";
import useMainStore from "@/stores/main";
import { mobileWidth02 } from "@/styles/size";

const useStyles = makeStyles({
  modalTrigger: {
    position: "fixed",
    bottom: "16px",
    left: "50%",
    transform: "translateX(-50%)",
    textAlign: "center",
    padding: "8px 16px",
    backgroundColor: tokens.colorNeutralBackground1,
    cursor: "pointer",
    zIndex: 0,
    borderRadius: "4px",
    boxShadow: "0 -4px 12px rgba(0, 0, 0, 0.1)",
    [`@media (min-width: ${mobileWidth02})`]: {
      display: "none"
    }
  },
  contentContainer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "82vh",
    backgroundColor: tokens.colorNeutralBackground1,
    zIndex: 1,
    transform: "translateY(100%)",
    transition: "transform 0.3s ease",
    borderRadius: "40px 40px 0px 0px",
    [`@media (min-width: ${mobileWidth02})`]: {
      display: "none"
    }
  },
  contentVisible: {
    transform: "translateY(0)"
  },
  closeButton: {
    position: "absolute",
    top: "30px",
    right: "30px",
    cursor: "pointer",
    fontSize: "24px",
    fontWeight: "bold",
    color: tokens.colorNeutralForeground1
  }
});

interface Props {
  handleBookmark: (name: string) => void;
}

function ItemModal({ handleBookmark }: Props) {
  const styles = useStyles();
  const { selectedMarker } = useMainStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className={styles.modalTrigger} onClick={() => setIsModalOpen(!isModalOpen)}>
        목록 보기
      </div>

      <div className={`${styles.contentContainer} ${isModalOpen ? styles.contentVisible : ""}`}>
        <div style={{ padding: "16px", position: "relative" }}>
          <div
            className={styles.closeButton}
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(false);
            }}
          >
            ✕
          </div>
          {selectedMarker ? <ItemList /> : <MarkerList handleBookmark={handleBookmark} />}
        </div>
      </div>
    </>
  );
}

export default ItemModal;
