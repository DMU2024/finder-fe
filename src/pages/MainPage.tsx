import { makeStyles, tokens } from "@fluentui/react-components";
import { useRef } from "react";
import { BottomSheet } from "react-spring-bottom-sheet-container-ref";

import "react-spring-bottom-sheet-container-ref/dist/style.css";

import ItemList from "../components/Main/ItemList";
import KakaoMap from "../components/Main/KakaoMap";
import Notificiation from "../components/Main/Notification";
import { mainColor } from "../styles/color";

const useStyles = makeStyles({
  root: {
    flex: 1
  },
  content: {
    display: "flex",
    gap: "32px"
  },
  left: {
    width: "40%"
  },
  right: {
    width: "60%"
  },
  bottomSheet: {
    "&>[data-rsbs-overlay]": {
      left: "auto",
      right: "14px",
      width: "440px",
      backgroundColor: mainColor,
      "&>[data-rsbs-header]": {
        height: "32px",
        "&>div": {
          color: "white",
          fontSize: "20px"
        }
      },
      "&>[data-rsbs-header]::before": {
        display: "none"
      },
      "&>[data-rsbs-scroll]": {
        backgroundColor: tokens.colorNeutralBackground2
      }
    },
    "::after": {
      left: "auto",
      right: "14px",
      width: "440px",
      backgroundColor: tokens.colorNeutralBackground2
    }
  }
});

function MainPage() {
  const styles = useStyles();

  const rootRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={rootRef} className={styles.root}>
      <Notificiation />
      <div className={styles.content}>
        <div className={styles.left}>
          <ItemList />
        </div>
        <div className={styles.right}>
          <KakaoMap />
        </div>
      </div>
      <BottomSheet
        blocking={false}
        className={styles.bottomSheet}
        containerRef={rootRef}
        header={<div>빠른 분실물 찾기</div>}
        open={true}
        snapPoints={() => [58, 252]}
      >
        <div>Content</div>
      </BottomSheet>
    </div>
  );
}

export default MainPage;
