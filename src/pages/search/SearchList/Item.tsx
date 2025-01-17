import { Image, TableCell, TableCellLayout, TableRow } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";

import { LostFound } from "@/apis/lostfound";
import useStyles from "@/pages/search/SearchList/Item.css";
import { unescapeHtml } from "@/utils/format";

interface Props {
  item: LostFound;
}

function SearchListItem({ item }: Props) {
  const navigate = useNavigate();
  const styles = useStyles();

  return (
    <TableRow
      className={styles.tableRow}
      onClick={() => {
        navigate(`/detail/${item.atcId}-${item.fdSn}`);
      }}
    >
      <TableCell className={styles.imageContainer}>
        <TableCellLayout
          media={<Image className={styles.image} fit="contain" src={item.fdFilePathImg} />}
        />
      </TableCell>
      <TableCell className={styles.tableCell}>
        <TableCellLayout media={<span className={styles.categoryTitle}>{item.prdtClNm}</span>} />
        <TableCellLayout
          media={<span className={styles.title}>{unescapeHtml(item.fdPrdtNm)}</span>}
        />
        <TableCellLayout media={<span className={styles.subTitle}>{item.depPlace}</span>} />
        <TableCellLayout media={<span className={styles.subTitle}>{item.fdYmd}</span>} />
      </TableCell>
    </TableRow>
  );
}

export default SearchListItem;
