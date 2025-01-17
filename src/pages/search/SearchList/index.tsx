import { Spinner, Table, TableBody } from "@fluentui/react-components";
import { useEffect, useRef } from "react";

import useDebounce from "@/hooks/useDebounce";
import useIntersect from "@/hooks/useIntersect";
import useStyles from "@/pages/search/SearchList/index.css";
import SearchListItem from "@/pages/search/SearchList/Item";
import useSearchStore from "@/stores/search";

interface Props {
  isEndOfPage: boolean;
  isLoading: boolean;
  getItems: () => void;
}

function SearchList({ isEndOfPage, isLoading, getItems }: Props) {
  const styles = useStyles();

  const { items, scrollTop, setScrollTop } = useSearchStore();

  const rootRef = useRef<HTMLDivElement | null>(null);

  const debounce = useDebounce();
  const saveScroll = debounce(() => {
    setScrollTop(rootRef.current?.scrollTop ?? scrollTop);
  }, 50);

  const scrollRef = useIntersect((entry, observer) => {
    observer.unobserve(entry.target);
    if (!isEndOfPage && !isLoading) {
      getItems();
    }
  });

  useEffect(() => {
    if (rootRef.current) {
      rootRef.current.scrollTo({ top: scrollTop });
    }
  }, []);

  return (
    <div ref={rootRef} className={styles.root} onScroll={saveScroll}>
      <Table>
        <TableBody className={styles.tableBody}>
          {items.map((item, idx) => (
            <SearchListItem key={idx} item={item} />
          ))}
        </TableBody>
      </Table>
      <div ref={scrollRef}>
        {isLoading ? <Spinner className={styles.spinner} /> : <div style={{ height: "1px" }} />}
      </div>
    </div>
  );
}

export default SearchList;
