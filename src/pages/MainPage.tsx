import {
  Dropdown,
  Input,
  Option,
  makeStyles,
  tokens
} from "@fluentui/react-components";
import { ArrowRightRegular, BoxArrowUpRegular } from "@fluentui/react-icons";
import { useRef } from "react";
import {
  BottomSheet,
  BottomSheetRef
} from "react-spring-bottom-sheet-container-ref";

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
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        height: "32px",
        "&>div": {
          color: "white",
          fontSize: "20px",
          cursor: "pointer"
        }
      },
      "&>[data-rsbs-header]::before": {
        display: "none"
      },
      "&>[data-rsbs-scroll]": {
        overflow: "hidden",
        backgroundColor: tokens.colorNeutralBackground2,
        "&>[data-rsbs-content]": {
          padding: "36px",
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
          gap: "32px"
        }
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
    </div>
  );
}

export default MainPage;
