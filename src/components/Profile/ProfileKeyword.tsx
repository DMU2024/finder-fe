import { tokens, makeStyles } from "@fluentui/react-components";
import React, { useEffect, useState } from "react";

import {
  deleteKeyword,
  getKeywords,
  Keyword,
  postKeyword
} from "../../apis/keyword";
import useAuthStore from "../../stores/auth";
import { mainColor, skeletonColor } from "../../styles/color";

const useStyles = makeStyles({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },
  title: {
    color: tokens.colorNeutralForeground1,
    fontWeight: "bold",
    fontSize: "24px",
    marginBottom: "10px"
  },
  subTitle: {
    color: tokens.colorNeutralForeground2,
    marginBottom: "30px"
  },
  keywordSubmit: {
    width: "500px",
    marginBottom: "30px"
  },
  placeholder: {
    width: "400px",
    height: "45px",
    paddingLeft: "20px",
    border: skeletonColor,
    borderRadius: "15px",
    fontSize: "16px",
    backgroundColor: tokens.colorNeutralBackground1Hover
  },
  button: {
    padding: "8px 10px",
    fontSize: "16px",
    fontWeight: "bold",
    color: mainColor,
    marginLeft: "20px",
    border: "none",
    background: "none"
  },
  keywordList: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "500px",
    height: "50px",
    marginBottom: "18px",
    borderRadius: "15px",
    backgroundColor: tokens.colorNeutralBackground1Hover
  },
  keywordDetail: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "20px"
  },
  keywordName: {
    marginLeft: "10px"
  },
  circle: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: mainColor
  },
  delete: {
    marginRight: "20px",
    cursor: "pointer" // 추가: 커서 포인터로 변경
  }
});

function ProfileKeyword() {
  const styles = useStyles();
  const { userId } = useAuthStore();

  const [keyword, setKeyword] = useState<string>("");
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [error, setError] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    setError("");
  };

  const handleAddKeyword = () => {
    if (keywords.length >= 5) {
      setError("키워드는 최대 5개까지 추가할 수 있습니다.");
      return;
    }
    if (keyword.trim() !== "" && userId) {
      postKeyword(userId, keyword).then((res) => {
        setKeywords([...keywords, res]);
        setKeyword("");
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddKeyword();
    }
  };

  const handleDeleteKeyword = (keywordId: number) => {
    deleteKeyword(keywordId).then((res) => {
      setKeywords(keywords.filter((keyword) => keyword.id !== res));
    });
  };

  useEffect(() => {
    if (userId) {
      getKeywords(userId).then((res) => {
        setKeywords(res);
      });
    }
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.title}>내 키워드</div>
      <div className={styles.subTitle}>
        키워드에 연관된 습득물이 등록될 시, 카카오톡 메시지가 전송됩니다.
      </div>
      <div>
        <div className={styles.keywordSubmit}>
          <input
            className={styles.placeholder}
            placeholder="키워드를 입력해주세요."
            type="text"
            value={keyword}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button className={styles.button} onClick={handleAddKeyword}>
            입력
          </button>
        </div>
        {error && (
          <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
        )}
        <div>
          {keywords.map((keyword) => (
            <div key={keyword.id} className={styles.keywordList}>
              <div className={styles.keywordDetail}>
                <div className={styles.circle} />
                <div className={styles.keywordName}>{keyword.keyword}</div>
              </div>
              <div
                className={styles.delete}
                onClick={() => handleDeleteKeyword(keyword.id)}
              >
                삭제
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileKeyword;
