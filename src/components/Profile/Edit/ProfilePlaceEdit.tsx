import { makeStyles, tokens } from "@fluentui/react-components";

import PlaceListItem from "../ProfilePlaceListItem";

const useStyles = makeStyles({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  title: {
    color: tokens.colorNeutralForeground1,
    fontWeight: "bold",
    fontSize: "24px",
    marginBottom: "10px"
  }
});

interface ProfilePlaceProps {
  img?: string;
}

function ProfilePlaceEdit({ img }: ProfilePlaceProps) {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.title}>장소 수정하기</div>
      <PlaceListItem img={img || "/profilePlaceIcon.png"} />
      <PlaceListItem img={img || "/profilePlaceIcon.png"} />
      <PlaceListItem img={img || "/profilePlaceIcon.png"} />
    </div>
  );
}

export default ProfilePlaceEdit;
