import { Depths } from "@fluentui/react";
import {
  Button,
  Card,
  Image,
  Spinner,
  makeStyles,
  tokens
} from "@fluentui/react-components";
import { BookExclamationMarkRegular } from "@fluentui/react-icons";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

import Item from "./Item";
import { placeLostFound } from "../../apis/lostfound";
import useIntersect from "../../hooks/useIntersect";
import useAuthStore from "../../stores/auth";
import useMainStore from "../../stores/main";
import { mainColor } from "../../styles/color";
import { contentMargin, headerHeight } from "../../styles/margin";
import { mobileWidth, tabletWidth } from "../../styles/size";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: `calc(100vh - ${headerHeight} - ${contentMargin})`,
    [`@media (max-width: ${tabletWidth})`]: {
      height: `calc(100vh - ${headerHeight})`,
    },
    [`@media (max-width: ${mobileWidth})`]: {
      height: "auto"
    }
  },
  title: {
    display: "flex",
    [`@media (max-width: ${tabletWidth})`]: {
      display: "none"
    },
    [`@media (max-width: ${mobileWidth})`]: {
      display: "block",
    },
  },
  titleText: {
    marginLeft: "8px",
    fontSize: "20px",
    fontWeight: "bold",
    [`@media (max-width: ${tabletWidth})`]: {
      display: "none"
    },
    [`@media (max-width: ${mobileWidth})`]: {
      display: "block"
    },
  },
  titleBack: {
    display: "inline-block",
    marginLeft: "auto",
    fontSize: "14px",
    fontWeight: "bold",
    color: mainColor,
    cursor: "pointer",
    padding: "8px 16px",
    backgroundColor: tokens.colorNeutralBackground1,
    border: "none",
    borderRadius: "15px",
    textAlign: "center",
    transition: "background-color 0.3s",
    boxShadow: tokens.shadow2,
    [`@media (max-width: ${tabletWidth})`]: {
      display: "none",
    },
    [`@media (max-width: ${mobileWidth})`]: {
      display: "block",
      marginTop: "10px"
    },
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  subtitle: {
    marginLeft: "8px",
    color: mainColor,
    fontSize: "14px",
    fontWeight: "bold",
    [`@media (max-width: ${tabletWidth})`]: {
      display: "none"
    },
    [`@media (max-width: ${mobileWidth})`]: {
      display: "block"
    },
  },
  list: {
    height: "100%",
    marginTop: "18px",
    borderRadius: "20px",
    boxShadow: Depths.depth16,
    overflow: "auto",
        // "::-webkit-scrollbar": {
    //   display: "none"
    // }
    [`@media (max-width: ${tabletWidth})`]: {
      marginTop: "0px",
      borderRadius: "0px",
    },
    [`@media (max-width: ${mobileWidth})`]: {
      height: "60vh",
      borderRadius: 0,
      boxShadow: "none"
    },
  },
  empty: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px"
  },
  contentImage: {
    width: "170px",
    height: "170px",
    marginTop: "40px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: "30px",
    [`@media (max-width: ${tabletWidth})`]: {
      marginTop: "160px",
    },
    [`@media (max-width: ${mobileWidth})`]: {
      marginTop: "auto",
    },
  },
  contentTexts: {
    marginTop: "32px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    fontWeight: "bold",
    alignItems: "flex-start"
  },
  contentMain: {
    fontSize: "24px",
    lineHeight: "36px",
    color: tokens.colorNeutralForeground2
  },
  contentSub: {
    fontSize: "16px",
    lineHeight: "10px",
    color: mainColor
  },
  contentInfo: {
    fontSize: "16px",
    lineHeight: "10px",
    color: tokens.colorNeutralStroke1
  },
  contentInfo02: {
    width: "25vw",
    height: "160px",
    backgroundColor: tokens.colorNeutralBackground1Hover,
    borderRadius: "30px 30px 30px 30px",
    padding: "24px",
    color: tokens.colorNeutralForeground3Hover
  },
  spinner: {
    margin: "16px",
    "&>span": {
      backgroundColor: tokens.colorPaletteLightGreenBackground2
    }
  }
});

function ItemList() {
  const styles = useStyles();
  const navigate = useNavigate();

  const {
    selectedMarker,
    placeItemList,
    showLostGoods,
    setSelectedMarker,
    setPlaceItemList
  } = useMainStore();

  const { userId } = useAuthStore();

  const [page, setPage] = useState<number>(0);
  const [isEndOfPage, setIsEndOfPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const renderList = () => {
    if (showLostGoods) {
      return (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Image
            className={styles.contentImage}
            fit="contain"
            src="./img105.png"
          />
          <div className={styles.contentTexts}>
            <div className={styles.contentMain}>{selectedMarker?.name}</div>
            <div className={styles.contentSub}>
              {`분실일자: ${selectedMarker?.date}`}
            </div>
            <div className={styles.contentInfo}>
                {`물품분류: ${selectedMarker?.category}`}
            </div>
            <div className={styles.contentInfo}>
              {`분실장소: ${selectedMarker?.address}`}
            </div>
            <div className={styles.contentInfo02}>
              {`내용: ${selectedMarker?.info}`}
            </div>
          </div>
          {userId !== selectedMarker?.userId && (
            <Button
              style={{ marginTop: "auto", marginBottom: "10px" }}
              onClick={() => {
                navigate("/chat", {
                  state: {
                    targetId: `${selectedMarker?.userId}`
                  }
                });
              }}
            >
              연락하기
            </Button>
          )}
        </div>
      );
    } else if (placeItemList.length == 0 && isEndOfPage) {
      return (
        <div className={styles.empty}>
          <BookExclamationMarkRegular fontSize="128px" />
          <div>습득물이 없습니다.</div>
        </div>
      );
    } else {
      return (
        <>
          {placeItemList.map((item) => (
            <Item
              key={item._id}
              address={item.fdYmd}
              category={item.prdtClNm}
              img={item.fdFilePathImg}
              item={item}
              name={item.fdPrdtNm}
            />
          ))}
          <div ref={scrollRef}>
            {isLoading ? (
              <Spinner className={styles.spinner} />
            ) : (
              <div style={{ height: "1px" }} />
            )}
          </div>
        </>
      );
    }
  };

  const getItems = () => {
    setIsLoading(true);
    if (selectedMarker) {
      placeLostFound(selectedMarker.name, page)
        .then((data) => {
          if (data.length > 0) {
            setPlaceItemList([...placeItemList, ...data]);
            setPage(page + 1);
          } else {
            setIsEndOfPage(true);
          }
        })
        .catch((e: AxiosError) => {
          console.error(e);
          setIsEndOfPage(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const scrollRef = useIntersect((entry, observer) => {
    observer.unobserve(entry.target);
    if (!isEndOfPage && !isLoading) {
      getItems();
    }
  });

  useEffect(() => {
    setPlaceItemList([]);
    setPage(0);
    setIsEndOfPage(false);
  }, [selectedMarker]);

  return (
    <div className={styles.root}>
      <div className={styles.subtitle}>
        {`선택한 ${showLostGoods ? "분실물" : "장소"}`}
      </div>
      <div className={styles.title}>
        <div className={styles.titleText}>{selectedMarker?.name}</div>
        <div
          className={styles.titleBack}
          onClick={() => {
            setSelectedMarker(undefined);
          }}
        >
          {`다른 ${showLostGoods ? "분실물" : "장소"}보기`}
        </div>
      </div>
      <Card className={`${styles.list}`}>{renderList()}</Card>
    </div>
  );
}

export default ItemList;
