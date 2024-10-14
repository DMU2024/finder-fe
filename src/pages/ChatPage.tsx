import { makeStyles } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ChatHistory from "../components/Chat/ChatHistoryList";
import ChatMain from "../components/Chat/ChatMain";
import { mobileWidth } from "../styles/size";
import { headerHeight } from "../styles/margin";
import useAuthStore from "../stores/auth";

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
      left: 0,
    }
  },
  rightVisible02: {
    display: "none"
  }
});

function ChatPage() {
  const styles = useStyles();
  const navigate = useNavigate();
  const { userId } = useAuthStore();

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  }, [userId]);

  const [isRightVisible, setIsRightVisible] = useState(false);

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div className={styles.left}>
          <ChatHistory 
            setIsRightVisible={setIsRightVisible} 
          />
        </div>

        <div className={isRightVisible ? styles.rightVisible : styles.rightVisible02}>
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
