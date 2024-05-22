import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  TableCellLayout,
  makeStyles,
  Image,
  Spinner,
  tokens
} from "@fluentui/react-components";
import { AxiosError } from "axios";
import { useState } from "react";

import { Item, getItemsByPage } from "../../apis/items";
import useIntersect from "../../hooks/useIntersect";

const useStyles = makeStyles({
  root: {
    overflow: "auto",
    "::-webkit-scrollbar": {
      display: "none"
    }
  },
  tableHeader: {
    backgroundColor: ""
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

  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [isEndOfPage, setIsEndOfPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getItems = () => {
    setIsLoading(true);
    getItemsByPage(page)
      .then((data) => {
        if (data.length > 0) {
          setItems([...items, ...data]);
          setPage(page + 1);
        } else {
          setIsEndOfPage(true);
        }
      })
      .catch((e: AxiosError) => console.error(e))
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

  return (
    <div className={styles.root}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>사진</TableHeaderCell>
            <TableHeaderCell>이름</TableHeaderCell>
            <TableHeaderCell>습득 장소</TableHeaderCell>
            <TableHeaderCell>습득 날짜</TableHeaderCell>
            <TableHeaderCell>분류</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <TableCellLayout
                  media={<Image src="/logo192.png" width="128px" />}
                />
              </TableCell>
              <TableCell>
                <TableCellLayout media={item.category} />
              </TableCell>
              <TableCell>
                <TableCellLayout media={`${item.lat} ${item.lng}`} />
              </TableCell>
              <TableCell>
                <TableCellLayout media={"XXXX.XX.XX"} />
              </TableCell>
              <TableCell>
                <TableCellLayout media={item.category} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div ref={scrollRef}>
        {isLoading && <Spinner className={styles.spinner} />}
      </div>
    </div>
  );
}

export default SearchList;
