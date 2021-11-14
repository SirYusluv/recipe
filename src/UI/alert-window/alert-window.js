// A component used to show an alert window with 2 buttons

import ButtonMain from "../../components/buttons/btn-main/btn-main";

import styles from "./alert-window.module.css";

const AlertWindow = (props) => {
  return (
    <div className={styles.container}>
      <p className={styles["msg-txt"]}>{props.message}</p>
      <div
        className={[
          styles["btn-container"],
          props.btnTxt2
            ? styles["double-btn-container"]
            : styles["single-btn-container"],
        ].join(" ")}
      >
        {props.btnTxt2 && (
          <p className={styles["btn-2"]} onClick={props.btnClick2 || ""}>
            {props.btnTxt2}
          </p>
        )}
        {props.btnTxt1 && (
          <ButtonMain btnText={props.btnTxt1} click={props.btnClick1 || ""} />
        )}
      </div>
    </div>
  );
};

export default AlertWindow;
