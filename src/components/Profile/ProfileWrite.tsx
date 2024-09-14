import { tokens, makeStyles } from "@fluentui/react-components";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow
} from "@fluentui/react-table";

import { mainColor, skeletonColor } from "../../styles/color";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // alignItems: "center",
    width: "56vw",
    height: "540px",
    backgroundColor: tokens.colorNeutralBackground1
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

const data = [
  { id: 1, title: "First Post", date: "2023-01-01" },
  { id: 2, title: "Second Post", date: "2023-01-02" },
  { id: 3, title: "Third Post", date: "2023-01-03" },
  { id: 4, title: "Third Post", date: "2023-01-03" },
  { id: 5, title: "Third Post", date: "2023-01-03" },
  { id: 6, title: "Third Post", date: "2023-01-03" },
  { id: 7, title: "Third Post", date: "2023-01-03" }
];

function ProfileWrite() {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.title}>내가 쓴 글</div>
      <div className={styles.tableContainer}>
        <Table aria-label="Simple Table" className={styles.table}>
          <TableHeader>
            <TableRow>
              <TableHeaderCell className={styles.th}>ID</TableHeaderCell>
              <TableHeaderCell className={styles.th}>Title</TableHeaderCell>
              <TableHeaderCell className={styles.th}>Date</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell className={styles.td}>{row.id}</TableCell>
                <TableCell className={styles.td}>{row.title}</TableCell>
                <TableCell className={styles.td}>{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default ProfileWrite;
