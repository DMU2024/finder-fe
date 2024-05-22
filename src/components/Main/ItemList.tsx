import { Depths } from "@fluentui/react";
import { Card, makeStyles } from "@fluentui/react-components";
import { BookExclamationMarkRegular } from "@fluentui/react-icons";

import Item from "./Item";
import useItemListStore from "../../stores/itemList";
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
  const { itemList } = useItemListStore();

  return (
    <div className={styles.root}>
      <div className={styles.subtitle}>현재 지역</div>
      <div className={styles.title}>최근 습득물 목록</div>
      <Card className={styles.list}>
        {itemList.length > 0 ? (
          itemList.map(({ lat, lng, category }, index) => (
            <Item
              key={index}
              address={`${lat} ${lng}`}
              category={category}
              name={category}
            />
          ))
        ) : (
          <div className={styles.empty}>
            <BookExclamationMarkRegular fontSize="128px" />
            <div>습득물이 없습니다.</div>
          </div>
        )}
      </Card>
    </div>
  );
}

export default ItemList;
