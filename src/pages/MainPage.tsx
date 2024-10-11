import { makeStyles } from "@fluentui/react-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  BookMark,
  deleteBookMark,
  getBookMark,
  postBookMark
} from "../apis/bookmark";
import ItemList from "../components/Main/ItemList";
import ItemModal from "../components/Main/ItemModal";
import KakaoMap from "../components/Main/KakaoMap";
import MarkerList from "../components/Main/MarkerList";
import useAuthStore from "../stores/auth";
import useGlobalStore from "../stores/global";
import useMainStore from "../stores/main";
import { mobileWidth } from "../styles/size";

const useStyles = makeStyles({
  root: {
    flex: 1,
    position: "relative",
    [`@media (max-width: ${mobileWidth})`]: {
      padding: 0
    }
  },
  content: {
    display: "flex",
    gap: "32px",
    [`@media (max-width: ${mobileWidth})`]: {
      display: "block"
    }
  },
  left: {
    width: "40%",
    [`@media (max-width: ${mobileWidth})`]: {
      display: "none"
    }
  },
  right: {
    width: "60%",
    [`@media (max-width: ${mobileWidth})`]: {
      width: "100%",
      height: "100vh",
      position: "relative"
    }
  }
});

function MainPage() {
  const styles = useStyles();
  const navigate = useNavigate();
  const { selectedMarker } = useMainStore();
  const { bookmarkMap, setBookmarkMap } = useGlobalStore();
  const { userId } = useAuthStore();

  const handleBookmark = (name: string) => {
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

  useEffect(() => {
    if (userId) {
      getBookMark(userId).then((res) => {
        const temp = new Map<string, BookMark>();
        res.map((bookmark) => temp.set(bookmark.location, bookmark));
        setBookmarkMap(temp);
      });
    }
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div className={styles.left}>
          {selectedMarker ? (
            <ItemList />
          ) : (
            <MarkerList handleBookmark={handleBookmark} />
          )}
        </div>
        <div className={styles.right}>
          <KakaoMap handleBookmark={handleBookmark} />
        </div>
      </div>

      <ItemModal handleBookmark={handleBookmark} />
    </div>
  );
}

export default MainPage;
