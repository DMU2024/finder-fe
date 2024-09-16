import { makeStyles, tokens } from "@fluentui/react-components";

import ProfileDetailEdit from "../components/Profile/Edit/ProfileDetailEdit";
import ProfileInfoEdit from "../components/Profile/Edit/ProfileInfoEdit";
import ProfilePlaceEdit from "../components/Profile/Edit/ProfilePlaceEdit";

const useStyles = makeStyles({
  root: {
    position: "relative",
    width: "100%",
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
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
    zIndex: 0
  },
  InfoContainer: {
    zIndex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  contentDetail: {
    width: "100%",
    marginTop: "180px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  flex: {
    display: "flex"
  }
});

function ProfileEditPage() {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.InfoContainer}>
        <ProfileInfoEdit />
      </div>
      <div className={styles.backgroundBox}>
        <div className={styles.contentDetail}>
          <div className={styles.flex}>
            <div>
              <ProfilePlaceEdit />
            </div>
            <div>
              <ProfileDetailEdit />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileEditPage;
