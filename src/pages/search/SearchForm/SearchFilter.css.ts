import { makeStyles, tokens } from "@fluentui/react-components";

import { mobileWidth, tabletWidth } from "@/styles/size";

const useStyles = makeStyles({
  root: {
    flex: 1,
    borderRadius: "16px",
    padding: "24px",
    [`@media (max-width: ${tabletWidth})`]: {
      margin: "0 18px",
      padding: "16px"
    },
    [`@media (max-width: ${mobileWidth})`]: {
      margin: "0 20px",
      padding: "16px"
    }
  },
  filterElement: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  filterTitle: {
    minWidth: "max-content",
    [`@media (max-width: ${mobileWidth})`]: {
      fontSize: "12px"
    }
  },
  filterColor: {
    [`@media (max-width: ${mobileWidth})`]: {
      fontSize: "10px"
    }
  },
  filterColorHex: {
    width: "12px ",
    height: "12px",
    display: "inline-block",
    border: `2px solid ${tokens.colorNeutralBackground3}`,
    padding: "2px"
  },
  filterInput: {
    flex: 1,
    height: "48px",
    border: "1px solid #D9D9D9",
    borderRadius: "4px",
    padding: "0px",
    boxSizing: "border-box",
    fontSize: "14px",
    outline: "none",
    minWidth: "0px",
    [`@media (max-width: ${mobileWidth})`]: {
      fontSize: "10px"
    },
    "& > button": {
      [`@media (max-width: ${mobileWidth})`]: {
        fontSize: "10px"
      }
    }
  },
  filterDismiss: {
    marginRight: "10px",
    cursor: "pointer",
    [`@media (max-width: ${mobileWidth})`]: {
      width: "10px",
      height: "10px"
    }
  },
  filterReset: {
    minWidth: "max-content",
    marginLeft: "auto",
    color: "red",
    cursor: "pointer"
  }
});

export default useStyles;
