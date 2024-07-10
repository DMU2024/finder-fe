import { Image, makeStyles, tokens } from "@fluentui/react-components";

import { backgroundColor } from "../../styles/color";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-around",
    border: `solid ${backgroundColor}`,
    borderTopWidth: "0.5px",
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
  historyName: { fontWeight: "bold" },
  historyMsg: { fontWeight: "bold", color: backgroundColor },
  historyDate: { fontWeight: "bold", color: backgroundColor }
});

interface Props {
  name: string;
  message: string;
  timestamp: Date | undefined;
}

function ChatHistoryItem({ name, message, timestamp }: Props) {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Image
        className={styles.profileImg}
        shape="circular"
        src="/logo192.png"
      />
      <div className={styles.history}>
        <div className={styles.historyName}>{name}</div>
        <div className={styles.historyMsg}>{message}</div>
      </div>
      <div className={styles.historyDate}>
        {timestamp?.toISOString().split("T")[0]}
      </div>
    </div>
  );
}

export default ChatHistoryItem;
