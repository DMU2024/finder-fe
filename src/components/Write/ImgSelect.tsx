import { ImageFit, Depths } from "@fluentui/react";
import { makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  imgContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  img: {
    width: "90%",
    height: "900px",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    color: "#333",
    boxShadow: Depths.depth16
  }
});

function ImgSelect() {
  const styles = useStyles();

  return (
    <div className={styles.imgContainer}>
      <div className={styles.img}>imsi IMG</div>
    </div>
  );
}

export default ImgSelect;
