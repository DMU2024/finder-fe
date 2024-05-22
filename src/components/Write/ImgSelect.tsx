import { Image, ImageFit, Depths } from "@fluentui/react";
import { makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({});

function ImgSelect() {
  const styles = useStyles();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        boxShadow: Depths.depth16
      }}
    >
      <Image
        alt="Example Image"
        height={760}
        imageFit={ImageFit.cover}
        src="https://example.com/your-image.jpg" // 이미지 URL을 여기에 입력하세요
        styles={{ root: { width: 570, height: 760 } }}
        width={570}
      />
    </div>
  );
}

export default ImgSelect;
