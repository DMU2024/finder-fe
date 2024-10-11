import { Depths } from "@fluentui/react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { useEffect, useState } from "react";

import ChatHistoryItem from "./ChatHistoryItem";
import { getChatHistories, ChatHistory } from "../../apis/chat";
import useAuthStore from "../../stores/auth";
import { mainColor } from "../../styles/color";
import { headerHeight, contentMargin } from "../../styles/margin";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: `calc(100vh - ${headerHeight} - ${contentMargin} - 32px)`,
    padding: "16px",
    borderRadius: "20px 20px 0 0",
    boxShadow: Depths.depth16,
    backgroundColor: tokens.colorNeutralBackground1
  },
  title: {
    marginTop: "16px",
    marginBottom: "24px",
    marginLeft: "10px",
    fontSize: "20px",
    fontWeight: "bold",
    color: mainColor
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    overflow: "auto"
  }
});

function ChatHistoryList() {
  const styles = useStyles();
  const { userId } = useAuthStore();
  const [histories, setHistories] = useState<ChatHistory[]>();

  useEffect(() => {
    if (userId) {
      getChatHistories(userId).then((res) => {
        setHistories(res);
      });
    }
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.title}>대화 목록</div>
      <div className={styles.content}>
        {histories?.map((history, idx) => (
          <ChatHistoryItem key={idx} history={history} />
        ))}
      </div>
    </div>
  );
}

export default ChatHistoryList;
