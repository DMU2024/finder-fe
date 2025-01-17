import { Card } from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { DismissRegular } from "@fluentui/react-icons";

import useStyles from "@/pages/search/SearchForm/SearchFilter.css";
import SearchFilterDialog from "@/pages/search/SearchForm/SearchFilterDialog";
import { localizedStrings } from "@/pages/search/SearchForm/SearchFilterOption";
import useSearchStore from "@/stores/search";
import { formatDate } from "@/utils/format";

function SearchFilter() {
  const styles = useStyles();

  const { query, setQuery } = useSearchStore();

  return (
    <Card className={styles.root}>
      <div className={styles.filterElement}>
        <span className={styles.filterTitle}>물건색상</span>
        <SearchFilterDialog
          option="color"
          styleProps={{
            color: styles.filterColor,
            colorHex: styles.filterColorHex,
            input: styles.filterInput,
            dismiss: styles.filterDismiss
          }}
          title="색상 선택"
        />
      </div>
      <div className={styles.filterElement}>
        <span className={styles.filterTitle}>카테고리</span>
        <SearchFilterDialog
          option="category"
          styleProps={{
            color: styles.filterColor,
            colorHex: styles.filterColorHex,
            input: styles.filterInput,
            dismiss: styles.filterDismiss
          }}
          title="카테고리 선택"
        />
      </div>
      <div className={styles.filterElement}>
        <span className={styles.filterTitle}>등록날짜</span>
        <DatePicker
          className={styles.filterInput}
          contentAfter={
            <DismissRegular
              className={styles.filterDismiss}
              onClick={(e) => {
                e.stopPropagation();
                setQuery({ ...query, startYmd: undefined });
              }}
            />
          }
          formatDate={formatDate}
          maxDate={new Date()}
          placeholder="시작날짜"
          showMonthPickerAsOverlay={true}
          strings={localizedStrings}
          value={query?.startYmd ?? null}
          onSelectDate={(date) => {
            if (date) {
              const isInvalid = query?.endYmd && query.endYmd < date;
              setQuery({
                ...query,
                startYmd: date,
                endYmd: isInvalid ? date : query?.endYmd
              });
            }
          }}
        />
        <span>-</span>
        <DatePicker
          className={styles.filterInput}
          contentAfter={
            <DismissRegular
              className={styles.filterDismiss}
              onClick={(e) => {
                e.stopPropagation();
                setQuery({ ...query, endYmd: undefined });
              }}
            />
          }
          formatDate={formatDate}
          maxDate={new Date()}
          placeholder="종료날짜"
          showMonthPickerAsOverlay={true}
          strings={localizedStrings}
          value={query?.endYmd ?? null}
          onSelectDate={(date) => {
            if (date) {
              const isInvalid = query?.startYmd && query.startYmd > date;
              setQuery({
                ...query,
                startYmd: isInvalid ? date : query?.startYmd,
                endYmd: date
              });
            }
          }}
        />
      </div>
      <div
        className={styles.filterReset}
        onClick={() => {
          setQuery({ keyword: query?.keyword });
        }}
      >
        필터 초기화
      </div>
    </Card>
  );
}

export default SearchFilter;
