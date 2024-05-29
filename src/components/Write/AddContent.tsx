import { makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  textAreaContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100vh",
    padding: "20px",
    boxSizing: "border-box"
  },
  title: {
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333"
  },
  textArea: {
    width: "85vw",
    height: "300px",
    fontSize: "16px",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    resize: "none",
    outline: "none",
    transition: "border-color 0.3s"
  }
});

function AddContent() {
  const styles = useStyles();

  return (
    <div className={styles.textAreaContainer}>
      <h2 className={styles.title}>추가 설명</h2>
      <textarea
        className={styles.textArea}
        placeholder="추가적인 내용을 기입하세요."
        rows={15}
      />
    </div>
  );
}

export default AddContent;
