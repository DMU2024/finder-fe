import { Depths } from "@fluentui/react";
import { Image, makeStyles, tokens } from "@fluentui/react-components";
import { AddRegular, SendRegular } from "@fluentui/react-icons";
import { useEffect, useRef, useState } from "react";

import ChatMainItem from "./ChatMainItem";
import { Chat, getMessages } from "../../apis/chat";
import { getUser } from "../../apis/user";
import { useAuthStore } from "../../stores/auth";
import useChatStore from "../../stores/chat";
import { backgroundColor, mainColor } from "../../styles/color";
import { headerHeight, contentMargin } from "../../styles/margin";
import { BASE_URL } from "../../utils/axios";

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
  const { userId } = useAuthStore();
  const { recipientId } = useChatStore();
  const [recipientName, setRecipientName] = useState("");
  const [messages, setMessages] = useState<Chat[]>([]);
  const messageBox = useRef<HTMLDivElement | null>(null);
  const messageInput = useRef<HTMLInputElement | null>(null);
  const ws = useRef<WebSocket | null>(null);

  const sendMessage = () => {
    if (messageInput.current) {
      const message = messageInput.current.value;

      ws.current?.send(
        JSON.stringify({
          sender: userId,
          recipient: recipientId,
          message: message
        })
      );

      messageInput.current.value = "";
    }
  };

  useEffect(() => {
    if (!userId) return;

    ws.current = new WebSocket(
      `wss://${BASE_URL.split("://")[1]}/api/ws/chat?userId=${userId}`
    );

    return () => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages([...messages, data]);
    };
  });

  useEffect(() => {
    if (userId && recipientId) {
      getUser(recipientId).then((user) => {
        setRecipientName(user.username);
      });
      getMessages(userId, recipientId).then((messages) => {
        setMessages(messages);
      });
    }
  }, [recipientId]);

  useEffect(() => {
    if (messageBox.current) {
      messageBox.current.scrollTop = messageBox.current.scrollHeight;
    }
  }, [messages]);

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
          <div className={styles.profileText}>{recipientName}</div>
        </div>
        <div ref={messageBox} className={styles.chatBoxMiddle}>
          {messages?.map((message, idx) => (
            <ChatMainItem
              key={idx}
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
            sendMessage();
          }}
        >
          <AddRegular fontSize={"32px"} />
          <input
            ref={messageInput}
            className={styles.chatBoxInput}
            disabled={!recipientId}
            placeholder={recipientId ? "Type a message..." : "Select user..."}
          />
          <SendRegular
            color={mainColor}
            fontSize={"32px"}
            onClick={() => sendMessage()}
          />
        </form>
      </div>
    </div>
  );
}

export default ChatMain;
