import { makeStyles, tokens } from "@fluentui/react-components";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { postLoginUser } from "../apis/user";
import { useAuthStore } from "../stores/auth";
import { skeletonColor } from "../styles/color";

const useStyles = makeStyles({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "64px",
    gap: "32px"
  },
  title: {
    color: skeletonColor,
    fontSize: "20px",
    fontWeight: "bold"
  },
  listContainer: {
    position: "relative",
    marginTop: "10px"
  },
  input: {
    width: "100%",
    height: "53px",
    border: "1px solid #D9D9D9",
    padding: "8px",
    boxSizing: "border-box",
    fontSize: "14px",
    outline: "none"
  },
  submitButtonContainer: {
    display: "flex",
    justifyContent: "flex-end"
  },
  submitButton: {
    padding: "10px 20px",
    color: "white",
    backgroundColor: tokens.colorBrandBackground,
    fontSize: "16px",
    border: "none"
  }
});

function LoginPage() {
  const styles = useStyles();
  const navigate = useNavigate();
  const { setIsLoggedIn, setUserId } = useAuthStore();

  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);

  return (
    <form
      className={styles.root}
      onSubmit={(e) => {
        e.preventDefault();

        postLoginUser(email.current?.value ?? "", password.current?.value ?? "")
          .then((res) => {
            setIsLoggedIn(true);
            setUserId(res.userId);
            navigate(-1);
          })
          .catch((err) => {
            alert(err);
          });
      }}
    >
      <a className={styles.title}>이메일</a>
      <div className={styles.listContainer}>
        <input ref={email} required className={styles.input} type="email" />
      </div>
      <a className={styles.title}>비밀번호</a>
      <div className={styles.listContainer}>
        <input
          ref={password}
          required
          className={styles.input}
          type="password"
        />
      </div>
      <div className={styles.submitButtonContainer}>
        <input className={styles.submitButton} type="submit" value="로그인" />
      </div>
    </form>
  );
}

export default LoginPage;
