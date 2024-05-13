import { Depths } from "@fluentui/react";
import { Button, makeStyles } from "@fluentui/react-components";
import { EditRegular } from "@fluentui/react-icons";

import { sideBarWidth } from "../styles/size";

const useStyle = makeStyles({
  writeButton: {
    width: "100px",
    height: "100px",
    position: "absolute",
    zIndex: 1,
    left: `calc(${sideBarWidth} - 48px)`,
    bottom: "64px",
    boxShadow: Depths.depth16
  }
});

function WriteButton() {
  const styles = useStyle();

  return (
    <Button className={styles.writeButton} shape="circular">
      <EditRegular fontSize="40px" />
    </Button>
  );
}

export default WriteButton;
