import { ErrorCircleRegular } from "@fluentui/react-icons";

import useStyles from "@/pages/error/index.css";

function ErrorPage() {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <ErrorCircleRegular className={styles.icon} />
      <div className={styles.text}>페이지를 찾을 수 없습니다.</div>
    </div>
  );
}

export default ErrorPage;
