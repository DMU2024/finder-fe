import { FluentProvider, makeStyles, tokens } from "@fluentui/react-components";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "@/components/Header";
import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";
import SidebarMobile from "@/components/SidebarMobile";
import WriteButton from "@/components/WriteButton";
import ChatPage from "@/pages/ChatPage";
import DetailPage from "@/pages/DetailPage";
import LoginPage from "@/pages/LoginPage";
import MainPage from "@/pages/MainPage";
import ProfilePage from "@/pages/ProfilePage";
import SearchPage from "@/pages/SearchPage";
import WritePage from "@/pages/WritePage";
import useOptionStore from "@/stores/option";
import { contentMargin, headerHeight, headerMobileHeight } from "@/styles/margin";
import { mobileWidth, sideBarWidth, tabletWidth } from "@/styles/size";
import { darkTheme, lightTheme } from "@/themes";

const useStyles = makeStyles({
  root: {
    display: "flex",
    minHeight: "100dvh",
    backgroundColor: tokens.colorNeutralBackground2,
    overflowX: "hidden"
  },
  wrapper: {
    display: "flex",
    width: `calc(100% - ${sideBarWidth})`,
    marginLeft: sideBarWidth,
    [`@media (max-width: ${tabletWidth})`]: {
      height: `calc(100dvh - ${headerHeight})`,
      width: "100%",
      marginLeft: 0
    },
    [`@media (max-width: ${mobileWidth})`]: {
      height: `calc(100dvh - ${headerMobileHeight})`
    }
  },
  content: {
    flex: 1,
    display: "flex",
    marginTop: `calc(${contentMargin} + ${headerHeight})`,
    marginLeft: contentMargin,
    marginRight: contentMargin,
    [`@media (max-width: ${tabletWidth})`]: {
      marginTop: headerHeight,
      marginLeft: 0,
      marginRight: 0
    },
    [`@media (max-width: ${mobileWidth})`]: {
      marginTop: headerMobileHeight,
      marginLeft: 0,
      marginRight: 0
    }
  }
});

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
                <Route element={<ProtectedRoute element={<WritePage />} />} path="/write" />
                <Route element={<ProtectedRoute element={<ChatPage />} />} path="/chat" />
                <Route element={<ProtectedRoute element={<ProfilePage />} />} path="/profile" />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </FluentProvider>
  );
}

export default App;
