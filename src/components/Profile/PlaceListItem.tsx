import { tokens, makeStyles, Image } from "@fluentui/react-components";
import { createSearchParams, useNavigate } from "react-router-dom";

import { BookMark } from "../../apis/bookmark";
import useMainStore from "../../stores/main";
import usePositionStore from "../../stores/position";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "30px",
    padding: "20px 44px 20px 44px",
    backgroundColor: tokens.colorNeutralBackground1Hover,
    cursor: "pointer"
  },
  imageContainer: {
    marginRight: "20px"
  },
  textContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  placeTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    color: tokens.colorNeutralForeground1,
    marginBottom: "10px"
  },
  placeDetail: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground3
  }
});

interface PlaceListProps {
  img?: string;
  bookmark?: BookMark;
}

function PlaceListItem({ img, bookmark }: PlaceListProps) {
  const styles = useStyles();
  const navigate = useNavigate();
  const { setSelectedMarker, setShowLostGoods } = useMainStore();
  const { setLatitude, setLongitude, setZoomLevel } = usePositionStore();

  const handlePlaceClick = () => {
    if (bookmark) {
      setSelectedMarker(undefined);
      setShowLostGoods(false);
      setLatitude(bookmark.lat);
      setLongitude(bookmark.lng);
      setZoomLevel(3);
      navigate({
        pathname: "/",
        search: createSearchParams({
          place: bookmark.location
        }).toString()
      });
    }
  };

  return (
    <div
      className={styles.root}
      onClick={() => {
        handlePlaceClick();
      }}
    >
      <div className={styles.imageContainer}>
        <Image
          shape="circular"
          src={img || "/profileIMGimsi.png"}
          style={{ width: "85px", height: "85px" }}
        />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.placeTitle}>{bookmark?.location}</div>
        <div className={styles.placeDetail}>{bookmark?.address}</div>
      </div>
    </div>
  );
}

export default PlaceListItem;
