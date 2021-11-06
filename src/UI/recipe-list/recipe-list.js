import { useContext } from "react";
import { useState } from "react/cjs/react.development";
import ButtonNav from "../../components/buttons/btn-main/btn-nav/btn-nav";
import RecipeListItem from "../../components/recipe-list-item/recipe-list-item";
import SearchContext from "../../store/search-context";
import styles from "./recipe-list.module.css";

const RecipeList = (props) => {
  const searchCtx = useContext(SearchContext);

  const [currPage, setCurrPage] = useState(1);

  const recipeLists =
    searchCtx.searchResult.slice((currPage - 1) * 10, currPage * 10) || [];
  const hasNext = !!searchCtx.searchResult[currPage * 10 + 1];

  const styleList = [styles.container];
  styleList.push(props.style || "");

  let recipeListsDom = (
    <p>Search for a recipe (pizza) for here to be populated.</p>
  );

  const getPage = (pageAction) => {
    if (pageAction === "prev") setCurrPage((page) => page - 1);
    if (pageAction === "next") setCurrPage((page) => page + 1);
    console.log("CLICKED");
  };

  const itemClicked = (hash) => {
    console.log(hash);
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
    recipeListsDom = recipeLists.map((recipeItem, index) => (
      <RecipeListItem
        imgLink={recipeItem.image_url}
        publisher={recipeItem.publisher}
        toLink={`#${recipeItem.id}`}
        click={() => {
          itemClicked(recipeItem.id);
        }}
        title={recipeItem.title}
        key={index}
      />
    ));
  }

  if (!(currPage > 1)) navBtn[0] = <div></div>;
  if (!hasNext) navBtn[1] = <div></div>;

  return (
    <div className={styleList.join(" ")}>
      <div className={styles["items-container"]}>{recipeListsDom}</div>
      <div className={styles["nav-container"]}>{navBtn}</div>
    </div>
  );
};

export default RecipeList;
