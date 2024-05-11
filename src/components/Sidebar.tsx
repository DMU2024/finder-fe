import {
  InlineDrawer,
  Tab,
  TabList,
  Toolbar,
  ToolbarButton,
  makeStyles
} from "@fluentui/react-components";
import {
  DocumentBulletListRegular,
  HomeRegular,
  NavigationRegular,
  PersonInfoRegular,
  SearchRegular
} from "@fluentui/react-icons";
import { useLocation, useNavigate } from "react-router-dom";

const useStyle = makeStyles({
  root: {
    display: "flex",
    width: "64px",
    minWidth: "64px",
    height: "100%"
  },
  toolbar: {
    width: "100%",
    height: "80px",
    justifyContent: "center",
    padding: 0
  },
  tabList: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    gap: "32px"
  },
  tab: {
    justifyContent: "center"
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
    }
  };

  return (
    <InlineDrawer open separator className={styles.root}>
      <Toolbar className={styles.toolbar}>
        <ToolbarButton icon={<NavigationRegular />} />
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
          className={styles.tab}
          icon={<DocumentBulletListRegular />}
          value="tab3"
          onClick={() => navigate("/")}
        />
        <Tab
          className={styles.tab}
          icon={<PersonInfoRegular />}
          value="tab4"
          onClick={() => navigate("/")}
        />
      </TabList>
    </InlineDrawer>
  );
}

export default Sidebar;
