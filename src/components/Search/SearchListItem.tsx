import {
  Image,
  TableCell,
  TableCellLayout,
  TableRow
} from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import { LostFound } from "../../apis/lostfound";

interface Props {
  item: LostFound;
}

function SearchListItem({ item }: Props) {
  const navigate = useNavigate();

  return (
    <TableRow
      onClick={() => {
        navigate(`/detail/${item.atcId}?fdSn=${item.fdSn}`);
      }}
    >
      <TableCell>
        <TableCellLayout
          media={
            <Image
              fit="contain"
              src={item.fdFilePathImg}
              style={{ width: "102px", height: "102px" }}
            />
          }
        />
      </TableCell>
      <TableCell>
        <TableCellLayout media={item.fdPrdtNm} />
      </TableCell>
      <TableCell>
        <TableCellLayout media={item.depPlace} />
      </TableCell>
      <TableCell>
        <TableCellLayout media={item.fdYmd} />
      </TableCell>
      <TableCell>
        <TableCellLayout media={item.prdtClNm} />
      </TableCell>
    </TableRow>
  );
}

export default SearchListItem;
