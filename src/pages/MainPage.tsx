import { makeStyles, shorthands } from "@fluentui/react-components";
import ItemList from "../components/Main/ItemList";
import KakaoMap from "../components/Main/KakaoMap";
import MarkerList from "../components/Main/MarkerList";
import Notificiation from "../components/Main/Notification";
import ItemModal from "../components/Main/ItemModal";
import useMainStore from "../stores/main";

const useStyles = makeStyles({
  root: {
    flex: 1,
    position: "relative",
    ...shorthands.padding("16px"),
    "@media (max-width: 390px)": {
      padding: 0,
    },
  },
  content: {
    display: "flex",
    gap: "32px",
    "@media (max-width: 390px)": {
      display: "block",
    },
  },
  left: {
    width: "40%",
    "@media (max-width: 390px)": {
      display: "none",
    },
  },
  right: {
    width: "60%",
    "@media (max-width: 390px)": {
      width: "100%",
      height: "100vh",
      position: "relative",
    },
  },
});

function MainPage() {
  const styles = useStyles();
  const { selectedMarker } = useMainStore();

  return (
    <div className={styles.root}>
      <Notificiation />
      <div className={styles.content}>
        <div className={styles.left}>
          {selectedMarker ? <ItemList /> : <MarkerList />}
        </div>
        <div className={styles.right}>
          <KakaoMap />
        </div>
      </div>

      <ItemModal />
    </div>
  );
}

export default MainPage;
