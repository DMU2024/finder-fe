import { makeStyles, tokens } from "@fluentui/react-components";

import { tabletWidth } from "@/styles/size";

const useStyles = makeStyles({
  root: {
    overflow: "auto"
  },
  tableHeader: {
    backgroundColor: tokens.colorNeutralBackground1,
    fontSize: "12px !important",
    [`@media (max-width: ${tabletWidth})`]: {
      display: "none"
    }
  },
  tableBody: {
    [`@media (max-width: ${tabletWidth})`]: {
      display: "block"
    }
  },
  tableRow: {
    [`@media (max-width: ${tabletWidth})`]: {
      display: "block",
      marginBottom: "16px"
    }
  },
  tableCell: {
    [`@media (max-width: ${tabletWidth})`]: {
      display: "block",
      padding: "8px 0",
      textAlign: "left",
      "&::before": {
        content: "attr(data-label)",
        fontWeight: "bold",
        display: "block",
        marginBottom: "4px"
      }
    }
  },
  spinner: {
    margin: "16px",
    "&>span": {
      backgroundColor: tokens.colorPaletteLightGreenBackground2
    }
  }
});

export default useStyles;
