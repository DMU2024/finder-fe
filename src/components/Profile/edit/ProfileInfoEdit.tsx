import * as React from "react";
import { DefaultButton } from "@fluentui/react";
import { makeStyles, Image, tokens, Field, ProgressBar, ProgressBarProps, Input } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import { mainColor, skeletonColor } from "../../../styles/color";

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
    marginBottom: "12px",
  },
  id: {
    color: mainColor,
    fontSize: "16px"
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
  profile_02: {

  },
  hiddenInput: {
    display: "none"
  }
});

interface ProfileProps extends Partial<ProgressBarProps> {
  img?: string;
}

const ProfileInfoEdit: React.FC<ProfileProps> = ({ img, ...progressBarProps }) => {
  const styles = useStyles();
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = React.useState(img || "/profileIMGimsi.png");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.root}>
      <input
        type="file"
        accept="image/*"
        className={styles.hiddenInput}
        id="profile-image-upload"
        onChange={handleImageChange}
      />
      <label htmlFor="profile-image-upload">
        <Image
          src={imageSrc}
          style={{ width: "220px", height: "220px", cursor: "pointer" }}
          shape="circular"
        />
      </label> {/* 이미지 value 불러와야함. */}

      <div className={styles.profile}>
        <div className={styles.profile_01}>
          <div>
            <Input className={styles.nickname} placeholder="닉네임NickName" value="닉네임NickName" /> {/* 닉네임 value 불러와야함. */}
            <div className={styles.id}> @ id0123456789 </div>
          </div>

          <div>
            <DefaultButton
              text="프로필 수정"
              className={styles.profileChangeButton}
              onClick={() => navigate('/profile')}
            />
          </div>
        </div>

        <div className={styles.profile_02}>
          <Field validationState="none">
            <ProgressBar {...progressBarProps} value={0.3} thickness="large" />
          </Field>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoEdit;
