import { makeStyles } from "@fluentui/react-components";
import { Switch } from "@fluentui/react-components";
import { useState } from "react";

import { skeletonColor } from "../../../styles/color";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "28vw",
    height: "540px"
  },
  title: {
    color: skeletonColor,
    fontWeight: "bold",
    fontSize: "24px",
    marginTop: "60px",
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
  flex: {
    display: "flex"
  },
  a: {
    fontWeight: "bold",
    fontSize: "16px",
    color: skeletonColor
  }
});

function ProfileDetailEdit() {
  const styles = useStyles();

  // 스위치 상태 관리
  const [keywordNotification, setKeywordNotification] = useState(false);
  const [locationService, setLocationService] = useState(false);

  return (
    <div className={styles.root}>
      <div>
        <div className={styles.title}> 설정 </div>
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
      </div>

      <div>
        <div className={styles.title}> 카카오 계정 확인 </div>
        <div className={styles.a}> 사용자 이메일 @ kakao.co.kr </div>
      </div>
    </div>
  );
}

export default ProfileDetailEdit;
