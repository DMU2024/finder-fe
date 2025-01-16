import { Depths } from "@fluentui/react";
import { Button, makeStyles } from "@fluentui/react-components";
import { EditRegular } from "@fluentui/react-icons";
import { useLocation, useNavigate } from "react-router-dom";

import { mainColor } from "@/styles/color";
import { sideBarWidth, tabletWidth } from "@/styles/size";

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
    },
    [`@media (max-width: ${tabletWidth})`]: {
      display: "none"
    }
  },
  writeIcon: {
    color: "white",
    fontSize: "40px"
  }
});

function WriteButton() {
  const styles = useStyle();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/write" && (
        <Button
          className={styles.writeButton}
          shape="circular"
          onClick={() => {
            navigate("/write");
          }}
        >
          <EditRegular className={styles.writeIcon} />
        </Button>
      )}
    </>
  );
}

export default WriteButton;
