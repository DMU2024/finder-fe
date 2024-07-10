import { Depths } from "@fluentui/react";
import { Image, makeStyles, tokens } from "@fluentui/react-components";
import { AddRegular, SendRegular } from "@fluentui/react-icons";

import ChatMainItem from "./ChatMainItem";
import { backgroundColor, mainColor } from "../../styles/color";
import { headerHeight, contentMargin } from "../../styles/margin";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: `calc(100vh - ${headerHeight} - ${contentMargin})`
  },
  chatMenu: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
    height: "5%",
    gap: "16px"
  },
  chatMenuText: {
    fontSize: "14px",
    fontWeight: "bold"
  },
  chatBox: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    height: "95%",
    borderRadius: "20px 20px 0 0",
    boxShadow: Depths.depth16,
    backgroundColor: tokens.colorNeutralBackground3
  },
  chatBoxTop: {
    display: "flex",
    alignItems: "center",
    height: "64px",
    borderRadius: "20px 20px 0 0",
    backgroundColor: tokens.colorNeutralBackground1
  },
  profileImg: {
    position: "absolute",
    top: "-32px",
    left: "32px",
    maxWidth: "128px",
    maxHeight: "128px",
    boxShadow: Depths.depth16,
    backgroundColor: tokens.colorNeutralBackground1
  },
  profileText: {
    marginLeft: "184px",
    fontSize: "18px",
    fontWeight: "bold"
  },
  chatBoxMiddle: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "32px",
    paddingTop: "48px",
    gap: "16px",
    overflow: "auto"
  },
  chatBoxBottom: {
    display: "flex",
    alignItems: "center",
    height: "72px",
    borderRadius: "20px 20px 0 0",
    backgroundColor: tokens.colorNeutralBackground1,
    paddingLeft: "32px",
    paddingRight: "32px",
    gap: "16px"
  },
  chatBoxInput: {
    flex: 1,
    color: tokens.colorNeutralForeground1,
    fontSize: "24px",
    backgroundColor: "transparent",
    border: "none",
    ":focus": {
      outline: "none"
    }
  }
});

function ChatMain() {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.chatMenu}>
        <div className={styles.chatMenuText} style={{ color: backgroundColor }}>
          신고하기
        </div>
        <div className={styles.chatMenuText} style={{ color: mainColor }}>
          대화 끝내기
        </div>
      </div>
      <div className={styles.chatBox}>
        <div className={styles.chatBoxTop}>
          <Image
            className={styles.profileImg}
            shape="circular"
            src="/logo192.png"
          />
          <div className={styles.profileText}>상대방</div>
        </div>
        <div className={styles.chatBoxMiddle}>
          <ChatMainItem timestamp="12:00" />
          <ChatMainItem isMine={true} timestamp="12:12" />
          <ChatMainItem timestamp="12:32" />
          <ChatMainItem isMine={true} timestamp="13:02" />
          <ChatMainItem timestamp="13:04" />
        </div>
        <div className={styles.chatBoxBottom}>
          <AddRegular fontSize={"32px"} />
          <input
            className={styles.chatBoxInput}
            placeholder="Type a message..."
          />
          <SendRegular color={mainColor} fontSize={"32px"} />
        </div>
      </div>
    </div>
  );
}

export default ChatMain;
