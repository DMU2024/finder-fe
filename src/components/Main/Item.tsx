import { Divider, Image, makeStyles } from "@fluentui/react-components";

const useStyle = makeStyles({
  root: {
    display: "flex",
    gap: "32px"
  }
});

function Item() {
  const styles = useStyle();
  return (
    <div>
      <div className={styles.root}>
        <Image src="/logo192.png" width="192px" />
        <div>
          <h2>품명</h2>
          <div>주소</div>
          <div>분류</div>
        </div>
      </div>
      <Divider />
    </div>
  );
}

export default Item;
