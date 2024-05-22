import { makeStyles, tokens } from "@fluentui/react-components";

import AddContent from "../components/Write/AddContent";
import ImgSelect from "../components/Write/ImgSelect";
import LostList from "../components/Write/LostList";
import { contentMargin, headerHeight } from "../styles/margin";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: tokens.colorNeutralBackground2,
    minHeight: "100vh",
    width: "100%",
    overflowY: "hidden"
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
      {/* section-01 */}
      <div className={styles.content}>
        {/* 사진 SECTIONT */}
        <div className={styles.left}>
          <ImgSelect />
        </div>
        {/* 내용 SECTION */}
        <div className={styles.right}>
          <LostList />
        </div>
      </div>

      {/* section-02 */}
      <div className={styles.content}>
        <AddContent />
      </div>
    </div>
  );
}

export default WritePage;
