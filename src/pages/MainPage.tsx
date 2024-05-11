import { makeStyles } from "@fluentui/react-components";

import ItemList from "../components/Main/ItemList";
import KakaoMap from "../components/Main/KakaoMap";

const useStyles = makeStyles({
  left: {
    width: "40%"
  },
  right: {
    width: "60%"
  }
});

function MainPage() {
  const styles = useStyles();

  return (
    <>
      <div className={styles.left}>
        <ItemList />
      </div>
      <div className={styles.right}>
        <KakaoMap />
      </div>
    </>
  );
}

export default MainPage;
