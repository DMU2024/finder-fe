import { makeStyles, tokens } from "@fluentui/react-components";

import WriteLostGoodsForm from "@/components/Write/WriteLostGoodsForm";
import { mobileWidth, tabletWidth } from "@/styles/size";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    [`@media (max-width: ${mobileWidth})`]: {
      height: `calc( 100dvh + 10vh )`
    }
  },
  content: {
    display: "flex",
    width: "50vw",
    [`@media (max-width: ${tabletWidth})`]: {
      width: "80vw"
    },
    [`@media (max-width: ${mobileWidth})`]: {
      width: "90vw",
      marginTop: "5vh"
    }
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
        <WriteLostGoodsForm />
      </div>
    </div>
  );
}

export default WritePage;
