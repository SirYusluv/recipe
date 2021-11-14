import { useContext } from "react";
import { createPortal } from "react-dom";
import AlertContext from "../../store/alert-context";

import styles from "./backdrop.module.css";

const backdropDOM = document.getElementById("backdrop");

const Backdrop = () => {
  const alertCtx = useContext(AlertContext);

  const backdropClickHandler = () => {
    alertCtx.setIsShown(false);
  };

  const backDrop = (
    <div
      onClick={backdropClickHandler}
      className={[
        styles.backdrop,
        alertCtx.isShown ? "" : styles["backdrop-not-shown"],
      ].join(" ")}
    ></div>
  );

  return createPortal(backDrop, backdropDOM);
};

export default Backdrop;
