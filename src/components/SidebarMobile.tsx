import { Image, makeStyles, Tab, TabList, tokens } from "@fluentui/react-components";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { getUser, postLogout, User } from "@/apis/user";
import useAuthStore from "@/stores/auth";
import useOptionStore from "@/stores/option";
import { mainColor } from "@/styles/color";
import { tabletWidth02 } from "@/styles/size";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    top: 0,
    right: 0,
    height: "100dvh",
    width: "70vw",
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
    transition: "transform 0.3s ease-in-out",
    zIndex: 2,
    [`@media (min-width: ${tabletWidth02})`]: {
      display: "none"
    }
  },
  open: {
    transform: "translateX(0)",
    [`@media (min-width: ${tabletWidth02})`]: {
      display: "none"
    }
  },
  closed: {
    transform: "translateX(100%)",
    [`@media (min-width: ${tabletWidth02})`]: {
      display: "none"
    }
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100dvh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 0,
    [`@media (min-width: ${tabletWidth02})`]: {
      display: "none"
    }
  },
  profile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "70px"
  },
  subInfoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px"
  },
  subInfo01: {
    fontSize: "16px",
    fontWeight: "bold"
  },
  subInfo02: {
    fontSize: "12px",
    color: mainColor,
    fontWeight: "bold"
  },
  tab: {
    margin: "10px 0px 10px 20px"
  },
  bottomContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "auto",
    padding: "30px"
  }
});

interface MobileProps {
  img?: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function SidebarMobile({ isOpen, setIsOpen }: MobileProps) {
  const styles = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState("");
  const [user, setUser] = useState<User>();
  const { userId, setUserId } = useAuthStore();
  const { isDarkTheme, setIsDarkTheme } = useOptionStore();

  useEffect(() => {
    if (userId && isOpen) {
      getUser(userId).then((res) => {
        setUser(res);
      });
    }
  }, []);

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
      case "/write":
        setSelectedTab("tab5");
        break;
      default:
        setSelectedTab("");
        break;
    }
  }, [location]);

  return (
    <>
      <div className={`${styles.root} ${isOpen ? styles.open : styles.closed}`}>
        <div className={styles.profile}>
          <Image
            fit="cover"
            shape="circular"
            src={user ? user.profileImage : "/profileIMGimsi.png"}
            style={{ width: "150px", height: "150px" }}
          />
          <div className={styles.subInfoContainer}>
            <div className={styles.subInfo01}>{user ? user.username : "Guest"}</div>
            <div className={styles.subInfo02}>{user ? `@${user?.userId}` : ""}</div>
          </div>
        </div>

        <div>
          <TabList vertical selectedValue={selectedTab}>
            <Tab
              className={`${styles.tab} ${selectedTab === "tab1" ? selectedTab : ""}`} // className 수정
              value="tab1"
              onClick={() => {
                navigate("/");
                setIsOpen(false);
              }}
            >
              메인화면
            </Tab>
            <Tab
              className={`${styles.tab} ${selectedTab === "tab2" ? selectedTab : ""}`} // className 수정
              value="tab2"
              onClick={() => {
                navigate("/search");
                setIsOpen(false);
              }}
            >
              검색
            </Tab>
            <Tab
              className={`${styles.tab} ${selectedTab === "tab3" ? selectedTab : ""}`} // className 수정
              value="tab3"
              onClick={() => {
                navigate("/chat");
                setIsOpen(false);
              }}
            >
              대화
            </Tab>
            <Tab
              className={`${styles.tab} ${selectedTab === "tab4" ? selectedTab : ""}`} // className 수정
              value="tab4"
              onClick={() => {
                navigate("/profile");
                setIsOpen(false);
              }}
            >
              마이페이지
            </Tab>
            <Tab
              className={`${styles.tab} ${selectedTab === "tab5" ? selectedTab : ""}`} // className 수정
              value="tab5"
              onClick={() => {
                navigate("/write");
                setIsOpen(false);
              }}
            >
              새 글 쓰기
            </Tab>
          </TabList>
        </div>

        <div className={styles.bottomContainer}>
          <div
            onClick={() => {
              if (userId) {
                postLogout(userId).then(() => {
                  setUserId(undefined);
                  setUser(undefined);
                  navigate("/");
                  setIsOpen(false);
                });
              } else {
                navigate("/login");
                setIsOpen(false);
              }
            }}
          >
            {userId ? "로그아웃" : "로그인"}
          </div>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              setIsDarkTheme(!isDarkTheme);
            }}
          >
            {isDarkTheme ? "라이트모드" : "다크모드"}
          </div>
        </div>
      </div>
      {isOpen && <div className={styles.overlay} onClick={() => setIsOpen(false)} />}
    </>
  );
}

export default SidebarMobile;
