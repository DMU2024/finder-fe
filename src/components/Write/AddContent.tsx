import { TextField } from "@fluentui/react";
import { makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  textAreaContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100vh",
    padding: "20px"
  },
  textArea: {
    width: "85vw",
    height: "445px",
    outline: "none",
    fontSize: "16px"
  }
});

function AddContent() {
  const styles = useStyles();

  return (
    <div>
      <h2> 추가 설명 </h2>
      <TextField
        multiline
        className={styles.textArea}
        placeholder="Enter your text here..."
        rows={15} // 기본적으로 표시할 행 수
      />
    </div>
  );
}

export default AddContent;
