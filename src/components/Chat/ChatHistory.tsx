import { Depths } from "@fluentui/react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import ChatHistoryItem from "./ChatHistoryItem";
import { getUsers, User } from "../../apis/user";
import { useAuthStore } from "../../stores/auth";
import { mainColor } from "../../styles/color";
import { headerHeight, contentMargin } from "../../styles/margin";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: `calc(100vh - ${headerHeight} - ${contentMargin} - 32px)`,
    padding: "16px",
    borderRadius: "20px 20px 0 0",
    boxShadow: Depths.depth16,
    backgroundColor: tokens.colorNeutralBackground1
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
    gap: "10px",
    overflow: "auto"
  }
});

function ChatHistory() {
  const styles = useStyles();
  const { userId } = useAuthStore();
  const [histories, setHistories] = useState<User[]>();

  useEffect(() => {
    getUsers().then((res) => {
      setHistories(res);
    });
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.title}>대화 목록</div>
      <div className={styles.content}>
        {histories
          ?.filter((data) => data.userId !== userId)
          .map((user, idx) => (
            <ChatHistoryItem
              key={idx}
              message={"TEST"}
              timestamp={undefined}
              user={user}
            />
          ))}
      </div>
    </div>
  );
}

export default ChatHistory;
