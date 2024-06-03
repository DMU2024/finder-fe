import { Divider, Image, makeStyles, tokens } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";

import { LostFound } from "../../apis/lostfound";
import { mainColor } from "../../styles/color";

const useStyle = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  itemTop: {
    display: "flex",
    gap: "16px"
  },
  itemBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
    gap: "8px"
  },
  itemName: {
    fontSize: "20px",
    fontWeight: "bold",
    color: tokens.colorNeutralForeground1
  },
  itemDescription: {
    fontSize: "14px",
    fontWeight: "bold",
    color: tokens.colorNeutralForeground4
  },
  itemDetail: {
    marginLeft: "auto",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "bold",
    color: mainColor,
    cursor: "pointer"
  }
});

interface ItemProps {
  name: string;
  address: string;
  category: string;
  img?: string;
  item?: LostFound;
}

function Item({ name, address, category, img, item }: ItemProps) {
  const styles = useStyle();
  const navigate = useNavigate();

  return (
    <div>
      <div className={styles.root}>
        <div className={styles.itemTop}>
          <Image
            fit="contain"
            src={img ? img : "/logo192.png"}
            style={{ width: "192px", height: "192px" }}
          />
          <div className={styles.itemBox}>
            <div className={styles.itemName}>{name}</div>
            <div className={styles.itemDescription}>{address}</div>
            <div className={styles.itemDescription}>{category}</div>
          </div>
        </div>
        <div
          className={styles.itemDetail}
          onClick={() => {
            if (item) {
              navigate(`/detail/${item.atcId}?fdSn=${item.fdSn}`);
            }
          }}
        >
          {"상세보기 >"}
        </div>
      </div>
      <Divider />
    </div>
  );
}

export default Item;
