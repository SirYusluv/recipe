import RecipeList from "../../UI/recipe-list/recipe-list";
import RecipeInfo from "../../UI/recipe-info/recipe-info";

import styles from "./home-page.module.css";

const HomePage = (props) => {
  return (
    <div className={styles.container}>
      <RecipeList style={styles["recipe-list"]} />
      <RecipeInfo style={styles["recipe-info"]} />
    </div>
  );
};

export default HomePage;
