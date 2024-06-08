import { Depths } from "@fluentui/react";
import { Switch, makeStyles, tokens } from "@fluentui/react-components";
import { LocationRegular } from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";

import useOptionStore from "../stores/option";
import { backgroundColor, mainColor } from "../styles/color";
import { contentMargin, headerHeight } from "../styles/margin";
import { sideBarWidth } from "../styles/size";

const useStyles = makeStyles({
  root: {
    alignItems: "center",
    display: "flex",
    width: `calc(100vw - ${sideBarWidth})`,
    height: headerHeight,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: Depths.depth16,
    position: "fixed",
    zIndex: 1
  },
  title: {
    marginLeft: contentMargin,
    display: "flex",
    alignItems: "center",
    gap: "15px",
    cursor: "pointer"
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
    alignItems: "center",
    marginLeft: "auto",
    marginRight: contentMargin,
    gap: "32px"
  },
  signup: {
    color: backgroundColor,
    cursor: "not-allowed"
  },
  login: {
    color: mainColor,
    cursor: "not-allowed"
  }
});

function Header() {
  const styles = useStyles();
  const navigate = useNavigate();
  const { isDarkTheme, setIsDarkTheme } = useOptionStore();

  return (
    <div className={styles.root}>
      <div
        className={styles.title}
        onClick={() => {
          navigate("/");
        }}
      >
        <LocationRegular className={styles.titleIcon} />
        <span className={styles.titleText}>Finder</span>
      </div>
      <div className={styles.menu}>
        <h2 className={styles.signup}>SignUp</h2>
        <h2 className={styles.login}>Login</h2>
        <Switch
          defaultChecked={isDarkTheme}
          onChange={(_, data) => {
            setIsDarkTheme(data.checked);
          }}
        />
      </div>
    </div>
  );
}

export default Header;
