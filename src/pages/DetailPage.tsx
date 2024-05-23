import { Depths } from "@fluentui/react";
import { Card, Image, makeStyles, tokens } from "@fluentui/react-components";
import { ArrowLeftRegular, ChatArrowBackRegular } from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";

import { mainColor } from "../styles/color";
import { headerHeight } from "../styles/margin";
import { sideBarWidth } from "../styles/size";

const useStyles = makeStyles({
  back: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    position: "absolute",
    top: `calc(${headerHeight} + 24px)`,
    left: `calc(${sideBarWidth} + 48px)`,
    fontSize: "20px",
    fontWeight: "bold",
    cursor: "pointer"
  },
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    marginTop: "58px",
    padding: 0,
    borderRadius: "20px 20px 0 0",
    boxShadow: Depths.depth16
  },
  contentTop: {
    height: "60vh",
    display: "flex",
    justifyContent: "center"
  },
  contentTopImage: {
    width: "400px",
    height: "400px",
    marginLeft: "64px"
  },
  contentTopTexts: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    fontWeight: "bold",
    marginTop: "36px",
    marginLeft: "44px",
    marginBottom: "42px"
  },
  contentTopMain: {
    fontSize: "48px",
    lineHeight: "48px",
    color: tokens.colorNeutralForeground2
  },
  contentTopSub: {
    fontSize: "24px",
    lineHeight: "24px",
    color: mainColor
  },
  contentTopInfo: {
    fontSize: "20px",
    color: tokens.colorNeutralStroke1
  },
  contentTopChat: {
    display: "flex",
    alignItems: "center",
    marginTop: "36px",
    marginLeft: "auto",
    marginRight: "36px",
    marginBottom: "auto",
    gap: "4px",
    fontSize: "14px",
    fontWeight: "bold",
    color: mainColor,
    cursor: "pointer"
  },
  contentBottom: {
    height: "40vh",
    borderRadius: "20px",
    marginLeft: "44px",
    marginRight: "44px",
    padding: "32px",
    color: tokens.colorNeutralForeground2,
    backgroundColor: tokens.colorNeutralBackground3,
    fontSize: "20px",
    fontWeight: "bold"
  }
});

function DetailPage() {
  const styles = useStyles();
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.back} onClick={() => navigate(-1)}>
        <ArrowLeftRegular color={mainColor} />
        <span>습득물 찾기</span>
      </div>
      <div className={styles.root}>
        <Card className={styles.content}>
          <div className={styles.contentTop}>
            <Image className={styles.contentTopImage} src="/logo192.png" />
            <div className={styles.contentTopTexts}>
              <div className={styles.contentTopMain}>습득물 이름</div>
              <div className={styles.contentTopSub}>습득 장소</div>
              <div className={styles.contentTopSub}>XXXX.XX.XX</div>
              <div className={styles.contentTopInfo}>관리 번호</div>
              <div className={styles.contentTopInfo}>물품 분류</div>
              <div className={styles.contentTopInfo}>접수 & 보관 장소</div>
              <div className={styles.contentTopInfo}>유실물 상태</div>
            </div>
            <div className={styles.contentTopChat}>
              <span>연락하기</span>
              <ChatArrowBackRegular fontSize="24px" />
            </div>
          </div>
          <div className={styles.contentBottom}>물품에 관련된 설명</div>
        </Card>
      </div>
    </>
  );
}

export default DetailPage;
