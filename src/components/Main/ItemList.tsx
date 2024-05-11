import { Card, makeStyles } from "@fluentui/react-components";

import Item from "./Item";
import { contentMargin, headerHeight } from "../../styles/margin";

const useStyles = makeStyles({
  root: {
    height: `calc(100vh - ${headerHeight} - ${contentMargin} - 72px)`
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold"
  },
  subtitle: {
    fontSize: "16px",
    fontWeight: "bold"
  },
  list: {
    height: "100%",
    marginTop: "18px",
    borderRadius: "24px",
    overflow: "auto"
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
