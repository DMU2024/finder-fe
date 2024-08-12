import {
  FluentProvider,
  makeStyles,
  tokens,
  createLightTheme,
  createDarkTheme
} from "@fluentui/react-components";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { getCoord2RegionCode } from "./apis/kakaoMap";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import WriteButton from "./components/WriteButton";
import DetailPage from "./pages/DetailPage";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import WritePage from "./pages/WritePage";
import ProfilePage from "./pages/ProfilePage";
import ProfileEditPage from "./pages/ProfileEditPage";
import AchievePage from "./pages/AchievePage";
import useOptionStore from "./stores/option";
import usePositionStore from "./stores/position";
import { mainColor } from "./styles/color";
import { contentMargin, headerHeight } from "./styles/margin";
import { sideBarWidth } from "./styles/size";

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
    marginLeft: sideBarWidth
  },
  content: {
    flex: 1,
    display: "flex",
    marginTop: `calc(${contentMargin} + ${headerHeight})`,
    marginLeft: contentMargin,
    marginRight: contentMargin
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
  const { latitude, longitude, getCoords, setAddress } = usePositionStore();

  useEffect(() => {
    if (latitude == 0 || longitude == 0) {
      getCoords();
    }
  }, []);

  useEffect(() => {
    if (latitude != 0 && longitude != 0) {
      getCoord2RegionCode(latitude, longitude)
        .then((addr) => setAddress(addr))
        .catch(() => setAddress("알 수 없는 위치"));
    }
  }, [latitude, longitude]);

  return (
    <FluentProvider theme={isDarkTheme ? darkTheme : lightTheme}>
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
                <Route element={<ProfilePage />} path="/profile" />
                <Route element={<ProfileEditPage />} path="/profileedit" />
                <Route element={<AchievePage />} path="/achieve" />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </FluentProvider>
  );
}

export default App;
