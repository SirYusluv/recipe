import React from "react";

import styles from "./button.module.css";

import { Link } from "react-router-dom";

const searchClickedHandler = (e) => {
  e.preventDefault();
  console.log("AA");
};

const Button = (props) => {
  const btnStyles = [styles.button];

  btnStyles.push(props.style || "");

  return (
    <Link
      className={btnStyles.join(" ")}
      href="#"
      onClick={searchClickedHandler}
    >
      {props.title}
    </Link>
  );
};

export default Button;
