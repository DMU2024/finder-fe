import { Depths } from "@fluentui/react";
import { Card, Image, SkeletonItem, makeStyles, tokens } from "@fluentui/react-components";
import { ArchiveArrowBackRegular, ChatArrowBackRegular } from "@fluentui/react-icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { LostFoundDetail, getLostFoundDetail } from "../apis/lostfound";
import useMarkerRedirect from "../hooks/useMarkerRedirect";
import { mainColor } from "../styles/color";
import { mobileWidth, tabletWidth } from "../styles/size";

const useStyles = makeStyles({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    [`@media (max-width: ${tabletWidth})`]: {
      width: "100vw",
      height: "85vh",
      position: "fixed",
      bottom: "0"
    },
    [`@media (max-width: ${mobileWidth})`]: {
      width: "100vw",
      height: `calc( 100vh + 30vh )`,
      position: "absolute",
      bottom: "auto"
    }
  },
  content: {
    flex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    padding: 0,
    borderRadius: "20px 20px 0 0",
    boxShadow: Depths.depth16,
    [`@media (max-width: ${tabletWidth})`]: {
      width: "90%",
      marginLeft: "15px"
    },
    [`@media (max-width: ${mobileWidth})`]: {
      width: "100%",
      height: "100vh",
      borderRadius: "0 0 0 0",
      marginLeft: "0px"
    }
  },
  contentTop: {
    display: "flex",
    justifyContent: "center",
    [`@media (max-width: ${mobileWidth})`]: {
      flexDirection: "column",
      height: "600px"
    }
  },
  contentTopImage: {
    width: "400px",
    height: "400px",
    marginLeft: "64px",
    backgroundColor: tokens.colorNeutralBackground3,
    [`@media (max-width: ${tabletWidth})`]: {
      width: "300px",
      height: "300px"
    },
    [`@media (max-width: ${mobileWidth})`]: {
      width: "100%",
      height: "400px",
      marginLeft: "0px",
      backgroundColor: tokens.colorNeutralBackground3
    }
  },
  contentTopTexts: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    fontWeight: "bold",
    marginTop: "36px",
    marginLeft: "44px",
    marginBottom: "42px",
    marginRight: "44px",
    [`@media (max-width: ${tabletWidth})`]: {
      fontSize: "16px",
      marginTop: "12px",
      marginLeft: "20px",
      marginRight: "0px",
      marginBottom: "12px",
      gap: "20px"
    },
    [`@media (max-width: ${mobileWidth})`]: {
      fontSize: "20px",
      marginTop: "12px",
      marginLeft: "20px",
      marginRight: "20px",
      marginBottom: "12px",
      gap: "20px"
    }
  },
  contentTopMain: {
    fontSize: "48px",
    lineHeight: "48px",
    color: tokens.colorNeutralForeground2,
    [`@media (max-width: ${tabletWidth})`]: {
      fontSize: "32px",
      fontWeight: "bold"
    },
    [`@media (max-width: ${mobileWidth})`]: {
      fontSize: "20px"
    }
  },
  contentTopSub: {
    fontSize: "24px",
    lineHeight: "24px",
    color: mainColor,
    [`@media (max-width: ${tabletWidth})`]: {
      fontSize: "20px",
      fontWeight: "bold"
    },
    [`@media (max-width: ${mobileWidth})`]: {
      fontSize: "14px",
      lineHeight: "0px"
    }
  },
  contentTopInfo: {
    fontSize: "20px",
    color: tokens.colorNeutralStroke1,
    [`@media (max-width: ${mobileWidth})`]: {
      fontSize: "14px",
      lineHeight: "14px"
    }
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
    textDecorationLine: "none",
    [`@media (max-width: ${mobileWidth})`]: {
      marginTop: "12px",
      marginRight: "16px"
    }
  },
  contentBottom: {
    width: "100%",
    height: "100%",
    borderRadius: "20px",
    marginLeft: "44px",
    marginRight: "44px",
    padding: "32px",
    color: tokens.colorNeutralForeground2,
    backgroundColor: tokens.colorNeutralBackground3,
    fontSize: "20px",
    fontWeight: "bold",
    whiteSpace: "pre-line",
    [`@media (max-width: ${mobileWidth})`]: {
      display: "flex",
      borderRadius: "0px",
      marginLeft: "0px",
      marginRight: "0px",
      fontSize: "14px",
      color: tokens.colorNeutralForeground2,
      backgroundColor: "none",
      padding: "0px",
      justifyContent: "center"
    }
  },
  contentBottomDetail: {
    width: "100%",
    [`@media (max-width: ${mobileWidth})`]: {
      width: "90%",
      marginTop: "20px"
    }
  }
});

function DetailPage() {
  const styles = useStyles();

  const redirect = useMarkerRedirect();
  const { id } = useParams();

  const [item, setItem] = useState<LostFoundDetail>();
  const [isLoading, setIsLoading] = useState(true);

  const handlePlaceClick = () => {
    if (item) {
      redirect(false, item.lat, item.lng, item.depPlace);
    }
  };

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      getLostFoundDetail(id)
        .then((data) => {
          setItem(data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className={styles.contentTopTexts}>
          <SkeletonItem style={{ height: "48px" }} />
          <SkeletonItem style={{ height: "24px" }} />
          <SkeletonItem style={{ height: "24px" }} />
          <SkeletonItem style={{ height: "20px" }} />
          <SkeletonItem style={{ height: "20px" }} />
          <SkeletonItem style={{ height: "20px" }} />
          <SkeletonItem style={{ height: "20px" }} />
        </div>
      );
    } else {
      return (
        <div className={styles.contentTopTexts}>
          <div className={styles.contentTopMain}>{item?.fdPrdtNm}</div>
          <div className={styles.contentTopSub}>
            {`보관장소: ${item?.depPlace}`}
            <ArchiveArrowBackRegular style={{ cursor: "pointer" }} onClick={handlePlaceClick} />
          </div>
          <div className={styles.contentTopSub}>{`습득일자: ${item?.fdYmd}`}</div>
          <div className={styles.contentTopInfo}>{`관리번호: ${item?.atcId}`}</div>
          <div className={styles.contentTopInfo}>{`물품분류: ${item?.prdtClNm}`}</div>
          <div className={styles.contentTopInfo}>{`습득장소: ${item?.fdPlace}`}</div>
          <div className={styles.contentTopInfo}>{`상태: ${item?.csteSteNm}`}</div>
        </div>
      );
    }
  };

  return (
    <div className={styles.root}>
      <Card className={styles.content}>
        <div className={styles.contentTop}>
          <Image className={styles.contentTopImage} fit="contain" src={item?.fdFilePathImg} />
          {renderContent()}
          <a className={styles.contentTopChat} href={`tel:${item?.tel}`}>
            <span>연락하기</span>
            <ChatArrowBackRegular fontSize="14px" />
          </a>
        </div>
        <div className={styles.contentBottom}>
          <div className={styles.contentBottomDetail}>{item?.uniq?.split("내용\r\n\r\n")}</div>
        </div>
      </Card>
    </div>
  );
}

export default DetailPage;
