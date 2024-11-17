import { Depths } from "@fluentui/react";
import { Image, makeStyles, tokens } from "@fluentui/react-components";
import { AddRegular, SendRegular } from "@fluentui/react-icons";
import { useEffect, useRef } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

import ChatMainItem from "./ChatMainItem";
import { Chat } from "../../apis/chat";
import { User } from "../../apis/user";
import useAuthStore from "../../stores/auth";
import { mainColor } from "../../styles/color";
import { headerHeight, contentMargin } from "../../styles/margin";
import { tabletWidth } from "../../styles/size";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: `calc(100dvh - ${headerHeight} - ${contentMargin})`,
    [`@media (max-width: ${tabletWidth})`]: {
      height: `calc(100dvh - ${headerHeight})`
    }
  },
  chatMenu: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    height: "5%"
  },
  chatMenuText: {
    height: "auto",
    paddingRight: "16px",
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
    backgroundColor: tokens.colorNeutralBackground1,
    [`@media (max-width: ${tabletWidth})`]: {
      maxWidth: "64px",
      maxHeight: "64px",
      top: "6px",
      left: "24px"
    }
  },
  profileText: {
    marginLeft: "184px",
    fontSize: "18px",
    fontWeight: "bold",
    [`@media (max-width: ${tabletWidth})`]: {
      marginLeft: "102px",
      fontSize: "16px"
    }
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
    height: "auto",
    minHeight: "72px",
    maxHeight: "300px",
    overflow: "hidden",
    borderRadius: "20px 20px 0 0",
    backgroundColor: tokens.colorNeutralBackground1,
    paddingLeft: "32px",
    paddingRight: "32px",
    gap: "16px"
  },
  chatBoxTextArea: {
    flex: 1,
    color: tokens.colorNeutralForeground1,
    fontSize: "16px",
    fontFamily: "inherit",
    lineHeight: "24px",
    maxHeight: "300px",
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    resize: "none"
  }
});

interface ChatMainProps {
  recipient: User | undefined;
  setRecipient: (user: User | undefined) => void;
  messages: Chat[];
  sendMessage: (message: string) => void;
  setIsRightVisible?: (isVisible: boolean) => void;
}

function ChatMain({
  recipient,
  setRecipient,
  messages,
  sendMessage,
  setIsRightVisible
}: ChatMainProps) {
  const styles = useStyles();
  const messageBox = useRef<HTMLDivElement | null>(null);
  const messageArea = useRef<HTMLTextAreaElement | null>(null);

  const { userId } = useAuthStore();

  const handleSendMessage = () => {
    if (messageArea.current) {
      const message = messageArea.current.value;

      if (!message) return;

      sendMessage(message);

      messageArea.current.value = "";
    }
  };

  useEffect(() => {
    if (messageBox.current) {
      messageBox.current.scrollTop = messageBox.current.scrollHeight;
    }
  }, [messages]);

  const handleEndConversation = () => {
    if (setIsRightVisible) {
      setIsRightVisible(false);
    }
    setRecipient(undefined);
  };

  return (
    <div className={styles.root}>
      <div className={styles.chatMenu}>
        <div
          className={styles.chatMenuText}
          style={{
            color: mainColor,
            cursor: `${recipient ? "pointer" : "not-allowed"}`
          }}
          onClick={handleEndConversation}
        >
          대화 끝내기
        </div>
      </div>
      <div className={styles.chatBox}>
        <div className={styles.chatBoxTop}>
          <Image
            className={styles.profileImg}
            fit="cover"
            shape="circular"
            src={recipient?.profileImage ? recipient.profileImage : "/logo192.png"}
          />
          <div className={styles.profileText}>
            {!recipient
              ? "채팅할 상대 선택..."
              : recipient.username
                ? recipient.username
                : "탈퇴한 사용자"}
          </div>
        </div>
        <div ref={messageBox} className={styles.chatBoxMiddle}>
          {messages
            ?.filter((message) => message.messageType !== "ENTER")
            .map((message) => (
              <ChatMainItem
                key={message.messageId}
                isMine={message.sender === userId}
                message={message.message}
                timestamp={message.messageTime}
              />
            ))}
        </div>
        <form
          className={styles.chatBoxBottom}
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <AddRegular fontSize={"32px"} style={{ cursor: "not-allowed" }} />
          <ReactTextareaAutosize
            ref={messageArea}
            className={styles.chatBoxTextArea}
            disabled={!recipient}
            placeholder={recipient ? "Type a message..." : "Select user..."}
          />
          <SendRegular
            color={mainColor}
            fontSize={"32px"}
            style={{ cursor: `${recipient ? "pointer" : "not-allowed"}` }}
            onClick={() => handleSendMessage()}
          />
        </form>
      </div>
    </div>
  );
}

export default ChatMain;
