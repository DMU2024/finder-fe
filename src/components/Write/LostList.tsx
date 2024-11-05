import { DefaultButton } from "@fluentui/react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from "react-router-dom";

import { postMarker } from "../../apis/marker";
import useAuthStore from "../../stores/auth";
import useMainStore from "../../stores/main";
import usePositionStore from "../../stores/position";
import useWriteStore from "../../stores/write";
import { mainColor, skeletonColor } from "../../styles/color";
import { mobileWidth, tabletWidth } from "../../styles/size";
import Category from "../Category/CategoryList";

const useStyles = makeStyles({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    [`@media (max-width: ${tabletWidth})`]: {
      marginTop: "100px"
    },
    [`@media (max-width: ${mobileWidth})`]: {
      marginTop: "auto"
    }
  },
  title: {
    color: mainColor,
    display: "flex",
    justifyContent: "space-between",
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "24px",
    [`@media (max-width: ${mobileWidth})`]: {
      fontSize: "12px",
      marginBottom: "20px"
    }
  },
  subTitle: {
    color: skeletonColor,
    fontSize: "20px",
    fontWeight: "bold",
    [`@media (max-width: ${mobileWidth})`]: {
      fontSize: "14px"
    }
  },
  listContainer: {
    position: "relative",
    marginTop: "10px"
  },
  listMargin: {
    marginBottom: "30px",
    [`@media (max-width: ${mobileWidth})`]: {
      marginBottom: "30px"
    }
  },
  input: {
    width: "100%",
    height: "46px",
    border: "1px solid #D9D9D9",
    padding: "8px",
    boxSizing: "border-box",
    fontSize: "14px",
    outline: "none",
    [`@media (max-width: ${mobileWidth})`]: {
      height: "40px"
    }
  },
  addInput: {
    width: "100%",
    height: "140px",
    border: "1px solid #D9D9D9",
    padding: "8px",
    boxSizing: "border-box",
    fontSize: "14px",
    outline: "none",
    [`@media (max-width: ${mobileWidth})`]: {
      height: "160px"
    }
  },
  datePicker: {
    display: "unset!important"
  },
  submitButtonContainer: {
    display: "flex",
    justifyContent: "flex-end"
  },
  submitButton: {
    marginBottom: "12px",
    padding: "20px 30px",
    backgroundColor: tokens.colorBrandBackground,
    color: "white",
    borderRadius: "4px",
    outline: "none",
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
  const location = useLocation();

  const {
    selectedCategory,
    selectedSubcategory,
    setSelectedCategory,
    setSelectedSubcategory
  } = useWriteStore();

  const nameRef = useRef<HTMLInputElement | null>(null);
  const addrRef = useRef<HTMLInputElement | null>(null);
  const infoRef = useRef<HTMLInputElement | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const {
    address,
    latitude,
    longitude,
    clickedInfo,
    setLatitude,
    setLongitude,
    setZoomLevel,
    setClickedInfo
  } = usePositionStore();

  const { setShowLostGoods } = useMainStore();
  const { userId } = useAuthStore();

  const renderTitle = () => {
    if (selectedCategory && selectedSubcategory) {
      return (
        <div>
          <h1>
            {"대분류: "} {selectedCategory}
          </h1>
          <h2>
            {"소분류: "} {selectedSubcategory}
          </h2>
        </div>
      );
    } else {
      return (
        <div>
          <h1>대분류</h1>
          <h2>소분류</h2>
        </div>
      );
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        {renderTitle()}
        <div>
          <Category />
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
            className={styles.input}
            dateFormat="yyyy-MM-dd"
            placeholderText="날짜 선택"
            selected={startDate}
            wrapperClassName={styles.datePicker}
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
            defaultValue={clickedInfo?.address ? clickedInfo.address : address}
            type="text"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
      </div>
      <div className={styles.listMargin}>
        <a className={styles.subTitle}>추가 설명</a>
        <div className={styles.listContainer}>
          <input ref={infoRef} className={styles.addInput} type="text" />
        </div>
      </div>
      <div className={styles.submitButtonContainer}>
        <DefaultButton
          className={styles.submitButton}
          text="등록"
          onClick={() => {
            postMarker({
              _id: "",
              name: `${nameRef.current?.value}`,
              date: `${startDate?.toISOString().split("T")[0]}`,
              address: `${addrRef.current?.value}`,
              category: `${selectedCategory} > ${selectedSubcategory}`,
              info: `${infoRef.current?.value}`,
              lat: clickedInfo?.lat ? clickedInfo.lat : latitude,
              lng: clickedInfo?.lng ? clickedInfo.lng : longitude,
              userId: userId
            }).then((data) => {
              // write
              setSelectedCategory(undefined);
              setSelectedSubcategory(undefined);

              // position
              setLatitude(data.lat);
              setLongitude(data.lng);
              setZoomLevel(3);
              setClickedInfo(undefined);

              // main
              setShowLostGoods(true);

              navigate("/", { state: location.pathname });
            });
          }}
        />
      </div>
    </div>
  );
}

export default LostList;
