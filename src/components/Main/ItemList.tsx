import { Depths } from "@fluentui/react";
import { Card, makeStyles } from "@fluentui/react-components";
import { BookExclamationMarkRegular } from "@fluentui/react-icons";

import Item from "./Item";
import useMainStore from "../../stores/main";
import { mainColor } from "../../styles/color";
import { contentMargin, headerHeight } from "../../styles/margin";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: `calc(100vh - ${headerHeight} - ${contentMargin})`
  },
  title: {
    marginLeft: "8px",
    fontSize: "20px",
    fontWeight: "bold"
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
    "::-webkit-scrollbar": {
      display: "none"
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

function ItemList() {
  const styles = useStyles();
  const { mockList, placeItemList, selectedPlace, showLostGoods } =
    useMainStore();

  const renderEmpty = () => {
    return (
      <div className={styles.empty}>
        <BookExclamationMarkRegular fontSize="128px" />
        <div>{`${showLostGoods ? "분실물" : "습득물"}이 없습니다.`}</div>
      </div>
    );
  };

  const renderList = () => {
    if (selectedPlace) {
      return placeItemList.length > 0
        ? placeItemList.map((item) => (
            <Item
              key={item._id}
              address={item.fdYmd}
              category={item.prdtClNm}
              img={item.fdFilePathImg}
              item={item}
              name={item.fdPrdtNm}
            />
          ))
        : renderEmpty();
    } else {
      return mockList.length > 0
        ? mockList.map(({ name, address, category }) => (
            <Item
              key={name}
              address={address}
              category={category}
              name={name}
            />
          ))
        : renderEmpty();
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.subtitle}>현재 지역</div>
      <div
        className={styles.title}
      >{`${showLostGoods ? "분실물 목록" : "습득물 보관장소"}`}</div>
      <Card className={styles.list}>{renderList()}</Card>
    </div>
  );
}

export default ItemList;
