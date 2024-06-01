import { Depths } from "@fluentui/react";
import { Card, Image, makeStyles, tokens } from "@fluentui/react-components";
import { ArrowLeftRegular, ChatArrowBackRegular } from "@fluentui/react-icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { LostFoundDetail, getLostFoundDetail } from "../apis/lostfound";
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
    marginLeft: "64px",
    backgroundColor: tokens.colorNeutralBackground3
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
    textDecorationLine: "none"
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
    fontWeight: "bold",
    whiteSpace: "pre-line"
  }
});

function DetailPage() {
  const styles = useStyles();

  const navigate = useNavigate();
  const { id } = useParams();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const fdSn = queryParams.get("fdSn");

  const [item, setItem] = useState<LostFoundDetail>();

  useEffect(() => {
    if (id) {
      getLostFoundDetail(id, fdSn).then((data) => {
        setItem(data);
      });
    }
  }, []);

  return (
    <>
      <div className={styles.back} onClick={() => navigate(-1)}>
        <ArrowLeftRegular color={mainColor} />
        <span>습득물 찾기</span>
      </div>
      <div className={styles.root}>
        <Card className={styles.content}>
          <div className={styles.contentTop}>
            <Image
              className={styles.contentTopImage}
              fit="contain"
              src={item?.fdFilePathImg}
            />
            <div className={styles.contentTopTexts}>
              <div className={styles.contentTopMain}>{item?.fdPrdtNm}</div>
              <div className={styles.contentTopSub}>
                {`보관장소: ${item?.depPlace}`}
              </div>
              <div className={styles.contentTopSub}>
                {`습득일자: ${item?.fdYmd}`}
              </div>
              <div
                className={styles.contentTopInfo}
              >{`관리번호: ${item?.atcId}`}</div>
              <div
                className={styles.contentTopInfo}
              >{`물품분류: ${item?.prdtClNm}`}</div>
              <div
                className={styles.contentTopInfo}
              >{`접수장소: ${item?.orgNm}`}</div>
              <div className={styles.contentTopInfo}>
                {`상태: ${item?.csteSteNm}`}
              </div>
            </div>
            <a className={styles.contentTopChat} href={`tel:${item?.tel}`}>
              <span>연락하기</span>
              <ChatArrowBackRegular fontSize="24px" />
            </a>
          </div>
          <div className={styles.contentBottom}>
            {item?.uniq?.split("내용\r\n\r\n")}
          </div>
        </Card>
      </div>
    </>
  );
}

export default DetailPage;
