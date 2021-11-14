import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";

import ButtonNav from "../../components/buttons/btn-main/btn-nav/btn-nav";
import RecipeListItem from "../../components/recipe-list-item/recipe-list-item";
import RecipeInfoContext from "../../store/recipe-info-context";
import SearchContext from "../../store/search-context";
import Loading from "../../components/loading/loading";

import styles from "./recipe-list.module.css";
import { RECIPE_PER_PAGE } from "../../util/config";

const RecipeList = (props) => {
  const searchCtx = useContext(SearchContext);
  const hashCtx = useContext(RecipeInfoContext);
  const location = useLocation();

  const [currPage, setCurrPage] = useState(1);

  const recipeLists =
    searchCtx.searchResult.result.slice(
      (currPage - 1) * RECIPE_PER_PAGE,
      currPage * RECIPE_PER_PAGE
    ) || [];
  const hasNext =
    !!searchCtx.searchResult.result[currPage * RECIPE_PER_PAGE + 1];

  const styleList = [styles.container];
  styleList.push(props.style || "");

  useEffect(() => {
    const hash = location.hash.slice(1);
    hashCtx.setHash(hash);
  }, []);

  let recipeListsDom = (
    <p className={styles["default-text"]}>
      Search for a recipe (pizza) for here to be populated.
    </p>
  );

  const getPage = (pageAction) => {
    if (pageAction === "prev") setCurrPage((page) => page - 1);
    if (pageAction === "next") setCurrPage((page) => page + 1);
  };

  const itemClicked = (hash) => {
    hashCtx.setHash(hash);
  };

  let navBtn = [
    <ButtonNav
      btnClick={() => getPage("prev")}
      navText={`Page ${currPage - 1}`}
      arrLeft={true}
      key="Left Nav Btn"
    />,
    <ButtonNav
      btnClick={() => getPage("next")}
      navText={`Page ${currPage + 1}`}
      arrRight={true}
      key="Right Nav Btn"
    />,
  ];

  if (recipeLists.length) {
    recipeListsDom = recipeLists.map((recipeItem) => (
      <RecipeListItem
        imgLink={recipeItem.image_url}
        publisher={recipeItem.publisher}
        toLink={`#${recipeItem.id}`}
        click={() => {
          itemClicked(recipeItem.id);
        }}
        title={recipeItem.title}
        key={recipeItem.id}
      />
    ));
  }

  if (searchCtx.searchResult.isLoading) recipeListsDom = <Loading />;
  if (searchCtx.searchResult.errorMsg)
    recipeListsDom = (
      <p className={styles["default-text"]}>
        {searchCtx.searchResult.errorMsg}
      </p>
    );

  if (!(currPage > 1)) navBtn[0] = <div></div>;
  if (!hasNext) navBtn[1] = <div></div>;

  return (
    <div className={styleList.join(" ")}>
      <div className={styles["items-container"]}>{recipeListsDom}</div>
      <div className={styles["nav-container"]}>{navBtn}</div>
      <p className={styles.copyright}>
        &copy; by SirYusluv, all rights reserved
      </p>
    </div>
  );
};

export default RecipeList;
