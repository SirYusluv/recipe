import { Link } from "react-router-dom";
import styles from "./recipe-list-item.module.css";

const RecipeListItem = (props) => {
  return (
    <Link className={styles["link"]} to={props.toLink} onClick={props.click}>
      <img
        className={styles["publisher-img"]}
        alt="Recipe"
        src={props.imgLink}
      />
      <div className={styles["text-container"]}>
        <h2>{props.publisher}</h2>
        <p>
          {props.title.length > 50
            ? `${props.title.slice(0, 30)}...`
            : props.title.slice(0, 20)}
        </p>
      </div>
    </Link>
  );
};

export default RecipeListItem;
