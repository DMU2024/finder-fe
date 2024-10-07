import { Button, makeStyles, tokens } from "@fluentui/react-components";
import { Switch } from "@fluentui/react-components";
import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

import { postRevokeKakaoScopes, postUnlink } from "../../../apis/user";
import { useAuthStore } from "../../../stores/auth";
import { skeletonColor } from "../../../styles/color";

const useStyles = makeStyles({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    marginLeft: "64px"
  },
  title: {
    color: tokens.colorNeutralForeground1,
    fontWeight: "bold",
    fontSize: "24px",
    marginBottom: "30px"
  },
  optionRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px"
  },
  statusText: {
    marginLeft: "10px"
  },
  a: {
    fontWeight: "bold",
    fontSize: "16px",
    color: skeletonColor
  },
  unlinkButton: {
    color: "red"
  }
});

interface Props {
  isMessageAgreed: boolean;
}

function ProfileDetailEdit({ isMessageAgreed }: Props) {
  const styles = useStyles();
  const navigate = useNavigate();
  const { userId, setUserId } = useAuthStore();

  // 스위치 상태 관리
  const [keywordNotification, setKeywordNotification] =
    useState(isMessageAgreed);
  const [locationService, setLocationService] = useState(false);

  const handleKeywordNotification = () => {
    if (userId) {
      if (keywordNotification) {
        if (confirm("정말로 동의를 철회하시겠습니까?")) {
          postRevokeKakaoScopes(userId, ["talk_message"]).then(() => {
            setKeywordNotification(false);
            alert("철회 되었습니다.");
          });
        }
      } else {
        navigate({
          pathname: "/login",
          search: createSearchParams({
            scope: "talk_message"
          }).toString()
        });
      }
    }
  };

  const handleUnlinkButton = () => {
    if (userId && confirm("정말로 탈퇴하시겠습니까?")) {
      postUnlink(userId).then(() => {
        setUserId(undefined);
        alert("탈퇴 되었습니다.");
      });
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.title}>설정</div>
      <div>
        <div className={styles.optionRow}>
          <div className={styles.a}>카카오톡 키워드 알림 전송</div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Switch
              checked={keywordNotification}
              onChange={() => handleKeywordNotification()}
            />
            <div className={styles.statusText}>
              {keywordNotification ? "동의" : "비동의"}
            </div>
          </div>
        </div>
        <div className={styles.optionRow}>
          <div className={styles.a}>위치 서비스 동의</div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Switch
              checked={locationService}
              onChange={(e, data) => setLocationService(data.checked)}
            />
            <div className={styles.statusText}>
              {locationService ? "동의" : "비동의"}
            </div>
          </div>
        </div>
      </div>
      <Button
        className={styles.unlinkButton}
        onClick={() => handleUnlinkButton()}
      >
        탈퇴하기
      </Button>
    </div>
  );
}

export default ProfileDetailEdit;
