import { makeStyles, tokens } from "@fluentui/react-components";
import { useEffect, useState } from "react";

import { BookMark, getBookMark } from "../apis/bookmark";
import { getKakaoScopes, getUser, User } from "../apis/user";
import ProfileDetailEdit from "../components/Profile/Edit/ProfileDetailEdit";
import ProfileLostGoods from "../components/Profile/LostGoods/ProfileLostGoods";
import MobileProfilePage from "../components/Profile/MobileProfilePage";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileKeyword from "../components/Profile/ProfileKeyword";
import ProfilePlace from "../components/Profile/ProfilePlace";
import useAuthStore from "../stores/auth";
import useGlobalStore from "../stores/global";
import { headerMobileHeight } from "../styles/margin";
import { mobileWidth, tabletWidth } from "../styles/size";

const useStyles = makeStyles({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    borderRadius: "30px 30px 0px 0px",
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow16,
    paddingLeft: "120px",
    paddingRight: "120px",
    [`@media (max-width: ${tabletWidth})`]: {
      width: "100%",
      height: `calc(100vh - ${headerMobileHeight})`,
      flexDirection: "column",
      borderRadius: "0px 0px 0px 0px",
      paddingLeft: "0px",
      paddingRight: "0px",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: tokens.colorNeutralBackground2,
      boxShadow: "none"
    }
  },
  content: {
    flex: 1,
    display: "flex",
    [`@media (max-width: ${tabletWidth})`]: {
      display: "none"
    }
  },
  left: {
    width: "55%",
    [`@media (max-width: ${tabletWidth})`]: {
      width: "100%"
    }
  },
  right: {
    width: "45%",
    [`@media (max-width: ${tabletWidth})`]: {
      width: "100%"
    }
  },
  mobileContent: {
    display: "none",
    [`@media (max-width: ${tabletWidth})`]: {
      display: "block"
    }
  }
});

function ProfilePage() {
  const styles = useStyles();

  const [isEditMode, setIsEditMode] = useState(false);
  const [isLostGoodsMode, setIsLostGoodsMode] = useState(false);
  const [isMobileMode, setmobileMode] = useState(false);

  const [user, setUser] = useState<User>();
  const [isMessageAgreed, setIsMessageAgreed] = useState(false);

  const { setBookmarkMap } = useGlobalStore();
  const { userId } = useAuthStore();

  const numericMobileWidth = parseInt(tabletWidth, 10);

  useEffect(() => {
    if (userId) {
      getUser(userId).then((res) => {
        setUser(res);
      });
      getBookMark(userId).then((res) => {
        const temp = new Map<string, BookMark>();
        res.map((bookmark) => temp.set(bookmark.location, bookmark));
        setBookmarkMap(temp);
      });
      getKakaoScopes(userId).then((res) => {
        res.scopes.map((scope) => {
          if (scope.id === "talk_message") {
            setIsMessageAgreed(scope.agreed);
          }
        });
      });
    }
  }, []);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const toggleLostGoodsMode = () => {
    setIsLostGoodsMode(!isLostGoodsMode);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= numericMobileWidth) {
        setmobileMode(true);
      } else {
        setmobileMode(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderContent = () => {
    if (isMobileMode) {
      return (
        <div className={styles.mobileContent}>
          {isEditMode ? (
            <ProfileDetailEdit
              isMessageAgreed={isMessageAgreed}
              notifyOnlyBookmarked={user?.notifyOnlyBookmarked ?? false}
            />
          ) : (
            <MobileProfilePage />
          )}
        </div>
      );
    } else {
      if (isEditMode) {
        return (
          <div className={styles.content}>
            <ProfileDetailEdit
              isMessageAgreed={isMessageAgreed}
              notifyOnlyBookmarked={user?.notifyOnlyBookmarked ?? false}
            />
          </div>
        );
      } else if (isLostGoodsMode) {
        return (
          <div className={styles.content}>
            <ProfileLostGoods />
          </div>
        );
      } else
        return (
          <div className={styles.content}>
            <div className={styles.left}>
              <ProfileKeyword />
            </div>
            <div className={styles.right}>
              <ProfilePlace />
            </div>
          </div>
        );
    }
  };

  return (
    <div className={styles.root}>
      <ProfileHeader
        isMobileMode={isMobileMode}
        toggleEditMode={toggleEditMode}
        toggleLostGoodsMode={toggleLostGoodsMode}
        user={user}
      />
      {renderContent()}
    </div>
  );
}

export default ProfilePage;
