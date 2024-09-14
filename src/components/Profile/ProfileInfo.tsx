import { DefaultButton } from "@fluentui/react";
import {
  makeStyles,
  Image,
  tokens,
  Field,
  ProgressBar,
  ProgressBarProps
} from "@fluentui/react-components";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import { mainColor, skeletonColor } from "../../styles/color";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  profile: {
    marginLeft: "36px"
  },
  profile_01: {
    width: "50vw",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "20px"
  },
  nickname: {
    color: skeletonColor,
    fontWeight: "bold",
    fontSize: "32px",
    marginBottom: "12px"
  },
  id: {
    color: mainColor,
    fontSize: "16px"
  },
  achieveButton: {
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
  },
  profileChangeButton: {
    marginLeft: "12px",
    marginBottom: "12px",
    padding: "20px 30px",
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorBrandBackground,
    border: "white",
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
  },
  profile_02: {}
});

interface ProfileProps extends Partial<ProgressBarProps> {
  img?: string;
}

const ProfileInfo: React.FC<ProfileProps> = ({ img, ...progressBarProps }) => {
  const styles = useStyles();
  const navigate = useNavigate();

  return (
    <div className={styles.root}>
      <Image
        shape="circular"
        src={img ? img : "/profileIMGimsi.png"}
        style={{ width: "220px", height: "220px" }}
      />

      <div className={styles.profile}>
        <div className={styles.profile_01}>
          <div>
            <div className={styles.nickname}> 닉네임Nickname </div>
            <div className={styles.id}> @ id0123456789 </div>
          </div>

          <div>
            <DefaultButton
              className={styles.achieveButton}
              text="업적 확인"
              onClick={() => navigate("/achieve")}
            />
            <DefaultButton
              className={styles.profileChangeButton}
              text="프로필 수정"
              onClick={() => navigate("/profileedit")}
            />
          </div>
        </div>

        <div className={styles.profile_02}>
          <Field validationState="none">
            <ProgressBar {...progressBarProps} thickness="large" value={0.3} />
          </Field>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
