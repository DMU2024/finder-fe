import React from 'react';
import { tokens, makeStyles } from '@fluentui/react-components';
import { mainColor, skeletonColor } from '../../styles/color';

import PlaceList from '../Profile/PlaceList';

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // alignItems: "center",
    width: "28vw",
    height: "540px",
    marginLeft: "20px",
    // color: tokens.colorNeutralForegroundInverted,
    // backgroundColor: tokens.colorNeutralForeground1
  },
  title: {
    color: skeletonColor,
    fontWeight: "bold",
    fontSize: "24px",
    marginBottom: "30px",
  },
});

interface ProfilePlaceProps {
  img?: string;
}

const ProfilePlace: React.FC<ProfilePlaceProps> = ({ img }) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.title}>장소 바로가기</div>
      <PlaceList img={img || '/profilePlaceIcon.png'} />
      <PlaceList img={img || '/profilePlaceIcon.png'} />
      <PlaceList img={img || '/profilePlaceIcon.png'} />
    </div>
  );
};

export default ProfilePlace;
