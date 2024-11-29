import { makeStyles, tokens } from "@fluentui/react-components";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { getLoginURI, postLogin } from "../apis/user";
import useAuthStore from "../stores/auth";
import { mainColor } from "../styles/color";
import { headerHeight, headerMobileHeight } from "../styles/margin";
import { mobileWidth } from "../styles/size";

const useStyles = makeStyles({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: `calc(100dvh - ${headerHeight})`,
    [`@media (max-width: ${mobileWidth})`]: {
      height: `calc(100dvh - ${headerMobileHeight})`
    }
  },
  container: {
    width: "82vw",
    height: "80vh",
    boxShadow: "0 0px 12px rgba(0, 0, 0, 0.1)",
    borderRadius: "30px 30px 0px 0px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    bottom: 0,
    [`@media (max-width: ${mobileWidth})`]: {
      width: "100vw",
      height: "100dvh"
    }
  },
  leftContainer: {
    width: "40vw",
    height: "100%",
    backgroundColor: mainColor,
    borderRadius: "30px 0px 0px 0px",
    [`@media (max-width: ${mobileWidth})`]: {
      display: "none"
    }
  },
  rightContainer: {
    width: "60vw",
    height: "100%",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "0px 30px 0px 0px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    [`@media (max-width: ${mobileWidth})`]: {
      width: "100vw",
      height: "100dvh"
    }
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
    color: mainColor,
    width: "auto",
    marginBottom: "10px"
  },
  loginText: {
    fontSize: "42px",
    fontWeight: "bold",
    color: tokens.colorNeutralForeground2,
    width: "auto",
    marginBottom: "30px",
    [`@media (max-width: ${mobileWidth})`]: {
      fontSize: "36px"
    }
  },
  detailText: {
    fontSize: "16px",
    fontWeight: "bold",
    color: tokens.colorNeutralForegroundDisabled,
    width: "auto",
    marginBottom: "5px"
  },
  detailTextStylePlus: {
    fontSize: "12px",
    fontWeight: "bold",
    color: tokens.colorNeutralForeground2,
    width: "auto"
  },
  image: {
    cursor: "pointer",
    width: "40%",
    marginTop: "20px",
    marginBottom: "10px",
    [`@media (max-width: ${mobileWidth})`]: {
      width: "70%"
    }
  },
  fullImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "30px 0px 0px 0px",
    opacity: "40%"
  }
});

function LoginPage() {
  const styles = useStyles();
  const navigate = useNavigate();
  const { setUserId } = useAuthStore();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const scope = searchParams.get("scope");

  const kakaoLogin = () => {
    const uri = getLoginURI() + (scope ? `&scope=${scope}` : "&prompt=login");
    window.open(uri, "_self");
  };

  useEffect(() => {
    if (code) {
      postLogin(code)
        .then((res) => {
          setUserId(res.userId);
          navigate("/");
        })
        .catch((err) => {
          alert(err);
          navigate("/login");
        });
    }
    if (scope) {
      kakaoLogin();
    }
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <img className={styles.fullImage} src="/loginStyleImg.png" />
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.logo}> Finder </div>
          <div className={styles.loginText}> Login </div>
          <div className={styles.detailText}>아이디와 비밀번호 없이 로그인해보세요.</div>

          <img
            className={styles.image}
            src="/kakaoLogin.png"
            onClick={() => {
              kakaoLogin();
            }}
          />

          <div className={styles.detailTextStylePlus}>
            채팅, 마이페이지 기능을 이용하기 위해서는 로그인이 필요합니다.
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
