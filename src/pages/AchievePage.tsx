import { useState } from "react";
import { Icon } from "@fluentui/react";
import { makeStyles, tokens, Image, Dialog, DialogSurface, DialogTitle, DialogContent } from "@fluentui/react-components";

import { mainColor, skeletonColor } from '../styles/color';

import ProfileInfo from "../components/Profile/ProfileInfo";

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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  title: {
    color: skeletonColor,
    fontWeight: "bold",
    fontSize: "24px",
    marginBottom: "30px",
  },
  overlayIcon01: {
    position: "absolute",
    top: "200px", // 조정 필요
    left: "400px", // 조정 필요
    fontSize: "40px", // 아이콘 크기 조정
    color: mainColor, // 아이콘 색상
    cursor: "pointer",
  },
  overlayIcon02: {
    position: "absolute",
    top: "500px", // 조정 필요
    left: "800px", // 조정 필요
    fontSize: "40px", // 아이콘 크기 조정
    color: mainColor, // 아이콘 색상
    cursor: "pointer",
  },
  overlayIcon03: {
    position: "absolute",
    top: "190px", // 조정 필요
    left: "1100px", // 조정 필요
    fontSize: "40px", // 아이콘 크기 조정
    color: mainColor, // 아이콘 색상
    cursor: "pointer",
  },
  overlayIcon04: {
    position: "absolute",
    top: "280px", // 조정 필요
    left: "1000px", // 조정 필요
    fontSize: "40px", // 아이콘 크기 조정
    color: mainColor, // 아이콘 색상
    cursor: "pointer",
  },
  right: {
    alignSelf: "flex-end", // 오른쪽으로 밀기 위한 설정
    marginRight: "100px", // 오른쪽 여백 설정 (필요에 따라 조정 가능)
  },
  circle: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: mainColor,
    marginRight: "8px",
  },
  statusText: {
    display: "flex",
    alignItems: "center",
    marginBottom: "8px",
  },
});

function AchievePage() {
  const styles = useStyles();
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className={styles.root}>
      <div className={styles.InfoContainer}>
        <ProfileInfo />
      </div>
      <div className={styles.backgroundBox}>
        <div className={styles.contentDetail}>
          <div className={styles.right}>
            <div className={styles.statusText}> 
              <div className={styles.circle} /> 
              <div> 업적 미달성 </div> 
            </div>
            <div className={styles.statusText}> 
              <div className={styles.circle} /> 
              <div> 업적 진행 중 </div> 
            </div>
            <div className={styles.statusText}> 
              <div className={styles.circle} /> 
              <div> 업적 완료 </div> 
            </div>
          </div>

          <Image
            src="/map.png"
            alt="지도 이미지"
            style={{ width: "70%", height: "auto" }}
          />

          <Icon
            iconName="Location"
            className={styles.overlayIcon01}
            onClick={openModal}
          />

          <Icon
            iconName="Location"
            className={styles.overlayIcon02}
            onClick={openModal}
          />

          <Icon
            iconName="Location"
            className={styles.overlayIcon03}
            onClick={openModal}
          />

          <Icon
            iconName="Location"
            className={styles.overlayIcon04}
            onClick={openModal}
          />
        </div>

        <Dialog open={isModalOpen} onOpenChange={(e, data) => setModalOpen(data.open)}>
          <DialogSurface>
            <DialogTitle>업적 이름</DialogTitle>
            <DialogContent>
              <p>닉네임 님은 총 10번 물건을 잃어버리셨습니다!</p>
            </DialogContent>
          </DialogSurface>
        </Dialog>
      </div>
    </div>
  );
}

export default AchievePage;
