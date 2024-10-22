import { makeStyles, tokens } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BookMark, getBookMark } from "../apis/bookmark";
import { getKakaoScopes, getUser, User } from "../apis/user";
import ProfileDetailEdit from "../components/Profile/Edit/ProfileDetailEdit";
import ProfilePlaceEdit from "../components/Profile/Edit/ProfilePlaceEdit";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileKeyword from "../components/Profile/ProfileKeyword";
import ProfilePlace from "../components/Profile/ProfilePlace";
import MobileProfilePage from "../components/Profile/MobileProfilePage";
import ProfileWrite from "../components/Profile/ProfileWrite";
import { mobileWidth } from "../styles/size";
import { headerMobileHeight } from "../styles/margin";
import useAuthStore from "../stores/auth";
import useGlobalStore from "../stores/global";

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
    [`@media (max-width: ${mobileWidth})`]: {
      width: "100%",
      height: `calc(100vh - ${headerMobileHeight})`,
      flexDirection: "column",
      borderRadius: "0px 0px 0px 0px",
      paddingLeft: "0px",
      paddingRight: "0px",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: tokens.colorNeutralBackground2,
      boxShadow: "none",
    }
  },
  content: {
    flex: 1,
    display: "flex",
    [`@media (max-width: ${mobileWidth})`]: {
      display: "none",
    }
  },
  left: {
    width: "55%",
    [`@media (max-width: ${mobileWidth})`]: {
      width: "100%",
    }
  },
  right: {
    width: "45%",
    [`@media (max-width: ${mobileWidth})`]: {
      width: "100%",
    }
  },
  mobileContent: {
    display: "none",
    [`@media (max-width: ${mobileWidth})`]: {
      display: "block",
    }
  }
});

function ProfilePage() {
  const styles = useStyles();
  const [isEditMode, setIsEditMode] = useState(false);
  const [ismobileMode, setmobileMode] = useState(false);
  const [user, setUser] = useState<User>();
  const [isMessageAgreed, setIsMessageAgreed] = useState(false);
  const { setBookmarkMap } = useGlobalStore();
  const { userId } = useAuthStore();
  const numericMobileWidth = parseInt(mobileWidth, 10);

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

  const handleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= numericMobileWidth) {
        setmobileMode(true);
      } else {
        setmobileMode(false);
      }
    };
  
    window.addEventListener('resize', handleResize);
    
    handleResize();
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <div className={styles.root}>
      <ProfileHeader handleEditMode={handleEditMode} user={user} />

      <div className={ismobileMode ? styles.mobileContent : styles.content}>
        {ismobileMode ? (
          <>
            {isEditMode ? (
              <ProfileDetailEdit isMessageAgreed={isMessageAgreed} />
            ) : (
              <MobileProfilePage />
            )}
          </>
        ) : (
          <>
            <div className={isEditMode ? styles.right : styles.left}>
              {isEditMode ? <ProfilePlaceEdit /> : <ProfileKeyword />}
            </div>
            <div className={isEditMode ? styles.left : styles.right}>
              {isEditMode ? (
                <ProfileDetailEdit isMessageAgreed={isMessageAgreed} />
              ) : (
                <ProfilePlace />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
