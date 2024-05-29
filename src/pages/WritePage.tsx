import { DefaultButton } from "@fluentui/react";
import { makeStyles, tokens } from "@fluentui/react-components";

import AddContent from "../components/Write/AddContent";
import ImgSelect from "../components/Write/ImgSelect";
import LostList from "../components/Write/LostList";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: tokens.colorNeutralBackground2,
    minHeight: "100vh",
    width: "100%",
    overflowY: "auto",
    padding: "0 16px",
    scrollbarWidth: "none",
    "-ms-overflow-style": "none",
    "&::-webkit-scrollbar": {
      width: 0,
      display: "none"
    }
  },
  content: {
    display: "flex",
    marginBottom: "30px"
  },
  left: {
    width: "45%"
  },
  right: {
    width: "55%"
  },
  submitButtonContainer: {
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
        <div className={styles.left}>
          <ImgSelect />
        </div>
        <div className={styles.right}>
          <LostList />
        </div>
      </div>
      <AddContent />
      <div className={styles.submitButtonContainer}>
        <DefaultButton
          className={styles.submitButton}
          text="Submit"
          onClick={() => console.log("Form submitted!")}
        />
      </div>
    </div>
  );
}

export default WritePage;
