import styles from "./input.module.css";

const Input = (props) => {
  return (
    <input
      className={styles.input}
      placeholder={props.placeholder}
      type={props.type}
    />
  );
};

export default Input;
