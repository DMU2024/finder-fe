import { Image, makeStyles, tokens } from "@fluentui/react-components";
import { ChatHistory } from "../../apis/chat";
import useChatStore from "../../stores/chat";
import { backgroundColor, secondaryColor, skeletonColor } from "../../styles/color";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-around",
    border: `solid ${secondaryColor}`,
    borderTopWidth: 0,
    borderBottomWidth: "0.5px",
    borderLeftWidth: 0,
    borderRightWidth: 0,
    padding: "16px",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground2
    }
  },
  profileImg: {
    maxWidth: "64px",
    maxHeight: "64px",
    backgroundColor: tokens.colorNeutralBackground1
  },
  history: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: "10px",
    gap: "4px"
  },
  historyName: { fontWeight: "bold", color: skeletonColor },
  historyMsg: { fontWeight: "bold", color: backgroundColor },
  historyDate: { fontWeight: "bold", color: backgroundColor }
});

interface Props {
  history: ChatHistory;
  setIsRightVisible: (isVisible: boolean) => void;
}

function ChatHistoryItem({ history, setIsRightVisible }: Props) {
  const styles = useStyles();
  const { setRecipient } = useChatStore();

  return (
    <div
      className={styles.root}
      onClick={() => {
        setRecipient(history);
        setIsRightVisible(true);
      }}
    >
      <Image
        className={styles.profileImg}
        shape="circular"
        src={history.thumbnailImage ? history.thumbnailImage : "/logo192.png"}
      />
      <div className={styles.history}>
        <div className={styles.historyName}>
          {history.username ? history.username : "탈퇴한 사용자"}
        </div>
        <div className={styles.historyMsg}>{history.message}</div>
      </div>
      <div className={styles.historyDate}>
        {history.messageDate.split("T")[0]}
      </div>
    </div>
  );
}

export default ChatHistoryItem;
