import { Depths } from "@fluentui/react";
import { makeStyles, tokens } from "@fluentui/react-components";

import ChatHistoryItem from "./ChatHistoryItem";
import { ChatHistory } from "../../apis/chat";
import { mainColor } from "../../styles/color";
import { headerHeight, contentMargin } from "../../styles/margin";
import { mobileWidth } from "../../styles/size";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: `calc(100vh - ${headerHeight} - ${contentMargin} - 32px)`,
    padding: "16px",
    borderRadius: "20px 20px 0 0",
    boxShadow: Depths.depth16,
    backgroundColor: tokens.colorNeutralBackground1,
    [`@media (max-width: ${mobileWidth})`]: {
      height: `calc(100vh - ${headerHeight} - 20px)`
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
  histories: ChatHistory[] | undefined;
  setIsRightVisible: (isVisible: boolean) => void;
}

function ChatHistoryList({
  histories,
  setIsRightVisible
}: ChatHistoryListProps) {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.title}>대화 목록</div>
      <div className={styles.content}>
        {histories?.map((history, idx) => (
          <ChatHistoryItem
            key={idx}
            history={history}
            setIsRightVisible={setIsRightVisible}
          />
        ))}
      </div>
    </div>
  );
}

export default ChatHistoryList;
