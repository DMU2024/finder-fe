import {
  FluentProvider,
  webLightTheme,
  makeStyles,
  tokens,
  webDarkTheme
} from "@fluentui/react-components";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import WriteButton from "./components/WriteButton";
import DetailPage from "./pages/DetailPage";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import WritePage from "./pages/WritePage";
import useOptionStore from "./stores/option";
import { contentMargin, headerHeight } from "./styles/margin";

const useStyles = makeStyles({
  root: {
    display: "flex",
    height: "100vh",
    backgroundColor: tokens.colorNeutralBackground2
  },
  wrapper: {
    width: "100vw"
  },
  content: {
    display: "flex",
    height: `calc(100vh - ${headerHeight} - ${contentMargin})`,
    margin: contentMargin
  }
});

function App() {
  const styles = useStyles();
  const { isDarkTheme } = useOptionStore();

  return (
    <FluentProvider theme={isDarkTheme ? webDarkTheme : webLightTheme}>
      <Router>
        <div className={styles.root}>
          <Sidebar />
          <WriteButton />
          <div className={styles.wrapper}>
            <Header />
            <div className={styles.content}>
              <Routes>
                <Route element={<MainPage />} path="/" />
                <Route element={<SearchPage />} path="/search" />
                <Route element={<WritePage />} path="/write" />
                <Route element={<DetailPage />} path="/detail/:id" />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </FluentProvider>
  );
}

export default App;
