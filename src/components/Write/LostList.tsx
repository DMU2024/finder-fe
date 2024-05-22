import { makeStyles } from "@fluentui/react-components";
import React from "react";

import { mainColor, secondaryColor, skeletonColor } from "../../styles/color";
import { contentMargin, headerHeight } from "../../styles/margin";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: `calc(100vh - ${headerHeight} - ${contentMargin})`
  },
  title: {
    color: mainColor,
    fontSize: "40px",
    marginBottom: "80px"
  },
  subTitle: {
    color: skeletonColor,
    fontSize: "20px",
    fontWeight: "bold"
  },
  listContainer: {
    position: "relative",
    marginTop: "10px"
  },
  listMargin: {
    marginBottom: "40px"
  },
  input: {
    height: "53px",
    border: "1px solid #D9D9D9",
    padding: "8px",
    width: "100%",
    boxSizing: "border-box",
    fontSize: "14px",
    outline: "none"
  }
});

const LostList = () => {
  const styles = useStyles();

  return (
    <div>
      <h2 className={styles.title}>Category</h2>
      <div className={styles.listMargin}>
        <a className={styles.subTitle}>분실물 이름</a>
        <div className={styles.listContainer}>
          <input className={styles.input} type="text" />
        </div>
      </div>
      <div className={styles.listMargin}>
        <a className={styles.subTitle}>분실 날짜</a>
        <div className={styles.listContainer}>
          <input className={styles.input} type="text" />
        </div>
      </div>
      <div className={styles.listMargin}>
        <a className={styles.subTitle}>분실 장소</a>
        <div className={styles.listContainer}>
          <input className={styles.input} type="text" />
        </div>
      </div>
      <div className={styles.listMargin}>
        <a className={styles.subTitle}>물품 상태</a>
        <div className={styles.listContainer}>
          <input className={styles.input} type="text" />
        </div>
      </div>
    </div>
  );
};

export default LostList;
