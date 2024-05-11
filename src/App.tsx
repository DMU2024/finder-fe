import { makeStyles } from "@fluentui/react-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import DetailPage from "./pages/DetailPage";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import WritePage from "./pages/WritePage";
import { contentMargin, headerHeight } from "./styles/margin";

const useStyles = makeStyles({
  root: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#FAFAFA"
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

  return (
    <Router>
      <div className={styles.root}>
        <Sidebar />
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
  );
}

export default App;
