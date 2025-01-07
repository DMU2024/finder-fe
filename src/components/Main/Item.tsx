import { Divider, Image, makeStyles, tokens } from "@fluentui/react-components";
import { Star32Filled, Star32Regular } from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";

import { LostFound } from "../../apis/lostfound";
import { Marker } from "../../apis/marker";
import useMainStore from "../../stores/main";
import { mainColor } from "../../styles/color";
import { mobileWidth } from "../../styles/size";
import { unescapeHtml } from "../../utils/format";

const useStyle = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: "10px"
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
    gap: "8px",
    minWidth: 0,
    "&>*": {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis"
    }
  },
  itemName: {
    fontSize: "18px",
    fontWeight: "bold",
    color: tokens.colorNeutralForeground1,
    [`@media (max-width: ${mobileWidth})`]: {
      fontSize: "16px"
    }
  },
  itemDescription: {
    fontSize: "12px",
    fontWeight: "bold",
    color: mainColor,
    [`@media (max-width: ${mobileWidth})`]: {
      fontSize: "11px"
    }
  },
  itemDescription02: {
    fontSize: "12px",
    fontWeight: "bold",
    color: tokens.colorNeutralForeground4,
    [`@media (max-width: ${mobileWidth})`]: {
      fontSize: "11px"
    }
  },
  itemDetail: {
    marginLeft: "auto",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "bold",
    color: mainColor,
    cursor: "pointer",
    [`@media (max-width: ${mobileWidth})`]: {
      fontSize: "11px"
    }
  }
});

interface ItemProps {
  name: string;
  address: string;
  category: string;
  img?: string;
  marker?: Marker;
  item?: LostFound;
  isBookmarked?: boolean;
  handleBookmark?: (name: string) => void;
}

function Item({
  name,
  address,
  category,
  img,
  marker,
  item,
  isBookmarked,
  handleBookmark
}: ItemProps) {
  const styles = useStyle();
  const navigate = useNavigate();

  const { setSelectedMarker, showLostGoods } = useMainStore();

  const renderBookmark = () => {
    if (marker && !showLostGoods) {
      return (
        <div
          style={{
            cursor: "pointer",
            height: "100%"
          }}
          onClick={() => {
            if (handleBookmark) {
              handleBookmark(name);
            }
          }}
        >
          {isBookmarked ? <Star32Filled color="orange" /> : <Star32Regular />}
        </div>
      );
    }
  };

  return (
    <div>
      <div className={styles.root}>
        <div className={styles.itemTop}>
          <Image
            fit="contain"
            src={img ? img : "/img105.png"}
            style={{
              width: "112px",
              height: "112px",
              marginTop: "5px",
              borderRadius: "30px",
              backgroundColor: tokens.colorNeutralBackground1Hover
            }}
          />
          <div className={styles.itemBox}>
            <div className={styles.itemDescription}>{category}</div>
            <div className={styles.itemName}>{unescapeHtml(name)}</div>
            <div className={styles.itemDescription02}>{address}</div>
          </div>
          {renderBookmark()}
        </div>

        <div
          className={styles.itemDetail}
          onClick={() => {
            if (marker) {
              setSelectedMarker(marker);
            }
            if (item) {
              navigate(`/detail/${item.atcId}-${item.fdSn}`);
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
