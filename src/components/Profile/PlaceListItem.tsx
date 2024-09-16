import { tokens, makeStyles, Image } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "30px",
    padding: "20px 44px 20px 44px",
    backgroundColor: tokens.colorNeutralBackground1Hover
  },
  imageContainer: {
    marginRight: "20px"
  },
  textContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  placeTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    color: tokens.colorNeutralForeground1,
    marginBottom: "10px"
  },
  placeDetail: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground3
  }
});

interface PlaceListProps {
  img?: string;
}

function PlaceListItem({ img }: PlaceListProps) {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.imageContainer}>
        <Image
          shape="circular"
          src={img || "/profileIMGimsi.png"}
          style={{ width: "85px", height: "85px" }}
        />
      </div>
      <div className={styles.textContainer}>
        {/* 프로필 수정을 타고 들어와서 해당id 값 받았을 시, 클릭했을 때 미니맵. 현재 목업이므로 추후 수정 */}
        <div className={styles.placeTitle}>장소명</div>
        <div className={styles.placeDetail}>장소 상세 주소</div>
      </div>
    </div>
  );
}

export default PlaceListItem;
