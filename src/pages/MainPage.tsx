import { makeStyles } from "@fluentui/react-components";

import ItemList from "../components/Main/ItemList";
import KakaoMap from "../components/Main/KakaoMap";
import MarkerList from "../components/Main/MarkerList";
import Notificiation from "../components/Main/Notification";
import useMainStore from "../stores/main";

const useStyles = makeStyles({
  root: {
    flex: 1
  },
  content: {
    display: "flex",
    gap: "32px"
  },
  left: {
    width: "40%"
  },
  right: {
    width: "60%"
  }
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
    </div>
  );
}

export default MainPage;
