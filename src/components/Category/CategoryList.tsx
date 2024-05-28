import { initializeIcons, Icon } from "@fluentui/react";
import { makeStyles } from "@fluentui/react-components";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";


import { categories, CategoryData, Subcategory } from "./CategoryData";
import { mainColor, skeletonColor } from "../../styles/color";

const useStyles = makeStyles({
  title: {
    marginLeft: "40px"
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
    transition: "width 0.3s"
  },
  modalContentSmall: {
    width: "40vw"
  },
  modalOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gridGap: "40px"
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
    color: mainColor
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "20px"
  },
  button: {
    backgroundColor: "transparent",
    border: "1px solid " + mainColor,
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    color: mainColor,
    fontSize: "16px",
    outline: "none",
    transition: "background-color 0.3s, color 0.3s",
    marginLeft: "10px"
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

initializeIcons();

interface CategoryProps {
  onSelect: (category: string, subcategory: string) => void;
}

function Category({ onSelect }: CategoryProps) {
  const styles = useStyles();
  const [isOpen, setIsOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(
    null
  );
  const [isSmallModal, setIsSmallModal] = useState(false); // State to track modal size

  useEffect(function () {
    setIsOpen(true);
  }, []);

  function closeModal() {
    setIsOpen(false);
    setSelectedCategory(null);
    setIsSmallModal(false); // Reset modal size when closing
  }

  function handleCategorySelect(category: CategoryData) {
    setSelectedCategory(category);
    setIsSmallModal(true); // Set modal size to small when category is selected
  }

  function handleSubcategorySelect(subcategory: Subcategory) {
    onSelect(selectedCategory!.name, subcategory.name);
    closeModal();
  }

  return (
    <div>
      {(!selectedCategory || selectedCategory.subcategories.length === 0) && (
        <button className={styles.button} onClick={() => setIsOpen(true)}>
          {" "}
          카테고리 선택{" "}
        </button>
      )}

      <Modal
        className={`${styles.modalContent} ${isSmallModal ? styles.modalContentSmall : ""}`} // Apply small modal style conditionally
        contentLabel="Category Select"
        isOpen={isOpen}
        overlayClassName={styles.modalOverlay}
        onRequestClose={closeModal}
      >
        <h1 className={styles.title}>
          {selectedCategory ? `${selectedCategory.name}의` : ""} 카테고리 선택
        </h1>
        {!selectedCategory ? (
          <div className={styles.gridContainer}>
            {categories.map(function (category, index) {
              return (
                <div
                  key={index}
                  className={styles.gridItem}
                  onClick={() => handleCategorySelect(category)}
                >
                  <Icon
                    className={styles.icon}
                    iconName={category.icon.iconName}
                  />
                  {category.name}
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <h2 className={styles.title}>소분류 선택</h2>
            <ul className={styles.subcategoryList}>
              {selectedCategory.subcategories.map(
                function (subcategory, subIndex) {
                  return (
                    <li
                      key={subIndex}
                      className={`${styles.subcategoryItem} ${styles.subcategoryItemHover}`}
                      onClick={() => handleSubcategorySelect(subcategory)}
                    >
                      {subcategory.name}
                    </li>
                  );
                }
              )}
            </ul>
            <div className={styles.buttonContainer}>
              <button
                className={styles.button}
                onClick={() => setSelectedCategory(null)}
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

export default Category;
