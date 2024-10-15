import { makeStyles } from "@fluentui/react-components";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Chat, ChatHistory, getChatHistories, getMessages } from "../apis/chat";
import { getUser } from "../apis/user";
import ChatHistoryList from "../components/Chat/ChatHistoryList";
import ChatMain from "../components/Chat/ChatMain";
import useAuthStore from "../stores/auth";
import useChatStore from "../stores/chat";
import { headerHeight } from "../styles/margin";
import { mobileWidth } from "../styles/size";
import { BASE_URL } from "../utils/axios";

const useStyles = makeStyles({
  root: {
    flex: 1
  },
  content: {
    display: "flex",
    gap: "32px",
    [`@media (max-width: ${mobileWidth})`]: {
      position: "relative"
    }
  },
  left: {
    width: "30%",
    [`@media (max-width: ${mobileWidth})`]: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: `calc(100vh - ${headerHeight})`,
      marginTop: "20px",
      position: "relative",
      zIndex: 1
    }
  },
  right: {
    width: "70%",
    [`@media (max-width: ${mobileWidth})`]: {
      display: "none"
    }
  },
  rightVisible: {
    display: "none",
    [`@media (max-width: ${mobileWidth})`]: {
      display: "block",
      width: "100%",
      height: `calc(100vh - ${headerHeight})`,
      marginTop: "20px",
      position: "absolute",
      zIndex: 3,
      top: 0,
      left: 0
    }
  },
  rightVisible02: {
    display: "none"
  }
});

function ChatPage() {
  const styles = useStyles();
  const [isRightVisible, setIsRightVisible] = useState(false);
  const [messages, setMessages] = useState<Chat[]>([]);
  const [histories, setHistories] = useState<ChatHistory[]>();
  const [searchParams, setSearchParams] = useSearchParams();

  const rcptId = searchParams.get("recipient");
  const ws = useRef<WebSocket | null>(null);

  const { userId } = useAuthStore();
  const { recipient, setRecipient } = useChatStore();

  const fetchHistories = () => {
    if (userId) {
      getChatHistories(userId).then((res) => {
        setHistories(res);
      });
    }
  };

  const sendMessage = (message: string, targetId?: number) => {
    ws.current?.send(
      JSON.stringify({
        sender: userId,
        recipient: targetId ? targetId : recipient?.userId,
        message: message
      })
    );
  };

  useEffect(() => {
    const protocol = BASE_URL.split("://")[0] === "https" ? "wss" : "ws";

    ws.current = new WebSocket(
      `${protocol}://${BASE_URL.split("://")[1]}/api/ws/chat?userId=${userId}`
    );

    fetchHistories();

    return () => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = (event) => {
      if (recipient) {
        const data = JSON.parse(event.data);
        if (data.sender === userId || data.sender === recipient.userId)
          setMessages([...messages, data]);
      }
      fetchHistories();
    };
  });

  useEffect(() => {
    if (rcptId && histories) {
      const targetId = Number.parseInt(rcptId);
      const target = histories?.filter(
        (history) => history.userId === targetId
      )[0];

      if (target) {
        setRecipient(target);
      } else {
        getUser(targetId).then((res) => {
          if (res.userId) {
            sendMessage("안녕하세요", res.userId);
          }
        });
      }
      setSearchParams((params) => {
        params.delete("recipient");
        return params;
      });
    }
  }, [rcptId, histories]);

  useEffect(() => {
    if (userId && recipient?.userId) {
      getMessages(userId, recipient.userId).then((messages) => {
        setMessages(messages);
      });
    }
    if (!recipient) {
      setMessages([]);
    }
  }, [recipient]);

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div className={styles.left}>
          <ChatHistoryList
            histories={histories}
            setIsRightVisible={setIsRightVisible}
          />
        </div>

        <div
          className={
            isRightVisible ? styles.rightVisible : styles.rightVisible02
          }
        >
          <ChatMain
            messages={messages}
            sendMessage={sendMessage}
            setIsRightVisible={setIsRightVisible}
          />
        </div>

        <div className={styles.right}>
          <ChatMain messages={messages} sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
