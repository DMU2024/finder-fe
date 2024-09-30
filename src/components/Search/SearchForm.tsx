import { SearchBox, makeStyles } from "@fluentui/react-components";
import { SearchRegular } from "@fluentui/react-icons";
import { useEffect, useState } from "react";

import useSearchStore from "../../stores/search";
import { mainColor } from "../../styles/color";

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
      margin: "16px 10px 0px 10px",
    }
  },
  searchBox: {
    flex: 1,
    maxWidth: "100%",
    minHeight: "48px",
    "@media (max-width: 390px)": {
      minHeight: "32px",
    }
  },
  title: {
    fontSize: "4em",
    "@media (max-width: 390px)": {
      fontSize: "2em",
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
      <SearchBox
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
  );
}

export default SearchForm;
