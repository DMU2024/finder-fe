import { makeStyles } from "@fluentui/react-components";

import { mainColor } from "@/styles/color";
import { mobileWidth, tabletWidth } from "@/styles/size";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  searchHeader: {
    display: "flex",
    margin: "16px 10px 10px 10px",
    [`@media (max-width: ${mobileWidth})`]: {
      margin: "16px 10px 0px 10px"
    }
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    minHeight: "48px",
    [`@media (max-width: ${mobileWidth})`]: {
      width: "90vw",
      minHeight: "32px",
      padding: "5px 20px 0 20px"
    }
  },
  searchBox: {
    flex: 1,
    maxWidth: "unset",
    minHeight: "48px",
    borderRadius: "8px",
    padding: "8px",
    outline: "none",
    [`@media (max-width: ${tabletWidth})`]: {
      marginRight: "16px"
    },
    [`@media (max-width: ${mobileWidth})`]: {
      marginRight: "0px"
    }
  },
  filterIcon: {
    fontSize: "2em",
    color: mainColor,
    cursor: "pointer",
    marginRight: "10px",
    [`@media (max-width: ${tabletWidth})`]: {
      marginLeft: "18px"
    },
    [`@media (max-width: ${mobileWidth})`]: {
      marginLeft: "auto",
      fontSize: "1.5em"
    }
  },
  title: {
    fontSize: "4em",
    [`@media (max-width: ${mobileWidth})`]: {
      fontSize: "2em"
    }
  }
});

export default useStyles;
