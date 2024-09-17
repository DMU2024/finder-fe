import { makeStyles, tokens } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProfileDetailEdit from "../components/Profile/Edit/ProfileDetailEdit";
import ProfilePlaceEdit from "../components/Profile/Edit/ProfilePlaceEdit";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileKeyword from "../components/Profile/ProfileKeyword";
import ProfilePlace from "../components/Profile/ProfilePlace";
import ProfileWrite from "../components/Profile/ProfileWrite";
import { useAuthStore } from "../stores/auth";

const useStyles = makeStyles({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    borderRadius: "30px 30px 0px 0px",
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow16,
    paddingLeft: "120px",
    paddingRight: "120px"
  },
  content: {
    flex: 1,
    display: "flex"
  },
  left: {
    width: "55%"
  },
  right: {
    width: "45%"
  }
});

function ProfilePage() {
  const styles = useStyles();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const { userId } = useAuthStore();

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  }, [userId]);

  const handleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <div className={styles.root}>
      <ProfileHeader handleEditMode={handleEditMode} />
      <div className={styles.content}>
        <div className={isEditMode ? styles.right : styles.left}>
          {isEditMode ? <ProfilePlaceEdit /> : <ProfileKeyword />}
        </div>
        <div className={isEditMode ? styles.left : styles.right}>
          {isEditMode ? <ProfileDetailEdit /> : <ProfilePlace />}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
