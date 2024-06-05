import { Depths } from "@fluentui/react";
import { Button, makeStyles } from "@fluentui/react-components";
import { EditRegular } from "@fluentui/react-icons";

import { mainColor } from "../styles/color";
import { sideBarWidth } from "../styles/size";

const useStyle = makeStyles({
  writeButton: {
    width: "100px",
    height: "100px",
    position: "fixed",
    zIndex: 1,
    left: `calc(${sideBarWidth} - 50px)`,
    bottom: "64px",
    backgroundColor: mainColor,
    boxShadow: Depths.depth16,
    ":hover": {
      backgroundColor: mainColor
    }
  },
  writeIcon: {
    color: "white",
    fontSize: "40px"
  }
});

function WriteButton() {
  const styles = useStyle();

  return (
    <Button className={styles.writeButton} shape="circular">
      <EditRegular className={styles.writeIcon} />
    </Button>
  );
}

export default WriteButton;
