import { makeStyles } from "@fluentui/react-components";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";

import {
  Chat,
  ChatHistory,
  createChatRoom,
  getChatHistories,
  getMessages
} from "../apis/chat";
import { getUser, User } from "../apis/user";
import ChatHistoryList from "../components/Chat/ChatHistoryList";
import ChatMain from "../components/Chat/ChatMain";
import useAuthStore from "../stores/auth";
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
  const location = useLocation();

  const [isRightVisible, setIsRightVisible] = useState(false);
  const [recipient, setRecipient] = useState<User>();
  const [histories, setHistories] = useState<ChatHistory[]>();
  const [messages, setMessages] = useState<Chat[]>([]);

  const { userId } = useAuthStore();

  const protocol = BASE_URL.split("://")[0] === "https" ? "wss" : "ws";
  const wsUrl = `${protocol}://${BASE_URL.split("://")[1]}/api/ws/chat?userId=${userId}`;
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(wsUrl, {
    shouldReconnect: () => true,
    reconnectAttempts: 5,
    reconnectInterval: (attemptNumber) =>
      Math.min(Math.pow(2, attemptNumber) * 1000, 10000)
  });

  // 메시지 목록 갱신
  const fetchHistories = () => {
    if (userId) {
      getChatHistories(userId).then((res) => {
        setHistories(res);
      });
    }
  };

  // 메시지 송신
  const sendMessage = (message: string) => {
    sendJsonMessage({
      sender: userId,
      recipient: recipient?.userId,
      message: message
    });
  };

  // 연락하기 기능으로 채팅 시작 시
  useEffect(() => {
    if (location.state) {
      const targetId = location.state.targetId;

      if (userId) {
        getUser(targetId)
          .then((target) => {
            getMessages(userId, targetId).then((messages) => {
              if (messages.length > 0) {
                setRecipient(target);
                setIsRightVisible(true);
                fetchHistories();
              } else {
                createChatRoom(userId, targetId).then(() => {
                  setRecipient(target);
                  setIsRightVisible(true);
                  fetchHistories();
                });
              }
            });
          })
          .catch((err: AxiosError) => {
            if (err.response?.status !== 404) {
              console.error(err);
            }
          })
          .finally(() => {
            window.history.replaceState({}, document.title);
          });
      }
    }
  }, [location]);

  // 웹소켓 연결 성공
  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      fetchHistories();
    }
  }, [readyState]);

  // 메시지 수신
  useEffect(() => {
    if (lastJsonMessage && recipient) {
      const data = lastJsonMessage as Chat;

      if (data.sender === userId || data.sender === recipient.userId)
        setMessages([...messages, data]);
    }
    fetchHistories();
  }, [lastJsonMessage]);

  // 채팅 목록 선택
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
            setRecipient={setRecipient}
          />
        </div>

        <div
          className={
            isRightVisible ? styles.rightVisible : styles.rightVisible02
          }
        >
          <ChatMain
            messages={messages}
            recipient={recipient}
            sendMessage={sendMessage}
            setIsRightVisible={setIsRightVisible}
            setRecipient={setRecipient}
          />
        </div>

        <div className={styles.right}>
          <ChatMain
            messages={messages}
            recipient={recipient}
            sendMessage={sendMessage}
            setRecipient={setRecipient}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
