import {
  Image,
  TableCell,
  TableCellLayout,
  TableRow
} from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import { LostFound } from "../../apis/lostfound";
import { makeStyles } from "@fluentui/react-components";
import { mainColor, skeletonColor, secondaryColor } from "../../styles/color";

const useStyles = makeStyles({
  tableRow: {
    "@media (max-width: 390px)": {
      height: "auto",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
  },
  tableCell: {
    "@media (max-width: 390px)": {
      display: "none"
    },
  },
  tableCell02: {
    display: "none",
    "@media (max-width: 390px)": {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flex: "1 0 auto",
      height: "auto",
      padding: "16px 16px 16px 0px",
      "&::before": {
        content: "attr(data-label)",
        fontWeight: "bold",
        display: "block",
        marginBottom: "4px",
      },
    }
  },
  imageContainer: {
    "@media (max-width: 390px)": {
      display: "flex",
      width: "12vh",
      height: "12vh",
      alignItems: "center",
      justifyContent: "center",
      padding: "12px 12px 12px 24px"
    }
  },
  image: {
    width: "14vh",
    height: "14vh",
    marginRight: "16px",
    "@media (max-width: 390px)": {
      width: "11vh",
      height: "11vh",
      marginRight: "0",
    },
  },
  title: {
    "@media (max-width: 390px)": {
      color: skeletonColor,
      fontSize: "16px",
      fontWeight: "bold"
    },
  },
  categoryTitle: {
    "@media (max-width: 390px)": {
      color: mainColor,
      fontSize: "12px",
      fontWeight: "bold"
    },
  },
  subTitle: {
    "@media (max-width: 390px)": {
      color: secondaryColor,
      fontSize: "12px",
      fontWeight: "bold"
    },
  }
});

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
          media={
            <Image
              className={styles.image}
              fit="contain"
              src={item.fdFilePathImg}
            />
          }
        />
      </TableCell>
      <TableCell className={styles.tableCell}>
        <TableCellLayout
          media={<span className={styles.categoryTitle}>{item.fdPrdtNm}</span>}
        />
      </TableCell>
      <TableCell className={styles.tableCell}>
        <TableCellLayout
          media={<span className={styles.title}>{item.depPlace}</span>}
        />
      </TableCell>
      <TableCell className={styles.tableCell}>
        <TableCellLayout
          media={<span className={styles.subTitle}>{item.fdYmd}</span>}
        />
      </TableCell>
      <TableCell className={styles.tableCell}>
        <TableCellLayout
          media={<span className={styles.subTitle}>{item.prdtClNm}</span>}
        />
      </TableCell>

      <TableCell className={styles.tableCell02}>
        <TableCellLayout
          media={<span className={styles.categoryTitle}>{item.prdtClNm}</span>}
        />
        <TableCellLayout
          media={<span className={styles.title}>{item.fdPrdtNm}</span>}
        />
        <TableCellLayout
          media={<span className={styles.subTitle}>{item.depPlace}</span>}
        />
        <TableCellLayout
          media={<span className={styles.subTitle}>{item.fdYmd}</span>}
        />
      </TableCell>
    </TableRow>
  );
}

export default SearchListItem;
