import { tokens } from "@fluentui/react-components";
import { makeStyles } from "@fluentui/react-components";

import { mainColor, secondaryColor } from "@/styles/color";
import { tabletWidth } from "@/styles/size";

const useStyles = makeStyles({
  tableRow: {
    height: "auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  tableCell: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    flex: "1 0 auto",
    height: "auto",
    padding: "16px 16px 16px 0px",
    "&::before": {
      content: "attr(data-label)",
      fontWeight: "bold",
      display: "block",
      marginBottom: "4px"
    }
  },
  imageContainer: {
    display: "flex",
    width: "12vh",
    height: "12vh",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px 24px 24px 24px"
  },
  image: {
    width: "14vh",
    height: "14vh",
    marginRight: "16px",
    [`@media (max-width: ${tabletWidth})`]: {
      width: "11vh",
      height: "11vh",
      marginRight: "0"
    }
  },
  title: {
    color: tokens.colorNeutralForeground1,
    fontSize: "16px",
    fontWeight: "bold"
  },
  categoryTitle: {
    color: mainColor,
    fontSize: "12px",
    fontWeight: "bold"
  },
  subTitle: {
    color: secondaryColor,
    fontSize: "12px",
    fontWeight: "bold"
  }
});

export default useStyles;
