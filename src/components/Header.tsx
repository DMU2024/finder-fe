import { Depths } from "@fluentui/react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { LocationRegular } from "@fluentui/react-icons";

import { backgroundColor, mainColor } from "../styles/color";
import { contentMargin, headerHeight } from "../styles/margin";

const useStyles = makeStyles({
  root: {
    alignItems: "center",
    display: "flex",
    width: "100%",
    height: headerHeight,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: Depths.depth16,
    position: "fixed",
    top: 0,
    zIndex: 1000
  },
  title: {
    marginLeft: contentMargin,
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },
  titleIcon: {
    color: backgroundColor,
    fontSize: "20px"
  },
  titleText: {
    color: mainColor,
    fontSize: "32px",
    fontWeight: "bold"
  },
  menu: {
    display: "flex",
    marginLeft: "auto",
    marginRight: contentMargin,
    gap: "32px"
  },
  signup: {
    color: backgroundColor
  },
  login: {
    color: mainColor
  }
});

function Header() {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <LocationRegular className={styles.titleIcon} />
        <span className={styles.titleText}>Finder</span>
      </div>
      <div className={styles.menu}>
        <h2 className={styles.signup}>SignUp</h2>
        <h2 className={styles.login}>Login</h2>
      </div>
    </div>
  );
}

export default Header;
