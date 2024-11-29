import { DefaultButton } from "@fluentui/react";
import { Input, makeStyles, tokens } from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { DismissRegular } from "@fluentui/react-icons";

import { Marker, postMarker } from "../../apis/marker";
import useMarkerRedirect from "../../hooks/useMarkerRedirect";
import useAuthStore from "../../stores/auth";
import useWriteStore from "../../stores/write";
import { mainColor, skeletonColor } from "../../styles/color";
import { mobileWidth, tabletWidth } from "../../styles/size";
import { formatDate } from "../../utils/format";
import { localizedStrings } from "../Search/SearchFilterOption";
import WriteCategory from "./Category/WriteCategory";
import WritePlaceDialog from "./WritePlaceSelectDialog";

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

function WriteLostGoodsForm() {
  const styles = useStyles();
  const redirect = useMarkerRedirect();

  const {
    selectedCategory,
    selectedSubcategory,
    lostName,
    lostDate,
    lostPlace,
    lostLat,
    lostLng,
    lostInfo,
    setSelectedCategory,
    setSelectedSubcategory,
    setLostName,
    setLostDate,
    setLostPlace,
    setLostLat,
    setLostLng,
    setLostInfo
  } = useWriteStore();

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
          <WriteCategory />
        </div>
      </div>
      <div className={styles.listMargin}>
        <a className={styles.subTitle}>분실물 이름</a>
        <div className={styles.listContainer}>
          <Input
            className={styles.input}
            contentAfter={
              <DismissRegular
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setLostName("");
                }}
              />
            }
            type="text"
            value={lostName}
            onChange={(_, data) => {
              setLostName(data.value);
            }}
          />
        </div>
      </div>
      <div className={styles.listMargin}>
        <a className={styles.subTitle}>분실 날짜</a>
        <div className={styles.listContainer}>
          <DatePicker
            readOnly
            className={styles.input}
            contentAfter={
              <DismissRegular
                onClick={(e) => {
                  e.stopPropagation();
                  setLostDate(undefined);
                }}
              />
            }
            formatDate={formatDate}
            maxDate={new Date()}
            placeholder="시작날짜"
            showMonthPickerAsOverlay={true}
            strings={localizedStrings}
            value={lostDate ?? null}
            onSelectDate={(date) => {
              if (date) {
                setLostDate(date);
              }
            }}
          />
        </div>
      </div>
      <div className={styles.listMargin}>
        <a className={styles.subTitle}>분실 장소</a>
        <div className={styles.listContainer}>
          <WritePlaceDialog styleProps={{ input: styles.input }} title="장소 선택" />
        </div>
      </div>
      <div className={styles.listMargin}>
        <a className={styles.subTitle}>추가 설명</a>
        <div className={styles.listContainer}>
          <Input
            className={styles.addInput}
            type="text"
            value={lostInfo}
            onChange={(_, data) => {
              setLostInfo(data.value);
            }}
          />
        </div>
      </div>
      <div className={styles.submitButtonContainer}>
        <DefaultButton
          className={styles.submitButton}
          text="등록"
          onClick={() => {
            const marker: Marker = {
              _id: "",
              name: lostName,
              date: formatDate(lostDate),
              address: lostPlace,
              category: `${selectedCategory} > ${selectedSubcategory}`,
              info: lostInfo,
              lat: lostLat,
              lng: lostLng,
              userId: userId
            };

            postMarker(marker).then((data) => {
              setSelectedCategory(undefined);
              setSelectedSubcategory(undefined);
              setLostName("");
              setLostDate(undefined);
              setLostPlace("");
              setLostLat(0);
              setLostLng(0);
              setLostInfo("");
              redirect(true, data.lat, data.lng, data._id);
            });
          }}
        />
      </div>
    </div>
  );
}

export default WriteLostGoodsForm;
