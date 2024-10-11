import { makeStyles } from "@fluentui/react-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ChatHistory from "../components/Chat/ChatHistoryList";
import ChatMain from "../components/Chat/ChatMain";
import useAuthStore from "../stores/auth";

const useStyles = makeStyles({
  root: {
    flex: 1
  },
  content: {
    display: "flex",
    gap: "32px"
  },
  left: {
    width: "30%"
  },
  right: {
    width: "70%"
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

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div className={styles.left}>
          <ChatHistory />
        </div>
        <div className={styles.right}>
          <ChatMain />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
