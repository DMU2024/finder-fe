import { Button, makeStyles, tokens } from "@fluentui/react-components";
import { Switch } from "@fluentui/react-components";
import { useState } from "react";

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

function ProfileDetailEdit() {
  const styles = useStyles();

  // 스위치 상태 관리
  const [keywordNotification, setKeywordNotification] = useState(false);
  const [locationService, setLocationService] = useState(false);

  return (
    <div className={styles.root}>
      <div className={styles.title}>설정</div>
      <div>
        <div className={styles.optionRow}>
          <div className={styles.a}>카카오톡 키워드 알림 전송</div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Switch
              checked={keywordNotification}
              onChange={(e, data) => setKeywordNotification(data.checked)}
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
      <Button className={styles.unlinkButton}>탈퇴하기</Button>
    </div>
  );
}

export default ProfileDetailEdit;
