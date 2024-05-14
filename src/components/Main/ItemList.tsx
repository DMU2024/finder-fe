import { Depths } from "@fluentui/react";
import { Card, makeStyles } from "@fluentui/react-components";

import Item from "./Item";
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
  }
});

function ItemList() {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.subtitle}>현재 지역</div>
      <div className={styles.title}>최근 습득물 목록</div>
      <Card className={styles.list}>
        <Item />
        <Item />
        <Item />
        <Item />
      </Card>
    </div>
  );
}

export default ItemList;
