import { makeStyles } from "@fluentui/react-components";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { getLoginURI, postLogin } from "../apis/user";
import { useAuthStore } from "../stores/auth";

const useStyles = makeStyles({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
});

function LoginPage() {
  const styles = useStyles();
  const navigate = useNavigate();
  const { setUserId } = useAuthStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");

  const kakaoLogin = () => {
    window.open(getLoginURI(), "_self");
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
  }, []);

  return (
    <div className={styles.root}>
      <img
        src="/kakaoLogin.png"
        style={{ cursor: "pointer" }}
        onClick={() => {
          kakaoLogin();
        }}
      />
    </div>
  );
}

export default LoginPage;