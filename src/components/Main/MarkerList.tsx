import { Depths } from "@fluentui/react";
import { Card, makeStyles } from "@fluentui/react-components";
import { BookExclamationMarkRegular } from "@fluentui/react-icons";

import Item from "@/components/Main/Item";
import useGlobalStore from "@/stores/global";
import useMainStore from "@/stores/main";
import { mainColor } from "@/styles/color";
import { contentMargin, headerHeight } from "@/styles/margin";
import { mobileWidth, tabletWidth } from "@/styles/size";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: `calc(100dvh - ${headerHeight} - ${contentMargin})`,
    [`@media (max-width: ${tabletWidth})`]: {
      height: `calc(100dvh - ${headerHeight})`
    },
    [`@media (max-width: ${mobileWidth})`]: {
      height: "auto",
      marginTop: "10px"
    }
  },
  title: {
    marginLeft: "8px",
    fontSize: "20px",
    fontWeight: "bold",
    [`@media (max-width: ${tabletWidth})`]: {
      display: "none"
    },
    [`@media (max-width: ${mobileWidth})`]: {
      display: "block"
    }
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
    }
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
      borderRadius: "0px"
    },
    [`@media (max-width: ${mobileWidth})`]: {
      height: "75vh",
      borderRadius: 0,
      boxShadow: "none",
      marginTop: "10px"
    }
  },
  empty: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px"
  }
});

interface Props {
  handleBookmark: (name: string) => void;
}

function MarkerList({ handleBookmark }: Props) {
  const styles = useStyles();
  const { markerList, showLostGoods } = useMainStore();
  const { bookmarkMap } = useGlobalStore();

  const renderList = () => {
    if (markerList.length > 0) {
      return markerList.map((marker, index) => (
        <Item
          key={index}
          address={marker.address}
          category={marker.category}
          handleBookmark={handleBookmark}
          isBookmarked={bookmarkMap.has(marker.name)}
          marker={marker}
          name={marker.name}
        />
      ));
    } else {
      return (
        <div className={styles.empty}>
          <BookExclamationMarkRegular fontSize="128px" />
          <div>{`${showLostGoods ? "분실물" : "습득물"}이 없습니다.`}</div>
        </div>
      );
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.subtitle}>현재 지역</div>
      <div className={styles.title}>{`${showLostGoods ? "분실물 목록" : "습득물 보관장소"}`}</div>
      <Card className={styles.list}>{renderList()}</Card>
    </div>
  );
}

export default MarkerList;
