import { makeStyles } from "@fluentui/react-components";
import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";

import { searchLostFound } from "../apis/lostfound";
import SearchForm from "../components/Search/SearchForm";
import SearchList from "../components/Search/SearchList";
import useSearchStore from "../stores/search";
import {
  contentMargin,
  contentMobileMargin,
  headerHeight,
  headerMobileHeight
} from "../styles/margin";
import { mobileWidth, tabletWidth } from "../styles/size";

const useStyles = makeStyles({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    height: `calc(100dvh - ${headerHeight} - ${contentMargin})`,
    [`@media (max-width: ${tabletWidth})`]: {
      position: "fixed",
      bottom: 0,
      width: "100%"
    },
    [`@media (max-width: ${mobileWidth})`]: {
      height: `calc(100dvh - ${headerMobileHeight} - ${contentMobileMargin})`
    }
  }
});

function SearchPage() {
  const styles = useStyles();
  const didMount = useRef(false);

  const { query, items, setItems, page, setPage } = useSearchStore();

  const [isEndOfPage, setIsEndOfPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getItems = () => {
    setIsLoading(true);
    searchLostFound(query, page)
      .then((data) => {
        if (data.length > 0) {
          setItems([...items, ...data]);
          setPage(page + 1);
        } else {
          setIsEndOfPage(true);
        }
      })
      .catch((e: AxiosError) => {
        console.error(e);
        setIsEndOfPage(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (didMount.current) {
      setItems([]);
      setPage(0);
      setIsEndOfPage(false);
    } else {
      didMount.current = true;
    }
  }, [query]);

  return (
    <div className={styles.root}>
      <SearchForm />
      <SearchList getItems={getItems} isEndOfPage={isEndOfPage} isLoading={isLoading} />
    </div>
  );
}

export default SearchPage;
