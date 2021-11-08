import styles from "./loading.module.css";

const Loading = (props) => {
  return (
    <div className={styles.container}>
      <span className={styles.circle}></span>
      <span className={styles.circle}></span>
      <span className={styles.circle}></span>
      <span className={styles.circle}></span>
    </div>
  );
};

export default Loading;
