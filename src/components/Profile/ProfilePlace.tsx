import { makeStyles, tokens } from "@fluentui/react-components";
import { GlobeLocationRegular } from "@fluentui/react-icons";

import ProfilePlaceListItem from "./ProfilePlaceListItem";
import useGlobalStore from "../../stores/global";
import { mobileWidth } from "../../styles/size";

const useStyles = makeStyles({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    [`@media (max-width: ${mobileWidth})`]: {
      height: "40vh"
    }
  },
  title: {
    color: tokens.colorNeutralForeground1,
    fontWeight: "bold",
    fontSize: "24px",
    marginBottom: "10px",
    [`@media (max-width: ${mobileWidth})`]: {
      fontSize: "20px",
      paddingLeft: "6vw"
    }
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
          <ProfilePlaceListItem
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
