import {
  FluentProvider,
  makeStyles,
  tokens,
  createLightTheme,
  createDarkTheme
} from "@fluentui/react-components";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import SidebarMobile from "./components/SidebarMobile";
import WriteButton from "./components/WriteButton";
import AchievePage from "./pages/AchievePage";
import ChatPage from "./pages/ChatPage";
import DetailPage from "./pages/DetailPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import WritePage from "./pages/WritePage";
import useOptionStore from "./stores/option";
import { mainColor } from "./styles/color";
import {
  contentMargin,
  headerHeight,
  headerMobileHeight
} from "./styles/margin";
import { sideBarWidth, mobileWidth } from "./styles/size";

const useStyles = makeStyles({
  root: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
    overflowX: "hidden"
  },
  wrapper: {
    display: "flex",
    width: `calc(100% - ${sideBarWidth})`,
    marginLeft: sideBarWidth,
    [`@media (max-width: ${mobileWidth})`]: {
      marginLeft: 0,
      height: `calc(100vh - ${headerMobileHeight})`,
      width: "100%"
    }
  },
  content: {
    flex: 1,
    display: "flex",
    marginTop: `calc(${contentMargin} + ${headerHeight})`,
    marginLeft: contentMargin,
    marginRight: contentMargin,
    [`@media (max-width: ${mobileWidth})`]: {
      marginTop: headerMobileHeight,
      marginLeft: 0,
      marginRight: 0
    }
  }
});

const brandColor = {
  0: mainColor,
  10: mainColor,
  20: mainColor,
  30: mainColor,
  40: mainColor,
  50: mainColor,
  60: mainColor,
  70: mainColor,
  80: mainColor,
  90: mainColor,
  100: mainColor,
  110: mainColor,
  120: mainColor,
  130: mainColor,
  140: mainColor,
  150: mainColor,
  160: mainColor
};

const lightTheme = createLightTheme(brandColor);
const darkTheme = createDarkTheme(brandColor);

function App() {
  const styles = useStyles();
  const { isDarkTheme } = useOptionStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <FluentProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <Router>
        <div className={styles.root}>
          <Sidebar />
          <SidebarMobile isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          <WriteButton />
          <div className={styles.wrapper}>
            <Header />
            <div className={styles.content}>
              <Routes>
                <Route element={<MainPage />} path="/" />
                <Route element={<SearchPage />} path="/search" />
                <Route element={<DetailPage />} path="/detail/:id" />
                <Route element={<LoginPage />} path="/login" />
                <Route
                  element={<ProtectedRoute element={<WritePage />} />}
                  path="/write"
                />
                <Route
                  element={<ProtectedRoute element={<ChatPage />} />}
                  path="/chat"
                />
                <Route
                  element={<ProtectedRoute element={<ProfilePage />} />}
                  path="/profile"
                />
                <Route
                  element={<ProtectedRoute element={<AchievePage />} />}
                  path="/profile/achieve"
                />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </FluentProvider>
  );
}

export default App;
