import { Depths } from "@fluentui/react";
import { makeStyles } from "@fluentui/react-components";
import { LocationRegular } from "@fluentui/react-icons";

import { contentMargin, headerHeight } from "../styles/margin";

const useStyles = makeStyles({
  root: {
    alignItems: "center",
    display: "flex",
    width: "100%",
    height: headerHeight,
    backgroundColor: "white",
    boxShadow: Depths.depth16
  },
  title: {
    marginLeft: contentMargin
  },
  menu: {
    display: "flex",
    marginLeft: "auto",
    marginRight: contentMargin,
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
