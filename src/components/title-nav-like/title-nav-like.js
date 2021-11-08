import svg from "../../sprite.svg";

import styles from "./title-nav-like.module.css";

const NaviTextIcon = (props) => {
  const containerStyle = [styles.container];

  containerStyle.push(props.styleList?.itemContainer || "");

  return (
    <div className={containerStyle.join(" ")}>
      <svg className={props.styleList?.itemSvg || ""}>
        <use xlinkHref={`${svg}#${props.svgName}`} />
      </svg>

      <p className={props.styleList?.itemText || ""}>{props.title}</p>
    </div>
  );
};

export default NaviTextIcon;
