import {
  InlineDrawer,
  Tab,
  TabList,
  Toolbar,
  ToolbarButton,
  makeStyles,
  tokens
} from "@fluentui/react-components";
import {
  ChatRegular,
  HomeRegular,
  NavigationRegular,
  PersonInfoRegular,
  SearchRegular
} from "@fluentui/react-icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { sideBarWidth } from "../styles/size";

const useStyle = makeStyles({
  root: {
    display: "flex",
    width: sideBarWidth,
    minWidth: sideBarWidth,
    height: "100%",
    backgroundColor: tokens.colorNeutralBackground1,
    position: "fixed",
    zIndex: 1,
    left: 0,
    top: 0,
    "@media (max-width: 390px)": {
      display: "none"
    }
  },
  toolbar: {
    width: "100%",
    height: "80px",
    justifyContent: "center",
    padding: 0
  },
  toolbarButton: {
    maxWidth: "60px",
    maxHeight: "60px",
    "&>span": {
      width: "60px",
      height: "60px",
      "&>svg": {
        width: "30px",
        height: "30px"
      }
    }
  },
  tabList: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    gap: "32px"
  },
  tab: {
    justifyContent: "center",
    "&>span": {
      width: "60px",
      height: "60px",
      "&>svg": {
        width: "30px",
        height: "30px"
      }
    }
  }
});

function Sidebar() {
  const styles = useStyle();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState("");

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setSelectedTab("tab1");
        break;
      case "/search":
        setSelectedTab("tab2");
        break;
      case "/chat":
        setSelectedTab("tab3");
        break;
      case "/profile":
        setSelectedTab("tab4");
        break;
    }
  }, [location]);

  return (
    <InlineDrawer open separator className={styles.root}>
      <Toolbar className={styles.toolbar}>
        <ToolbarButton
          className={styles.toolbarButton}
          icon={<NavigationRegular />}
        />
      </Toolbar>
      <TabList
        vertical
        className={styles.tabList}
        selectedValue={selectedTab}
        size="large"
      >
        <Tab
          className={styles.tab}
          icon={<HomeRegular />}
          value="tab1"
          onClick={() => navigate("/")}
        />
        <Tab
          className={styles.tab}
          icon={<SearchRegular />}
          value="tab2"
          onClick={() => navigate("/search")}
        />
        <Tab
          className={styles.tab}
          icon={<ChatRegular />}
          value="tab3"
          onClick={() => navigate("/chat")}
        />
        <Tab
          className={styles.tab}
          icon={<PersonInfoRegular />}
          value="tab4"
          onClick={() => navigate("/profile")}
        />
      </TabList>
    </InlineDrawer>
  );
}

export default Sidebar;
