import { Depths, Image } from "@fluentui/react";
import { makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  imgContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  },
  img: {
    width: "450px",
    height: "450px",
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
      <Image className={styles.img} />
    </div>
  );
}

export default ImgSelect;
