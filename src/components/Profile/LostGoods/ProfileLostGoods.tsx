import { tokens, makeStyles } from "@fluentui/react-components";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow
} from "@fluentui/react-table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Marker } from "../../../apis/marker";
import { getUserLostGoods } from "../../../apis/user";
import useAuthStore from "../../../stores/auth";
import useMainStore from "../../../stores/main";
import usePositionStore from "../../../stores/position";
import { mainColor, skeletonColor } from "../../../styles/color";
import { mobileWidth } from "../../../styles/size";

const useStyles = makeStyles({
  root: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    // alignItems: "center",
    width: "56vw",
    height: "540px",
    backgroundColor: tokens.colorNeutralBackground1,
    overflow: "auto",
    [`@media (max-width: ${mobileWidth})`]: {
      height: "40vh"
    }
  },
  title: {
    color: skeletonColor,
    fontWeight: "bold",
    fontSize: "24px",
    marginBottom: "30px"
  },
  tableContainer: {
    width: "100%"
  },
  table: {
    width: "100%"
  },
  th: {
    backgroundColor: mainColor,
    color: tokens.colorNeutralForegroundInverted,
    fontWeight: "bold",
    padding: "5px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`
  },
  td: {
    padding: "5px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`
  }
});

function ProfileLostGoods() {
  const styles = useStyles();
  const navigate = useNavigate();

  const { userId } = useAuthStore();
  const { setSelectedMarker, setShowLostGoods } = useMainStore();
  const { setLatitude, setLongitude, setZoomLevel } = usePositionStore();

  const [lostGoods, setLostGoods] = useState<Marker[]>([]);

  const handleClick = (lostGoods: Marker) => {
    setSelectedMarker(undefined);
    setShowLostGoods(true);
    setLatitude(lostGoods.lat);
    setLongitude(lostGoods.lng);
    setZoomLevel(3);
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
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.title}>내가 쓴 글</div>
      <div className={styles.tableContainer}>
        <Table aria-label="Simple Table" className={styles.table}>
          <TableHeader>
            <TableRow>
              <TableHeaderCell className={styles.th}>이름</TableHeaderCell>
              <TableHeaderCell className={styles.th}>분류</TableHeaderCell>
              <TableHeaderCell className={styles.th}>분실일자</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lostGoods.map((row) => (
              <TableRow
                key={row._id}
                onClick={() => {
                  handleClick(row);
                }}
              >
                <TableCell className={styles.td}>{row.name}</TableCell>
                <TableCell className={styles.td}>{row.category}</TableCell>
                <TableCell className={styles.td}>{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default ProfileLostGoods;
