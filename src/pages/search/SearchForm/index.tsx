import { SearchBox } from "@fluentui/react-components";
import { FilterRegular, SearchRegular, SendRegular } from "@fluentui/react-icons";
import { useState } from "react";

import useStyles from "@/pages/search/SearchForm/index.css";
import SearchFilter from "@/pages/search/SearchForm/SearchFilter";
import useSearchStore from "@/stores/search";
import { mainColor } from "@/styles/color";

function SearchForm() {
  const styles = useStyles();
  const { query, setQuery, isFilterEnabled, setIsFilterEnabled } = useSearchStore();
  const [searchText, setSearchText] = useState(query?.keyword ?? "");

  return (
    <div className={styles.root}>
      <div className={styles.searchHeader}>
        <div>
          <SearchRegular style={{ color: mainColor, fontSize: "2em", marginLeft: "14px" }} />
          <span className={styles.title}>검색</span>
        </div>
      </div>
      <div className={styles.searchContainer}>
        <FilterRegular
          className={styles.filterIcon}
          onClick={() => {
            setIsFilterEnabled(!isFilterEnabled);
          }}
        />
        <SearchBox
          appearance="underline"
          className={styles.searchBox}
          contentAfter={
            <SendRegular
              style={{
                cursor: "pointer"
              }}
              onClick={() => {
                setQuery({ ...query, keyword: searchText });
              }}
            />
          }
          placeholder="Search for..."
          value={searchText}
          onChange={(event, data) => {
            // X 버튼 눌러서 검색어 초기화 된 경우
            if (event.nativeEvent instanceof PointerEvent) {
              setQuery({ ...query, keyword: data.value });
            }
            setSearchText(data.value);
          }}
          onKeyDown={(event) => {
            if (event.key == "Enter") {
              setQuery({ ...query, keyword: searchText });
            }
          }}
        />
      </div>
      {isFilterEnabled && <SearchFilter />}
    </div>
  );
}

export default SearchForm;
