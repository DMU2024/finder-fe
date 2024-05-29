import { DefaultButton } from "@fluentui/react";
import { makeStyles, tokens } from "@fluentui/react-components";

import AddContent from "../components/Write/AddContent";
import ImgSelect from "../components/Write/ImgSelect";
import LostList from "../components/Write/LostList";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  content: {
    display: "flex"
  },
  submitButtonContainer: {
    backgroundColor: "red",
    marginTop: "20px",
    marginBottom: "50px",
    display: "flex",
    justifyContent: "flex-end"
  },
  submitButton: {
    padding: "20px 30px",
    backgroundColor: tokens.colorBrandBackground,
    color: "white",
    borderRadius: "4px",
    fontSize: "16px",
    boxShadow: tokens.shadow4,
    transition: "background-color 0.3s",
    marginRight: "30px",
    "&:hover": {
      backgroundColor: tokens.colorBrandBackgroundHover
    },
    "&:active": {
      backgroundColor: tokens.colorBrandBackgroundPressed
    }
  }
});

function WritePage() {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <LostList />
      </div>
    </div>
  );
}

export default WritePage;
