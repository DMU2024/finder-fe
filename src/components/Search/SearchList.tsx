import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  makeStyles,
  Spinner,
  tokens
} from "@fluentui/react-components";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

import SearchListItem from "./SearchListItem";
import { searchLostFound, getLostFound } from "../../apis/lostfound";
import useIntersect from "../../hooks/useIntersect";
import useSearchStore from "../../stores/search";

const useStyles = makeStyles({
  root: {
    overflow: "auto"
  },
  tableHeader: {
    backgroundColor: tokens.colorNeutralBackground1,
    fontSize: "12px !important",
    "@media (max-width: 390px)": {
      display: "none"
    }
  },
  tableBody: {
    "@media (max-width: 390px)": {
      display: "block"
    }
  },
  tableRow: {
    "@media (max-width: 390px)": {
      display: "block",
      marginBottom: "16px"
    }
  },
  tableCell: {
    "@media (max-width: 390px)": {
      display: "block",
      padding: "8px 0",
      textAlign: "left",
      "&::before": {
        content: "attr(data-label)",
        fontWeight: "bold",
        display: "block",
        marginBottom: "4px"
      }
    }
  },
  spinner: {
    margin: "16px",
    "&>span": {
      backgroundColor: tokens.colorPaletteLightGreenBackground2
    }
  }
});

function SearchList() {
  const styles = useStyles();

  const { query, items, setItems, page, setPage } = useSearchStore();
  const [isEndOfPage, setIsEndOfPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getItems = () => {
    setIsLoading(true);
    const task = query ? searchLostFound(query, page) : getLostFound(page);

    task
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

  const scrollRef = useIntersect((entry, observer) => {
    observer.unobserve(entry.target);
    if (!isEndOfPage && !isLoading) {
      getItems();
    }
  });

  useEffect(() => {
    setItems([]);
    setPage(0);
    setIsEndOfPage(false);
  }, [query]);

  return (
    <div className={styles.root}>
      <Table>
        <TableHeader className={styles.tableHeader}>
          <TableRow>
            <TableHeaderCell>사진</TableHeaderCell>
            <TableHeaderCell>이름</TableHeaderCell>
            <TableHeaderCell>보관 장소</TableHeaderCell>
            <TableHeaderCell>보관 날짜</TableHeaderCell>
            <TableHeaderCell>분류</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody className={styles.tableBody}>
          {items.map((item, idx) => (
            <SearchListItem key={idx} item={item} />
          ))}
        </TableBody>
      </Table>
      <div ref={scrollRef}>
        {isLoading ? (
          <Spinner className={styles.spinner} />
        ) : (
          <div style={{ height: "1px" }} />
        )}
      </div>
    </div>
  );
}

export default SearchList;
