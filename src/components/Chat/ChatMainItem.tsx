import { makeStyles, mergeClasses, tokens } from "@fluentui/react-components";

import { mainColor } from "../../styles/color";

const useStyles = makeStyles({
  root: {
    display: "flex",
    maxWidth: "60%"
  },
  myRoot: { marginLeft: "auto" },
  myChat: {
    color: tokens.colorNeutralForeground1,
    borderRadius: "20px 20px 0 20px",
    backgroundColor: tokens.colorNeutralStroke1,
    padding: "16px"
  },
  myChatTime: {
    marginRight: "16px",
    alignContent: "end",
    color: tokens.colorNeutralStroke1
  },
  othersRoot: { marginRight: "auto" },
  othersChat: {
    color: tokens.colorNeutralBackground1,
    borderRadius: "20px 20px 20px 0",
    backgroundColor: mainColor,
    padding: "16px"
  },
  othersChatTime: {
    marginLeft: "16px",
    alignContent: "end",
    color: mainColor
  }
});

interface Props {
  message?: string;
  timestamp?: string;
  isMine?: boolean;
}

function ChatMainItem({ timestamp, isMine }: Props) {
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </div>
      {!isMine && <div className={styles.othersChatTime}>{timestamp}</div>}
    </div>
  );
}

export default ChatMainItem;
