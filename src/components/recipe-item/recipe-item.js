import React from "react";

import styles from "./recipe-item.module.css";

const RecipeItem = (props) => {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={props.imgSrc} alt={props.imgAlt} />
      <div className={styles["container-sec"]}>
        <h2>{props.publisher}</h2>
        <p>{props.title}</p>
      </div>
    </div>
  );
};

export default RecipeItem;
