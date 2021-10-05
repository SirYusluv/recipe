import { Fragment } from "react";

import svg from "../../sprite.svg";

import styles from "./title-nav-like.module.css";

const NaviTextIcon = (props) => {
  return (
    <div className={styles.container}>
      <svg className={styles.svg}>
        <use xlinkHref={`${svg}#${props.svgName}`} />
      </svg>

      <p className={styles.title}>{props.title}</p>
    </div>
  );
};

export default NaviTextIcon;
