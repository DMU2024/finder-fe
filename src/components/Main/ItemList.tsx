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
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Item from "./Item";
import { placeLostFound } from "../../apis/lostfound";
import useDebounce from "../../hooks/useDebounce";
import useIntersect from "../../hooks/useIntersect";
import useAuthStore from "../../stores/auth";
import useMainStore from "../../stores/main";
import { mainColor } from "../../styles/color";
import { contentMargin, headerHeight } from "../../styles/margin";
import { mobileWidth } from "../../styles/size";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: `calc(100vh - ${headerHeight} - ${contentMargin})`,
    [`@media (max-width: ${mobileWidth})`]: {
      height: "auto"
    }
  },
  title: {
    display: "flex"
  },
  titleText: {
    marginLeft: "8px",
    fontSize: "20px",
    fontWeight: "bold"
  },
  titleBack: {
    marginLeft: "auto",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer"
  },
  subtitle: {
    marginLeft: "8px",
    color: mainColor,
    fontSize: "14px",
    fontWeight: "bold"
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
    [`@media (max-width: ${mobileWidth})`]: {
      height: "70vh", // 모바일에서 높이 축소
      borderRadius: 0, // 모서리 둥글기 제거
      boxShadow: "none"
    }
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
    width: "200px",
    height: "200px",
    backgroundColor: tokens.colorNeutralBackground3
  },
  contentTexts: {
    marginTop: "32px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    fontWeight: "bold",
    alignItems: "center"
  },
  contentMain: {
    fontSize: "48px",
    lineHeight: "48px",
    color: tokens.colorNeutralForeground2
  },
  contentSub: {
    fontSize: "24px",
    lineHeight: "24px",
    color: mainColor
  },
  contentInfo: {
    fontSize: "20px",
    color: tokens.colorNeutralStroke1
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
  const didMount = useRef(false);

  const {
    selectedMarker,
    placeItemList,
    showLostGoods,
    setSelectedMarker,
    setPlaceItemList
  } = useMainStore();

  const { page, setPage, scrollTop, setScrollTop } = useMainStore();

  const listRef = useRef<HTMLDivElement | null>(null);

  const debounce = useDebounce();
  const saveScroll = debounce(() => {
    setScrollTop(listRef.current?.scrollTop ?? scrollTop);
  }, 50);

  const { userId } = useAuthStore();

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
            src="./logo192.png"
          />
          <div className={styles.contentTexts}>
            <div className={styles.contentMain}>{selectedMarker?.name}</div>
            <div className={styles.contentSub}>
              {`분실일자: ${selectedMarker?.date}`}
            </div>
            <div
              className={styles.contentInfo}
            >{`물품분류: ${selectedMarker?.category}`}</div>
            <div
              className={styles.contentInfo}
            >{`분실장소: ${selectedMarker?.address}`}</div>
            <div
              className={styles.contentInfo}
            >{`내용: ${selectedMarker?.info}`}</div>
          </div>
          {userId !== selectedMarker?.userId && (
            <Button
              style={{ marginTop: "auto" }}
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
    if (listRef.current) {
      listRef.current.scrollTo({ top: scrollTop });
    }
  }, []);

  useEffect(() => {
    if (didMount.current) {
      setPlaceItemList([]);
      setPage(0);
      setIsEndOfPage(false);
    } else {
      didMount.current = true;
    }
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
      <Card ref={listRef} className={styles.list} onScroll={saveScroll}>
        {renderList()}
      </Card>
    </div>
  );
}

export default ItemList;
