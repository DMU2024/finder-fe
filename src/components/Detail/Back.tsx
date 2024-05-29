import { makeStyles } from "@fluentui/react-components";
import { ArrowLeftRegular } from "@fluentui/react-icons";

import { mainColor } from "../../styles/color";
import { headerHeight } from "../../styles/margin";
import { sideBarWidth } from "../../styles/size";

const useStyle = makeStyles({
  root: {
    color: mainColor,
    display: "flex",
    alignItems: "center",
    position: "absolute",
    top: `calc(${headerHeight} + 24px)`,
    left: `calc(${sideBarWidth} + 48px)`
  },
  text: {
    fontSize: "16px",
    fontWeight: "bold"
  }
});

function Notificiation() {
  const styles = useStyle();
  return (
    <div className={styles.root}>
      <ArrowLeftRegular fontSize="24px" />
      <div className={styles.text}>분실물 찾기</div>
    </div>
  );
}

export default Notificiation;
