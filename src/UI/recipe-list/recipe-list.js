import React from "react";

import styles from "./recipe-list.module.css";

const RecipeList = (props) => {
  const styleList = [styles.container];

  styleList.push(props.style || "");

  return <h1 className={styleList.join(" ")}>Recipee List</h1>;
};

export default RecipeList;
