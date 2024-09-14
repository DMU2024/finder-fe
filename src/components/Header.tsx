import { Depths } from "@fluentui/react";
import { Switch, makeStyles, tokens } from "@fluentui/react-components";
import { LocationRegular } from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";

import { postLogout } from "../apis/user";
import { useAuthStore } from "../stores/auth";
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
    cursor: "pointer"
  },
  login: {
    color: mainColor,
    cursor: "pointer"
  }
});

function Header() {
  const styles = useStyles();
  const navigate = useNavigate();
  const { isDarkTheme, setIsDarkTheme } = useOptionStore();
  const { userId, setUserId } = useAuthStore();

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
        {userId ? (
          <h2
            className={styles.login}
            onClick={() => {
              if (userId) {
                postLogout(userId).then(() => {
                  setUserId(undefined);
                  navigate("/");
                });
              }
            }}
          >
            Logout
          </h2>
        ) : (
          <>
            <h2
              className={styles.login}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </h2>
          </>
        )}

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
