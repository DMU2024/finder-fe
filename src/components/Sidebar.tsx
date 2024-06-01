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
    left: 0,
    top: 0
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

  const getTab = () => {
    switch (location.pathname) {
      case "/":
        return "tab1";
      case "/search":
        return "tab2";
      default:
        return "tab1";
    }
  };

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
        defaultSelectedValue={getTab()}
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
          disabled
          className={styles.tab}
          icon={<ChatRegular />}
          value="tab3"
        />
        <Tab
          disabled
          className={styles.tab}
          icon={<PersonInfoRegular />}
          value="tab4"
        />
      </TabList>
    </InlineDrawer>
  );
}

export default Sidebar;
