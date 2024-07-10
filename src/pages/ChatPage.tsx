import { makeStyles } from "@fluentui/react-components";

import ChatHistory from "../components/Chat/ChatHistory";
import ChatMain from "../components/Chat/ChatMain";

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
