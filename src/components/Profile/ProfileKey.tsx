import React, { useState } from 'react';
import { DefaultButton } from "@fluentui/react";
import { tokens, makeStyles } from "@fluentui/react-components";
import { mainColor, skeletonColor } from "../../styles/color";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "28vw",
    height: "540px",
  },
  title: {
    color: skeletonColor,
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
    marginBottom: "30px",
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
    backgroundColor: tokens.colorNeutralBackground1Hover,
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
    cursor: "pointer", // 추가: 커서 포인터로 변경
  }
});

function ProfileKey() {
  const styles = useStyles();

  const [keyword, setKeyword] = useState<string>('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    setError('');
  };

  const handleAddKeyword = () => {
    if (keywords.length >= 5) {
      setError('키워드는 최대 5개까지 추가할 수 있습니다.');
      return;
    }
    if (keyword.trim() !== '') {
      setKeywords([...keywords, keyword]);
      setKeyword('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddKeyword();
    }
  };

  const handleDeleteKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.root}>
      <div className={styles.title}> 내 키워드 </div>
      <div className={styles.subTitle}> 해당 설정을 사용하면 작성해둔 키워드로 게시물이 뜰 시, 카카오톡 알림이 전송됩니다. </div>
      <div>
        <div className={styles.keywordSubmit}>
          <input
            type="text"
            placeholder="키워드를 입력해주세요."
            value={keyword}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className={styles.placeholder}
          />
          <button onClick={handleAddKeyword} className={styles.button}> 입력 </button>
        </div>
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        <div>
          {keywords.map((kw, index) => (
            <div key={index} className={styles.keywordList}>
              <div className={styles.keywordDetail}>
                <div className={styles.circle} />
                <div className={styles.keywordName}>{kw}</div>
              </div>
              <div className={styles.delete} onClick={() => handleDeleteKeyword(index)}> 삭제 </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileKey;