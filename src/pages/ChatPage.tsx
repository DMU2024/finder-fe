import { makeStyles } from "@fluentui/react-components";
import { useState } from "react";

import ChatHistory from "../components/Chat/ChatHistoryList";
import ChatMain from "../components/Chat/ChatMain";
import { headerHeight } from "../styles/margin";
import { mobileWidth } from "../styles/size";

const useStyles = makeStyles({
  root: {
    flex: 1
  },
  content: {
    display: "flex",
    gap: "32px",
    [`@media (max-width: ${mobileWidth})`]: {
      position: "relative"
    }
  },
  left: {
    width: "30%",
    [`@media (max-width: ${mobileWidth})`]: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: `calc(100vh - ${headerHeight})`,
      marginTop: "20px",
      position: "relative",
      zIndex: 1
    }
  },
  right: {
    width: "70%",
    [`@media (max-width: ${mobileWidth})`]: {
      display: "none"
    }
  },
  rightVisible: {
    display: "none",
    [`@media (max-width: ${mobileWidth})`]: {
      display: "block",
      width: "100%",
      height: `calc(100vh - ${headerHeight})`,
      marginTop: "20px",
      position: "absolute",
      zIndex: 3,
      top: 0,
      left: 0
    }
  },
  rightVisible02: {
    display: "none"
  }
});

function ChatPage() {
  const styles = useStyles();
  const [isRightVisible, setIsRightVisible] = useState(false);

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div className={styles.left}>
          <ChatHistory setIsRightVisible={setIsRightVisible} />
        </div>

        <div
          className={
            isRightVisible ? styles.rightVisible : styles.rightVisible02
          }
        >
          <ChatMain setIsRightVisible={setIsRightVisible} />
        </div>

        <div className={styles.right}>
          <ChatMain />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
