import React, { Fragment, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import NaviTextIcon from "../../components/title-nav-like/title-nav-like";

import useHttp from "../../hook/use-http";
import RecipeInfoContext from "../../store/recipe-info-context";

import svg from "../../sprite.svg";
import styles from "./recipe-info.module.css";
import { Link } from "react-router-dom";
import Loading from "../../components/loading/loading";

const RecipeInfo = (props) => {
  const [recipeInfo, setRecipeInfo] = useState({});
  const hashCtx = useContext(RecipeInfoContext);
  const [isLoading, errMsg, result, sendRequest] = useHttp();

  useEffect(() => {
    if (!hashCtx.hash) return;
    sendRequest({
      url: `https://forkify-api.herokuapp.com/api/v2/recipes/${hashCtx.hash}`,
    });
  }, [hashCtx.hash]);

  useEffect(() => {
    result.data && setRecipeInfo(result.data.recipe);
  }, [result]);

  let toRender = (
    <p className={styles["default-text"]}>Nothing to show here yet.</p>
  );

  if (Object.keys(recipeInfo).length) {
    toRender = (
      <Fragment>
        <div className={styles["info-hero"]}>
          <img
            className={styles["info-image"]}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 128, 0, 0.5), rgba(0, 128, 0, 0.5)), url(${recipeInfo.image_url})`,
            }}
          />
          <div className={styles["publisher-text-container"]}>
            <h3 className={styles["publisher-text"]}>{recipeInfo.publisher}</h3>
          </div>
        </div>

        <div className={styles["min-serve-container"]}>
          <div className={styles["min-serve-left"]}>
            <NaviTextIcon
              title={`${recipeInfo.cooking_time} seconds`}
              svgName="clock"
              styleList={{
                itemContainer: styles["navi-container"],
                itemSvg: styles["navi-svg"],
                itemText: styles["navi-text"],
              }}
            />

            <NaviTextIcon
              title={`${recipeInfo.servings} ${
                recipeInfo.servings > 1 ? "servings" : "serving"
              }`}
              svgName="user"
              styleList={{
                itemContainer: styles["navi-container"],
                itemSvg: styles["navi-svg"],
                itemText: styles["navi-text"],
              }}
            />
          </div>

          <div className={styles["bookmark-svg-container"]}>
            <svg className={styles["bookmark-svg"]}>
              <use xlinkHref={`${svg}#bookmark`} />
            </svg>
          </div>
        </div>

        <div className={styles["recipe-ing-container"]}>
          <h3 className={styles["recipe-info-title"]}>Recipe Ingredients</h3>

          <div className={styles["recipe-info-table"]}>
            {[...new Array(Math.ceil(recipeInfo.ingredients.length / 2))].map(
              (_, index) => {
                const item1 = recipeInfo.ingredients[index * 2];
                const item2 = recipeInfo.ingredients[index * 2 + 1];

                return (
                  <div key={index} className={styles["recipe-info-row"]}>
                    {item1 && (
                      <NaviTextIcon
                        title={`${item1.quantity || ""}${
                          item1.unit ? `${item1.unit} of` : ""
                        } ${item1.description}`}
                        svgName="tick"
                        styleList={{
                          itemContainer: styles["ing-items-container"],
                          itemSvg: styles["ing-items-svg"],
                          itemText: styles["ing-items-text"],
                        }}
                      />
                    )}

                    {item2 && (
                      <NaviTextIcon
                        title={`${item2.quantity || ""}${
                          item2.unit ? `${item2.unit} of` : ""
                        } ${item2.description}`}
                        svgName="tick"
                        styleList={{
                          itemContainer: styles["ing-items-container"],
                          itemSvg: styles["ing-items-svg"],
                          itemText: styles["ing-items-text"],
                        }}
                      />
                    )}
                  </div>
                );
              }
            )}
          </div>
        </div>

        <div className={styles["dir-container"]}>
          <h3 className={styles["recipe-info-title"]}>How to cook it</h3>
          <p className={styles["dir-text"]}>
            This Recipe was carefully designed by{" "}
            <span>{recipeInfo.publisher}</span>. Please check out directions at
            their website
          </p>
          <a
            className={styles["dir-btn"]}
            href={recipeInfo.source_url}
            target="_blank"
          >
            Directions <span>&rarr;</span>
          </a>
        </div>
      </Fragment>
    );
  }

  if (isLoading) toRender = <Loading />;
  if (errMsg)
    toRender = <p className={styles["default-text"]}>Error fetching data.</p>;

  return <div className={styles["recipe-info-container"]}>{toRender}</div>;
};

export default RecipeInfo;
