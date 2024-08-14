import { makeStyles } from "@fluentui/react-components";
import React from "react";

import { skeletonColor } from "../../../styles/color";
import PlaceList from "../PlaceList";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // alignItems: "center",
    width: "30vw",
    height: "540px",
    marginLeft: "20px"
    // color: tokens.colorNeutralForegroundInverted,
    // backgroundColor: tokens.colorNeutralForeground1
  },
  title: {
    color: skeletonColor,
    fontWeight: "bold",
    fontSize: "24px",
    marginBottom: "30px"
  }
});

interface ProfilePlaceProps {
  img?: string;
}

const ProfilePlaceEdit: React.FC<ProfilePlaceProps> = ({ img }) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.title}>즐겨찾기 장소 수정</div>
      <PlaceList img={img || "/profilePlaceIcon.png"} />
      <PlaceList img={img || "/profilePlaceIcon.png"} />
      <PlaceList img={img || "/profilePlaceIcon.png"} />
    </div>
  );
};

export default ProfilePlaceEdit;
