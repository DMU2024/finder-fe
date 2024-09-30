import { makeStyles, tokens } from "@fluentui/react-components";
import { GlobeLocationRegular } from "@fluentui/react-icons";

import PlaceListItem from "./PlaceListItem";
import useGlobalStore from "../../stores/global";

const useStyles = makeStyles({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  title: {
    color: tokens.colorNeutralForeground1,
    fontWeight: "bold",
    fontSize: "24px",
    marginBottom: "10px"
  },
  empty: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
});

interface ProfilePlaceProps {
  img?: string;
}

function ProfilePlace({ img }: ProfilePlaceProps) {
  const styles = useStyles();
  const { bookmarkMap } = useGlobalStore();

  return (
    <div className={styles.root}>
      <div className={styles.title}>장소 바로가기</div>
      {bookmarkMap.size > 0 ? (
        Array.from(bookmarkMap.values()).map((bookmark) => (
          <PlaceListItem
            key={bookmark.id}
            bookmark={bookmark}
            img={img || "/profilePlaceIcon.png"}
          />
        ))
      ) : (
        <div className={styles.empty}>
          <GlobeLocationRegular fontSize={128} />
          <div>즐겨찾기한 장소가 없습니다.</div>
        </div>
      )}
    </div>
  );
}

export default ProfilePlace;
