// A componet used to diaplay anything on the modal box

import { createPortal } from "react-dom";

const modalDOM = document.getElementById("modal");

const Modal = (props) => {
  return createPortal(props.children, modalDOM);
};

export default Modal;
