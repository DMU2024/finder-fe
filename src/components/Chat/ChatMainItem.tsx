import { makeStyles, mergeClasses, tokens } from "@fluentui/react-components";

import { mainColor } from "../../styles/color";
import { mobileWidth } from "../../styles/size";

const useStyles = makeStyles({
  root: {
    display: "flex",
    maxWidth: "60%",
    [`@media (max-width: ${mobileWidth})`]: {
      maxWidth: "100%",
      fontSize: "12px"
    }
  },
  myRoot: { marginLeft: "auto" },
  myChat: {
    color: tokens.colorNeutralBackground1,
    borderRadius: "20px 20px 0 20px",
    backgroundColor: mainColor,
    padding: "16px"
  },
  myChatTime: {
    marginRight: "16px",
    alignContent: "end",
    color: mainColor,
    [`@media (max-width: ${mobileWidth})`]: {
      marginRight: "10px",
    }
  },
  othersRoot: { marginRight: "auto" },
  othersChat: {
    color: tokens.colorNeutralForeground1,
    borderRadius: "20px 20px 20px 0",
    backgroundColor: tokens.colorNeutralStroke1,
    padding: "16px"
  },
  othersChatTime: {
    marginLeft: "16px",
    alignContent: "end",
    color: tokens.colorNeutralStroke1,
    [`@media (max-width: ${mobileWidth})`]: {
      marginLeft: "10px",
    }
  }
});

interface Props {
  message?: string;
  timestamp?: string;
  isMine?: boolean;
}

function ChatMainItem({ message, timestamp, isMine }: Props) {
  const styles = useStyles();

  return (
    <div
      className={mergeClasses(
        styles.root,
        isMine ? styles.myRoot : styles.othersRoot
      )}
    >
      {isMine && <div className={styles.myChatTime}>{timestamp}</div>}
      <div className={isMine ? styles.myChat : styles.othersChat}>
        {message}
      </div>
      {!isMine && <div className={styles.othersChatTime}>{timestamp}</div>}
    </div>
  );
}

export default ChatMainItem;
