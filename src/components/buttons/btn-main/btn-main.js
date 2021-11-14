import React from "react";

import styles from "./btn-main.module.css";

const ButtonMain = (props) => {
  const btnStyles = [styles.button];

  btnStyles.push(props.style || "");

  return (
    <input
      className={btnStyles.join(" ")}
      type={props.btnType || "button"}
      value={props.btnText}
      onClick={props.click || ""}
    />
  );
};

export default ButtonMain;
