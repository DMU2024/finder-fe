import { Icon } from "@fluentui/react";
import { makeStyles } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import Modal from "react-modal";

import {
  categories,
  CategoryData,
  Subcategory
} from "@/components/Write/Category/WriteCategoryData";
import useWriteStore from "@/stores/write";
import { mainColor, skeletonColor } from "@/styles/color";
import { mobileWidth } from "@/styles/size";

const useStyles = makeStyles({
  title: {
    marginLeft: "40px",
    [`@media (max-width: ${mobileWidth})`]: {
      marginLeft: "20px",
      fontSize: "24px"
    }
  },
  modalContent: {
    position: "absolute",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "60vw",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "20px",
    transition: "width 0.3s",
    overflowY: "auto",
    [`@media (max-width: ${mobileWidth})`]: {
      width: "80vw",
      maxHeight: "75vh",
      top: "50%"
    }
  },
  modalContentSmall: {
    width: "80vw",
    [`@media (max-width: ${mobileWidth})`]: {
      transition: "width 0.3s"
    }
  },
  modalOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1000
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gridGap: "40px",
    [`@media (max-width: ${mobileWidth})`]: {
      gridTemplateColumns: "repeat(4, 1fr)",
      gridGap: "10px",
      padding: "0px 10px 10px 10px"
    }
  },
  gridItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "15px",
    backgroundColor: "#fff",
    textAlign: "center",
    cursor: "pointer",
    border: "none",
    outline: "none",
    fontSize: "16px",
    color: skeletonColor,
    fontWeight: "bold"
  },
  icon: {
    fontSize: "46px",
    marginBottom: "16px",
    color: mainColor,
    [`@media (max-width: ${mobileWidth})`]: {
      fontSize: "32px",
      marginBottom: "10px"
    }
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "20px"
  },
  button: {
    backgroundColor: "transparent",
    border: "1px solid " + skeletonColor,
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    color: skeletonColor,
    fontSize: "16px",
    outline: "none",
    transition: "background-color 0.3s, color 0.3s",
    margin: "40px 10px 0 10px",
    [`@media (max-width: ${mobileWidth})`]: {
      padding: "8px 16px",
      fontSize: "12px",
      marginTop: "20px",
      color: skeletonColor
    }
  },
  subcategoryList: {
    listStyle: "none",
    paddingLeft: "40px",
    marginTop: "32px"
  },
  subcategoryItem: {
    cursor: "pointer",
    padding: "10px",
    borderRadius: "5px",
    color: skeletonColor,
    transition: "background-color 0.3s, color 0.3s",
    marginBottom: "5px"
  },
  subcategoryItemHover: {
    color: skeletonColor,
    fontSize: "16px"
  }
});

Modal.setAppElement("#root");

function WriteCategory() {
  const styles = useStyles();

  const {
    selectedCategory,
    selectedSubcategory,
    setSelectedCategory,
    setSelectedSubcategory,
    setLostName
  } = useWriteStore();

  const [category, setCategory] = useState<CategoryData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSmallModal, setIsSmallModal] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
    setCategory(null);
    setIsSmallModal(false);
  };

  const handleCategorySelect = (category: CategoryData) => {
    setCategory(category);
    setIsSmallModal(true);
  };

  const handleSubcategorySelect = (subcategory: Subcategory) => {
    setSelectedCategory(category?.name);
    setSelectedSubcategory(subcategory.name);
    setLostName(subcategory.name);
    closeModal();
  };

  useEffect(() => {
    if (!selectedCategory || !selectedSubcategory) {
      setIsOpen(true);
    }
  }, []);

  return (
    <div>
      {(!category || category.subcategories.length === 0) && (
        <button className={styles.button} onClick={() => setIsOpen(true)}>
          카테고리 선택
        </button>
      )}

      <Modal
        className={`${styles.modalContent} ${isSmallModal ? styles.modalContentSmall : ""}`}
        contentLabel="Category Select"
        isOpen={isOpen}
        overlayClassName={styles.modalOverlay}
        onRequestClose={closeModal}
      >
        <h1 className={styles.title}>{category ? `${category.name}의` : ""} 카테고리 선택</h1>
        {!category ? (
          <div className={styles.gridContainer}>
            {categories.map(function (category, index) {
              return (
                <div
                  key={index}
                  className={styles.gridItem}
                  onClick={() => handleCategorySelect(category)}
                >
                  <Icon className={styles.icon} iconName={category.icon.iconName} />
                  {category.name}
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <h2 className={styles.title}>소분류 선택</h2>
            <ul className={styles.subcategoryList}>
              {category.subcategories.map((subcategory, subIndex) => {
                return (
                  <li
                    key={subIndex}
                    className={`${styles.subcategoryItem} ${styles.subcategoryItemHover}`}
                    onClick={() => handleSubcategorySelect(subcategory)}
                  >
                    {subcategory.name}
                  </li>
                );
              })}
            </ul>
            <div className={styles.buttonContainer}>
              <button
                className={styles.button}
                onClick={() => {
                  setCategory(null);
                  setIsSmallModal(false);
                }}
              >
                다시 선택
              </button>
              <button className={styles.button} onClick={closeModal}>
                닫기
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default WriteCategory;
