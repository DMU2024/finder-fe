import {
  SearchBox,
  Switch,
  makeStyles,
  tokens
} from "@fluentui/react-components";
import { SearchRegular } from "@fluentui/react-icons";
import { useEffect } from "react";

import usePositionStore from "../../stores/position";
import useSearchStore from "../../stores/search";
import { mainColor } from "../../styles/color";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  searchHeader: {
    display: "flex"
  },
  searchBox: {
    flex: 1,
    maxWidth: "100%",
    minHeight: "48px"
  }
});

function SearchForm() {
  const styles = useStyles();
  const { address, getCoords } = usePositionStore();
  const { query, isLostGoods, setQuery, setItems, setPrevId, setIsLostGoods } =
    useSearchStore();

  useEffect(() => {
    const delayDebounceTimer = setTimeout(() => {
      setItems([]);
      setPrevId(undefined);
    }, 500);
    return () => clearTimeout(delayDebounceTimer);
  }, [query]);

  return (
    <div className={styles.root}>
      <div className={styles.searchHeader}>
        <div>
          <SearchRegular style={{ color: mainColor, fontSize: "50px" }} />
          <span style={{ fontSize: "64px" }}>검색</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "auto",
            justifyContent: "end",
            fontSize: "13px",
            fontWeight: "bold"
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              gap: "8px"
            }}
          >
            <span
              style={{
                color: tokens.colorNeutralForeground4,
                cursor: "pointer"
              }}
              onClick={() => getCoords()}
            >
              변경
            </span>
            <span style={{ color: mainColor }}>현재 위치</span>
          </div>
          <div style={{ marginLeft: "auto" }}>{address}</div>
          <Switch
            checked={isLostGoods}
            label="분실물 검색"
            style={{ marginLeft: "auto" }}
            onChange={(e) => {
              setIsLostGoods(e.target.checked);
            }}
          />
        </div>
      </div>
      <SearchBox
        className={styles.searchBox}
        defaultValue={query}
        placeholder="Search for..."
        onChange={(_, data) => setQuery(data.value)}
      />
    </div>
  );
}

export default SearchForm;
