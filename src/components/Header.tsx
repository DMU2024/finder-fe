import { Depths } from "@fluentui/react";
import { makeStyles, tokens } from "@fluentui/react-components";
import {
  LocationRegular,
  NavigationRegular,
  WeatherMoonRegular,
  WeatherSunnyRegular
} from "@fluentui/react-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SidebarMobile from "./SidebarMobile";
import { postLogout } from "../apis/user";
import useAuthStore from "../stores/auth";
import useOptionStore from "../stores/option";
import { backgroundColor, mainColor } from "../styles/color";
import {
  contentMargin,
  contentMobileMargin,
  headerHeight,
  headerMobileHeight
} from "../styles/margin";
import { sideBarWidth, mobileWidth } from "../styles/size";

const useStyles = makeStyles({
  root: {
    alignItems: "center",
    display: "flex",
    width: `calc(100vw - ${sideBarWidth})`,
    height: headerHeight,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: Depths.depth16,
    position: "fixed",
    zIndex: 2,
    [`@media (max-width: ${mobileWidth})`]: {
      width: "100vw",
      height: headerMobileHeight,
      justifyContent: "space-between"
    }
  },
  title: {
    marginLeft: contentMargin,
    display: "flex",
    alignItems: "center",
    gap: "15px",
    cursor: "pointer",
    [`@media (max-width: ${mobileWidth})`]: {
      marginLeft: `calc(${contentMobileMargin} - 12px)`
    }
  },
  titleIcon: {
    color: backgroundColor,
    fontSize: "20px",
    [`@media (max-width: ${mobileWidth})`]: {
      display: "none"
    }
  },
  titleText: {
    color: mainColor,
    fontSize: "32px",
    fontWeight: "bold",
    [`@media (max-width: ${mobileWidth})`]: {
      fontSize: "20px"
    }
  },
  menu: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: contentMargin,
    gap: "32px",
    [`@media (max-width: ${mobileWidth})`]: {
      display: "none"
    }
  },
  signup: {
    color: backgroundColor,
    cursor: "pointer"
  },
  login: {
    color: mainColor,
    cursor: "pointer"
  },
  menuIcon: {
    color: backgroundColor,
    fontSize: "28px",
    marginTop: "8px",
    marginRight: `calc(${contentMobileMargin} - 16px)`,
    "@media (min-width: 481px)": {
      display: "none"
    }
  }
});

function Header() {
  const styles = useStyles();
  const navigate = useNavigate();
  const { isDarkTheme, setIsDarkTheme } = useOptionStore();
  const { userId, setUserId } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        <h2
          className={styles.login}
          onClick={() => {
            if (userId) {
              postLogout(userId).then(() => {
                setUserId(undefined);
                navigate("/");
              });
            } else {
              navigate("/login");
            }
          }}
        >
          {userId ? "Logout" : "Login"}
        </h2>
        <div
          style={{ fontSize: 28, cursor: "pointer" }}
          onClick={() => {
            setIsDarkTheme(!isDarkTheme);
          }}
        >
          {isDarkTheme ? <WeatherSunnyRegular /> : <WeatherMoonRegular />}
        </div>
      </div>
      <div>
        <NavigationRegular
          className={styles.menuIcon}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </div>
      {isSidebarOpen && (
        <SidebarMobile isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      )}
    </div>
  );
}

export default Header;
