import { Depths } from "@fluentui/react";
import { makeStyles, tokens } from "@fluentui/react-components";

import ChatHistoryItem from "./ChatHistoryItem";
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

function ChatHistory() {
  const styles = useStyles();
  const histories = [
    {
      name: "홍길동",
      messages: [
        {
          message: "안녕하세요",
          timestamp: new Date()
        }
      ]
    }
  ];

  return (
    <div className={styles.root}>
      <div className={styles.title}>대화 목록</div>
      <div className={styles.content}>
        {histories.map(({ name, messages }, idx) => (
          <ChatHistoryItem
            key={idx}
            message={messages.at(-1)?.message ?? ""}
            name={name}
            timestamp={messages.at(-1)?.timestamp}
          />
        ))}
      </div>
    </div>
  );
}

export default ChatHistory;
