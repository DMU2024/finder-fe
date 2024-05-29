import { DefaultButton } from "@fluentui/react";
import { makeStyles, mergeClasses, tokens } from "@fluentui/react-components";
import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useLocation, useNavigate } from "react-router-dom";

import { postMock } from "../../apis/mock";
import usePositionStore from "../../stores/position";
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
    flex: 1,
    display: "flex",
    flexDirection: "column"
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
    width: "100%",
    height: "53px",
    border: "1px solid #D9D9D9",
    padding: "8px",
    boxSizing: "border-box",
    fontSize: "14px",
    outline: "none"
  },
  datePicker: {
    ".wrapper": {
      backgroundColor: "red"
    }
  },
  submitButtonContainer: {
    display: "flex",
    justifyContent: "flex-end"
  },
  submitButton: {
    padding: "20px 30px",
    backgroundColor: tokens.colorBrandBackground,
    color: "white",
    borderRadius: "4px",
    fontSize: "16px",
    boxShadow: tokens.shadow4,
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: tokens.colorBrandBackgroundHover
    },
    "&:active": {
      backgroundColor: tokens.colorBrandBackgroundPressed
    }
  }
});

function LostList() {
  const styles = useStyles();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  );

  const nameRef = useRef<HTMLInputElement | null>(null);
  const addrRef = useRef<HTMLInputElement | null>(null);
  const infoRef = useRef<HTMLInputElement | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const detailAddress = queryParams.get("detailAddr");
  const detailLatitude = Number(queryParams.get("lat"));
  const detailLongitude = Number(queryParams.get("lng"));
  const { address, latitude, longitude } = usePositionStore();

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
      return <h1>대분류 {">"} 소분류</h1>;
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
          <input
            ref={nameRef}
            className={styles.input}
            defaultValue={selectedSubcategory ? selectedSubcategory : ""}
            type="text"
          />
        </div>
      </div>
      <div className={styles.listMargin}>
        <a className={styles.subTitle}>분실 날짜</a>
        <div className={styles.listContainer}>
          <DatePicker
            className={mergeClasses(styles.input, styles.datePicker)}
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
          <input
            ref={addrRef}
            className={styles.input}
            defaultValue={detailAddress ? detailAddress : address}
            type="text"
          />
        </div>
      </div>
      <div className={styles.listMargin}>
        <a className={styles.subTitle}>추가 설명</a>
        <div className={styles.listContainer}>
          <input ref={infoRef} className={styles.input} type="text" />
        </div>
      </div>
      <div className={styles.submitButtonContainer}>
        <DefaultButton
          className={styles.submitButton}
          text="등록"
          onClick={() => {
            postMock({
              name: `${nameRef.current?.value}`,
              date: `${startDate?.toISOString().split("T")[0]}`,
              address: `${addrRef.current?.value}`,
              category: `${selectedCategory} > ${selectedSubcategory}`,
              info: `${infoRef.current?.value}`,
              lat: detailLatitude ? detailLatitude : latitude,
              lng: detailLongitude ? detailLongitude : longitude
            }).then((data) => {
              navigate(-1);
              console.log(data);
            });
          }}
        />
      </div>
    </div>
  );
}

export default LostList;
