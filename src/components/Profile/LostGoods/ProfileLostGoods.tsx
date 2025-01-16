import { makeStyles, tokens } from "@fluentui/react-components";
import { TableCell, TableRow } from "@fluentui/react-table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Marker } from "@/apis/marker";
import { getUserLostGoods } from "@/apis/user";
import useAuthStore from "@/stores/auth";
import useMainStore from "@/stores/main";
import usePositionStore from "@/stores/position";
import { mainColor, secondaryColor, skeletonColor } from "@/styles/color";
import { tabletWidth } from "@/styles/size";

const useStyles = makeStyles({
  root: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    width: "56vw",
    height: "540px",
    backgroundColor: tokens.colorNeutralBackground1,
    overflow: "auto",
    [`@media (max-width: ${tabletWidth})`]: {
      width: "90%",
      height: "60dvh",
      backgroundColor: tokens.colorNeutralBackground2,
      alignItems: "center"
    }
  },
  title: {
    color: tokens.colorNeutralForeground1,
    fontWeight: "bold",
    fontSize: "24px",
    marginBottom: "10px",
    [`@media (max-width: ${tabletWidth})`]: {
      fontSize: "20px",
      paddingLeft: "6vw"
    }
  },
  tableContainer: {
    width: "100%",
    [`@media (max-width: ${tabletWidth})`]: {
      justifyContent: "center",
      alignItems: "center",
      fontSize: "14px",
      marginLeft: "10vw"
    }
  },
  table: {
    width: "100%",
    display: "flex",
    marginTop: "20px",
    marginLeft: "8vw"
  },
  tableRow: {
    height: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
  },
  tableCell: {
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
      marginBottom: "4px"
    }
  },
  itemTitle: {
    color: skeletonColor,
    fontSize: "16px",
    fontWeight: "bold"
  },
  categoryTitle: {
    color: mainColor,
    fontSize: "12px",
    fontWeight: "bold"
  },
  subTitle: {
    color: secondaryColor,
    fontSize: "12px",
    fontWeight: "bold"
  }
});

function ProfileLostGoods() {
  const styles = useStyles();
  const navigate = useNavigate();

  const { userId } = useAuthStore();
  const { setSelectedMarker, setShowLostGoods } = useMainStore();
  const { setLatitude, setLongitude } = usePositionStore();

  const [lostGoods, setLostGoods] = useState<Marker[]>([]);

  const handleClick = (lostGoods: Marker) => {
    setSelectedMarker(undefined);
    setShowLostGoods(true);
    setLatitude(lostGoods.lat);
    setLongitude(lostGoods.lng);
    navigate("/", {
      state: {
        target: lostGoods._id
      }
    });
  };

  useEffect(() => {
    if (userId) {
      getUserLostGoods(userId).then((res) => {
        setLostGoods(res);
      });
    }
  }, [userId]);

  return (
    <div className={styles.root}>
      <div className={styles.title}>내가 쓴 글</div>
      <div className={styles.tableContainer}>
        {lostGoods.map((row) => (
          <TableRow key={row._id} onClick={() => handleClick(row)} className={styles.tableRow}>
            <TableCell className={styles.tableCell}>
              <div className={styles.categoryTitle}>{row.category}</div>
              <div className={styles.itemTitle}>{row.name}</div>
              <div className={styles.subTitle}>{row.date}</div>
            </TableCell>
          </TableRow>
        ))}
      </div>
    </div>
  );
}

export default ProfileLostGoods;
