import { makeStyles } from "@fluentui/react-components";

import { mainColor } from "@/styles/color";
import { tabletWidth } from "@/styles/size";

const useStyles = makeStyles({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "32px",
    [`@media (max-width: ${tabletWidth})`]: {
      gap: "16px"
    }
  },
  icon: {
    fontSize: "128px",
    color: mainColor,
    [`@media (max-width: ${tabletWidth})`]: {
      fontSize: "96px"
    }
  },
  text: {
    fontSize: "32px",
    [`@media (max-width: ${tabletWidth})`]: {
      fontSize: "24px"
    }
  }
});

export default useStyles;
