import {
  Image,
  TableCell,
  TableCellLayout,
  TableRow
} from "@fluentui/react-components";

import { LostFound } from "../../apis/lostfound";
import { LostGoods } from "../../apis/lostgoods";
import useSearchStore from "../../stores/search";

interface Props {
  item: LostFound | LostGoods;
}

function SearchListItem({ item }: Props) {
  const { isLostGoods } = useSearchStore();

  return (
    <TableRow>
      <TableCell>
        <TableCellLayout
          media={
            <Image
              fit="contain"
              src={isLostGoods ? "" : (item as LostFound).fdFilePathImg}
              style={{ width: "128px", height: "128px" }}
            />
          }
        />
      </TableCell>
      <TableCell>
        <TableCellLayout
          media={
            isLostGoods
              ? (item as LostGoods).lstPrdtNm
              : (item as LostFound).fdPrdtNm
          }
        />
      </TableCell>
      <TableCell>
        <TableCellLayout
          media={
            isLostGoods
              ? (item as LostGoods).lstPlace
              : (item as LostFound).depPlace
          }
        />
      </TableCell>
      <TableCell>
        <TableCellLayout
          media={
            isLostGoods ? (item as LostGoods).lstYmd : (item as LostFound).fdYmd
          }
        />
      </TableCell>
      <TableCell>
        <TableCellLayout media={item.prdtClNm} />
      </TableCell>
    </TableRow>
  );
}

export default SearchListItem;
