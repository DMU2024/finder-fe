import { Depths } from "@fluentui/react";
import { makeStyles } from "@fluentui/react-components";
import { LocationRegular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  root: {
    alignItems: "center",
    display: "flex",
    width: "100%",
    height: "80px",
    backgroundColor: "white",
    boxShadow: Depths.depth16
  },
  title: {
    marginLeft: "32px"
  },
  menu: {
    display: "flex",
    marginLeft: "auto",
    marginRight: "32px",
    gap: "32px"
  }
});

function Header() {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <h1>
          <LocationRegular />
          Finder
        </h1>
      </div>
      <div className={styles.menu}>
        <h2>SignUp</h2>
        <h2>Login</h2>
      </div>
    </div>
  );
}

export default Header;
