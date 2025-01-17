import { makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  radioItem: {
    "&>*": {
      display: "flex",
      gap: "8px"
    }
  }
});

export default useStyles;
