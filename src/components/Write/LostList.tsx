import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { makeStyles } from "@fluentui/react-components";

import { mainColor, skeletonColor } from "../../styles/color";
import { contentMargin, headerHeight } from "../../styles/margin";
import Category from "../Category/CategoryList";


interface DatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  dateFormat?: string;
  className?: string;
  placeholderText?: string;
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: `calc(100vh - ${headerHeight} - ${contentMargin})`
  },
  title: {
    color: mainColor,
    display: "flex",
    justifyContent: "space-between",
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "40px"
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
    width: "45vw",
    boxSizing: "border-box",
    fontSize: "14px",
    outline: "none"
  }
});

const LostList: React.FC = () => {
  const styles = useStyles();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  );
  const [startDate, setStartDate] = useState<Date | null>(null);

  const handleCategorySelect = (category: string, subcategory: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
  };

  const renderTitle = () => {
    if (selectedCategory && selectedSubcategory) {
      return (
        <h1>
          {selectedCategory} {">"} {selectedSubcategory}
        </h1>
      );
    } else {
      return <h1>카테고리 01 {">"} 카테고리 02</h1>;
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        {renderTitle()}
        <div>
          <Category onSelect={handleCategorySelect} />
        </div>
      </div>

      <div className={styles.listMargin}>
        <a className={styles.subTitle}>분실물 이름</a>
        <div className={styles.listContainer}>
          <input className={styles.input} type="text" />
        </div>
      </div>
      <div className={styles.listMargin}>
        <a className={styles.subTitle}>분실 날짜</a>
        <div className={styles.listContainer}>
          <DatePicker
            className={styles.input}
            dateFormat="yyyy-MM-dd"
            placeholderText="날짜 선택"
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date)}
          />
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
