import { makeStyles, tokens } from "@fluentui/react-components";

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
    gap: "32px",
    marginBottom: "100px"
  },
  left: {
    width: "45%"
  },
  right: {
    width: "55%"
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
    </div>
  );
}

export default WritePage;
