import { Depths } from "@fluentui/react";
import { makeStyles, tokens } from "@fluentui/react-components";

import { ChatHistory } from "../../apis/chat";
import { User } from "../../apis/user";
import { mainColor } from "../../styles/color";
import { contentMargin, headerHeight } from "../../styles/margin";
import { tabletWidth } from "../../styles/size";
import ChatHistoryItem from "./ChatHistoryItem";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: `calc(100dvh - ${headerHeight} - ${contentMargin} - 32px)`,
    padding: "16px",
    borderRadius: "20px 20px 0 0",
    boxShadow: Depths.depth16,
    backgroundColor: tokens.colorNeutralBackground1,
    [`@media (max-width: ${tabletWidth})`]: {
      height: `calc(100dvh - ${headerHeight} - 20px)`
    }
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
    overflow: "auto"
  }
});

interface ChatHistoryListProps {
  recipient: User | undefined;
  setRecipient: (user: User | undefined) => void;
  histories: ChatHistory[] | undefined;
  setIsRightVisible: (isVisible: boolean) => void;
}

function ChatHistoryList({
  recipient,
  setRecipient,
  histories,
  setIsRightVisible
}: ChatHistoryListProps) {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.title}>대화 목록</div>
      <div className={styles.content}>
        {histories?.map((history) => (
          <ChatHistoryItem
            key={history.userId}
            history={history}
            recipient={recipient}
            setIsRightVisible={setIsRightVisible}
            setRecipient={setRecipient}
          />
        ))}
      </div>
    </div>
  );
}

export default ChatHistoryList;
