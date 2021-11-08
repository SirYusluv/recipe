import RecipeList from "../../UI/recipe-list/recipe-list";
import RecipeInfo from "../../UI/recipe-info/recipe-info";

import styles from "./home-page.module.css";
import RecipeInfoContext from "../../store/recipe-info-context";
import { useState } from "react/cjs/react.development";

const HomePage = (props) => {
  const [hash, setHash] = useState("");

  return (
    <div className={styles.container}>
      <RecipeInfoContext.Provider value={{ hash, setHash }}>
        <RecipeList style={styles["recipe-list"]} />
        <RecipeInfo style={styles["recipe-info"]} />
      </RecipeInfoContext.Provider>
    </div>
  );
};

export default HomePage;
