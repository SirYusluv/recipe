import styles from "./input.module.css";

const style = [styles.input];

const Input = (props) => {
  style.push(props.style || "");

  return (
    <input
      className={style.join(" ")}
      placeholder={props.placeholder}
      type={props.type}
      ref={props.inputRef}
    />
  );
};

export default Input;
