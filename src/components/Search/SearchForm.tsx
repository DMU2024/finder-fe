import { SearchBox, makeStyles } from "@fluentui/react-components";
import { SearchRegular, FilterRegular } from "@fluentui/react-icons"; // 필터 아이콘 추가
import { useEffect, useState } from "react";

import useSearchStore from "../../stores/search";
import { mainColor } from "../../styles/color"; // 필요한 색상 추가

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  searchHeader: {
    display: "flex",
    margin: "16px 10px 10px 10px",
    "@media (max-width: 390px)": {
      margin: "16px 10px 0px 10px"
    }
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    minHeight: "48px",
    "@media (max-width: 390px)": {
      width: "90vw",
      minHeight: "32px",
      padding: "5px 20px 0 20px"
    }
  },
  searchBox: {
    width: "100%",
    minHeight: "48px",
    borderRadius: "8px",
    padding: "8px",
    outline: "none",
    "@media (max-width: 390px)": {
      width: "100%",
      minHeight: "32px"
    }
  },
  filterIcon: {
    fontSize: "2em",
    color: mainColor,
    cursor: "pointer",
    marginRight: "10px",
    "@media (max-width: 390px)": {
      fontSize: "1.5em"
    }
  },
  title: {
    fontSize: "4em",
    "@media (max-width: 390px)": {
      fontSize: "2em"
    }
  }
});

function SearchForm() {
  const styles = useStyles();
  const { setQuery } = useSearchStore();
  const [debouncedQuery, setDebouncedQuery] = useState<string | undefined>();

  useEffect(() => {
    const delayDebounceTimer = setTimeout(() => {
      setQuery(debouncedQuery);
    }, 500);
    return () => clearTimeout(delayDebounceTimer);
  }, [debouncedQuery]);

  return (
    <div className={styles.root}>
      <div className={styles.searchHeader}>
        <div>
          <SearchRegular style={{ color: mainColor, fontSize: "2em" }} />
          <span className={styles.title}>검색</span>
        </div>
      </div>
      <div className={styles.searchContainer}>
        <FilterRegular className={styles.filterIcon} />
        <SearchBox
          appearance="underline"
          className={styles.searchBox}
          defaultValue={debouncedQuery}
          placeholder="Search for..."
          onChange={(event, data) => {
            if (event.nativeEvent instanceof MouseEvent) {
              setQuery(undefined);
            } else {
              setDebouncedQuery(data.value);
            }
          }}
        />
      </div>
    </div>
  );
}

export default SearchForm;
