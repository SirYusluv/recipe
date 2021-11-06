import styles from "./btn-nav.module.css";

const ButtonNav = (props) => {
  return (
    <div className={styles.container} onClick={props.btnClick}>
      {props.arrLeft ? (
        <p>&larr; {props.navText}</p>
      ) : (
        <p>{props.navText} &rarr;</p>
      )}
    </div>
  );
};

export default ButtonNav;
