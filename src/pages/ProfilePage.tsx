import { useState } from "react";
import { makeStyles, tokens } from "@fluentui/react-components";

import ProfileInfo from "../components/Profile/ProfileInfo";
import ProfileKey from "../components/Profile/ProfileKey";
import ProfilePlace from "../components/Profile/ProfilePlace";
import ProfileWrite from "../components/Profile/ProfileWrite";

const useStyles = makeStyles({
  root: {
    position: "relative",
    width: "100%",
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  backgroundBox: {
    position: "absolute",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    width: "75vw",
    height: "860px",
    bottom: 0,
    borderRadius: "30px 30px 0px 0px",
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow16,
    zIndex: 0,
  },
  InfoContainer: {
    zIndex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  contentDetail: {
    width: "100%",
    marginTop: "180px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row-reverse",
    marginRight: "100px"
  },
  button: {
    width: "100px",
    height: "50px",
    marginBottom: "12px",
    padding: "20px 30px",
    backgroundColor: tokens.colorBrandBackground,
    color: "white",
    border: tokens.colorBrandBackground,
    borderRadius: "50px",
    fontSize: "16px",
    boxShadow: tokens.shadow4,
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: tokens.colorBrandBackgroundHover
    },
    "&:active": {
      backgroundColor: tokens.colorBrandBackgroundPressed
    }
  }
});

function ProfilePage() {
  const styles = useStyles();
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className={styles.root}>
      <div className={styles.InfoContainer}>
        <ProfileInfo />
      </div>
      <div className={styles.backgroundBox}>
        <div className={styles.contentDetail}>

          {currentPage === 1 && (
            <>
              <div>
                <ProfileKey />
              </div>
              <div>
                <ProfilePlace />
              </div>
            </>
          )}
          {currentPage === 2 && (
            <div>
              <ProfileWrite />
            </div>
          )}
        </div>

        <div className={styles.btnContainer}>
          {currentPage > 1 && (
            <button className={styles.button} onClick={() => setCurrentPage(currentPage - 1)}>
              이전
            </button>
          )}
          {currentPage < 2 && (
            <button className={styles.button} onClick={() => setCurrentPage(currentPage + 1)}>
              다음
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
