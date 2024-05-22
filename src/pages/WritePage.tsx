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
    overflowY: "hidden"
  },
  content: {
    display: "flex",
    gap: "32px"
  },
  left: {
    width: "55%"
  },
  right: {
    width: "45%"
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
        <textarea />
      </div>
    </div>
  );
}

export default WritePage;
