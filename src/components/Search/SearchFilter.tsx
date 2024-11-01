import {
  Card,
  Dropdown,
  Input,
  makeStyles,
  Option,
  tokens
} from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { DismissRegular } from "@fluentui/react-icons";

import {
  colorOption,
  localizedStrings,
  onFormatDate
} from "./SearchFilterOption";
import useSearchStore from "../../stores/search";
import { mobileWidth } from "../../styles/size";

const useStyles = makeStyles({
  root: {
    borderRadius: "16px",
    padding: "24px",
    [`@media (max-width: ${mobileWidth})`]: {
      width: "90vw",
      margin: "0 20px 0 20px"
    }
  },
  filterElement: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  filterTitle: {
    minWidth: "max-content"
  },
  filterColor: {
    width: "12px",
    height: "12px",
    border: `2px solid ${tokens.colorNeutralBackground3}`,
    borderRadius: "32px",
    padding: "2px"
  },
  filterInput: {
    flex: 1,
    height: "48px",
    border: "1px solid #D9D9D9",
    borderRadius: "4px",
    padding: "8px",
    boxSizing: "border-box",
    fontSize: "14px",
    outline: "none",
    minWidth: "0px"
  },
  filterDismiss: {
    marginRight: "10px",
    cursor: "pointer"
  },
  filterReset: {
    minWidth: "max-content",
    marginLeft: "auto",
    color: "red",
    cursor: "pointer"
  }
});

function SearchFilter() {
  const styles = useStyles();

  const {
    filterColor,
    setFilterColor,
    filterCategory,
    setFilterCategory,
    filterStartDate,
    setFilterStartDate,
    filterEndDate,
    setFilterEndDate
  } = useSearchStore();

  return (
    <Card className={styles.root}>
      <div className={styles.filterElement}>
        <span className={styles.filterTitle}>물건색상</span>
        <Dropdown
          clearable
          className={styles.filterInput}
          selectedOptions={[filterColor]}
          value={filterColor}
          onOptionSelect={(_, data) => {
            setFilterColor(data.optionValue ?? "");
          }}
        >
          {Object.entries(colorOption).map(([color, hex]) => (
            <Option key={color} text={color}>
              <span
                className={styles.filterColor}
                style={{ backgroundColor: hex }}
              />
              <span>{color}</span>
            </Option>
          ))}
        </Dropdown>
      </div>
      <div className={styles.filterElement}>
        <span className={styles.filterTitle}>카테고리</span>
        <Input className={styles.filterInput} value={filterCategory} />
      </div>
      <div className={styles.filterElement}>
        <span className={styles.filterTitle}>등록날짜</span>
        <DatePicker
          className={styles.filterInput}
          contentAfter={
            <DismissRegular
              className={styles.filterDismiss}
              onClick={() => setFilterStartDate(undefined)}
            />
          }
          formatDate={onFormatDate}
          maxDate={new Date()}
          placeholder="시작날짜"
          showMonthPickerAsOverlay={true}
          strings={localizedStrings}
          value={filterStartDate}
          onSelectDate={setFilterStartDate as (date?: Date | null) => void}
        />
        <span>-</span>
        <DatePicker
          className={styles.filterInput}
          contentAfter={
            <DismissRegular
              className={styles.filterDismiss}
              onClick={() => setFilterEndDate(undefined)}
            />
          }
          formatDate={onFormatDate}
          maxDate={new Date()}
          placeholder="종료날짜"
          showMonthPickerAsOverlay={true}
          strings={localizedStrings}
          value={filterEndDate}
          onSelectDate={setFilterEndDate as (date?: Date | null) => void}
        />
      </div>
      <div
        className={styles.filterReset}
        onClick={() => {
          setFilterColor("");
          setFilterCategory("");
          setFilterStartDate(undefined);
          setFilterEndDate(undefined);
        }}
      >
        모두 초기화
      </div>
    </Card>
  );
}

export default SearchFilter;
