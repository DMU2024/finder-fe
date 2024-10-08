import { Divider, Image, makeStyles, tokens } from "@fluentui/react-components";
import { Star32Filled, Star32Regular } from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";

import { deleteBookMark, postBookMark } from "../../apis/bookmark";
import { LostFound } from "../../apis/lostfound";
import { Marker } from "../../apis/marker";
import { useAuthStore } from "../../stores/auth";
import useGlobalStore from "../../stores/global";
import useMainStore from "../../stores/main";
import { mainColor } from "../../styles/color";

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
    gap: "8px"
  },
  itemName: {
    fontSize: "20px",
    fontWeight: "bold",
    color: tokens.colorNeutralForeground1,
    "@media (max-width: 390px)": {
      fontSize: "16px",
    },
  },
  itemDescription: {
    fontSize: "14px",
    fontWeight: "bold",
    color: tokens.colorNeutralForeground4,
    "@media (max-width: 390px)": {
      fontSize: "11px",
    },
  },
  itemDetail: {
    marginLeft: "auto",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "bold",
    color: mainColor,
    cursor: "pointer",
    "@media (max-width: 390px)": {
      fontSize: "11px",
    },
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
}

function Item({
  name,
  address,
  category,
  img,
  marker,
  item,
  isBookmarked
}: ItemProps) {
  const styles = useStyle();
  const navigate = useNavigate();

  const { setSelectedMarker } = useMainStore();
  const { bookmarkMap, setBookmarkMap } = useGlobalStore();
  const { userId } = useAuthStore();

  const handleBookmark = () => {
    if (userId) {
      if (!bookmarkMap.has(name)) {
        if (bookmarkMap.size >= 3) {
          alert("즐겨찾기는 최대 3개까지 가능합니다.");
          return;
        }

        postBookMark(userId, name).then((res) => {
          const temp = new Map(bookmarkMap);
          temp.set(res.location, res);
          setBookmarkMap(temp);
        });
      } else {
        const bookmarkId = bookmarkMap.get(name)?.id;

        if (bookmarkId) {
          deleteBookMark(bookmarkId).then(() => {
            const temp = new Map(bookmarkMap);
            temp.delete(name);
            setBookmarkMap(temp);
          });
        }
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <div className={styles.root}>
        <div className={styles.itemTop}>
          <Image
            fit="contain"
            src={img ? img : "/img105.png"}
            style={{ width: "112px", height: "112px" }}
          />
          <div className={styles.itemBox}>
            <div className={styles.itemName}>{name}</div>
            <div className={styles.itemDescription}>{address}</div>
            <div className={styles.itemDescription}>{category}</div>
          </div>
          <div
            style={{
              cursor: "pointer",
              height: "100%"
            }}
            onClick={() => {
              handleBookmark();
            }}
          >
            {isBookmarked ? <Star32Filled color="orange" /> : <Star32Regular />}
          </div>
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
