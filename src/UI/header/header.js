import { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";

import ButtonMain from "../../components/buttons/btn-main/btn-main";
import Input from "../../components/input/input";
import NaviTextIcon from "../../components/title-nav-like/title-nav-like";
import RecipeListItem from "../../components/recipe-list-item/recipe-list-item";
import Modal from "../modal/modal";

import useHttp from "../../hook/use-http";

import BookmarkContext from "../../store/bookmark-context";
import searchContext from "../../store/search-context";
import recipeInfoContext from "../../store/recipe-info-context";
import AlertContext from "../../store/alert-context";

import styles from "./header.module.css";
import AlertWindow from "../alert-window/alert-window";
import { BTN_CANCEL, BTN_OK, MSG_ADDRECIPE_ALERT } from "../../util/config";

const Header = () => {
  const [searchedWord, setSearchWord] = useState(null);
  const [alertContent, setAlertContent] = useState(null);
  const history = useHistory();
  const searchRef = useRef();
  const bookmarkCtx = useContext(BookmarkContext);
  const searchCtx = useContext(searchContext);
  const hashCtx = useContext(recipeInfoContext);
  const alertCtx = useContext(AlertContext);
  const [isLoading, errorMsg, result, sendRequest, errHandledHandler] =
    useHttp();

  useEffect(() => {
    !alertCtx.isShown && setAlertContent(null);
  }, [alertCtx.isShown]);

  const alertBtnClickHandler = () => {
    alertCtx.setIsShown(false);
  };

  const addRecipeClickHandler = () => {
    alertCtx.setIsShown(true);
    setAlertContent(
      <AlertWindow
        message={MSG_ADDRECIPE_ALERT}
        btnTxt1={BTN_OK}
        btnTxt2={BTN_CANCEL}
        btnClick1={alertBtnClickHandler}
        btnClick2={alertBtnClickHandler}
      />
    );
  };

  // Name: icon
  const navText = { "Add Recipe": "plus", Bookmarks: "bookmark" };

  const navTextMarkup = [];

  for (const title of Object.keys(navText)) {
    navTextMarkup.push(
      // Won'b be using this checkbox for add recipe again, so instead of modifying my code, i'd prefer just setting the z-index to thr bottom
      <input
        key={`chk_${title}`}
        type="checkbox"
        className={[
          styles["check-box-style"],
          styles[`${title.replace(" ", "-").toLowerCase()}-chk`],
        ].join(" ")}
        style={{ zIndex: `${title === "Add Recipe" ? -2 : 2}` }}
      />,

      <NaviTextIcon
        title={title}
        svgName={navText[title]}
        key={title}
        clickHandler={title === "Add Recipe" ? addRecipeClickHandler : ""}
        styleList={{
          itemContainer: styles["navi-container"],
          itemSvg: styles["navi-svg"],
          itemText: styles["navi-text"],
        }}
      />
    );
  }

  {
    /* The checkbox above might not be reactive, could have done this better, just felt like practicing "checkbox hack" */
  }

  useEffect(() => {
    setSearchWord(history.location.search.split("=")[1]);
  }, []);

  useEffect(async () => {
    if (!searchedWord) return;

    sendRequest({
      url: `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchedWord}`,
    });
  }, [searchedWord]);

  useEffect(() => {
    searchCtx.setSearchResult({ isLoading, errorMsg, result });
    // a little hack, check useHttp for hack reason
    try {
      if (!errorMsg || errorMsg.slice(-1) === " ") return;
    } catch (_) {
      return;
    }

    setAlertContent(
      <AlertWindow
        message={errorMsg}
        btnTxt1={BTN_OK}
        btnClick1={errHandledHandler}
      />
    );
  }, [isLoading, errorMsg, result]);

  const recipeItemClickHandler = (recipeId) => {
    hashCtx.setHash(recipeId);
  };

  const bookmarkItems = bookmarkCtx.bookmarkItems;
  console.log("HHH:  ", bookmarkItems);

  let bookmarkItemsDom = <p>There is no bookmark her yet, come back later</p>;

  if (bookmarkItems.length) {
    bookmarkItemsDom = bookmarkItems.map((item) => (
      <RecipeListItem
        imgLink={item.image_url}
        publisher={item.publisher}
        toLink={`#${item.id}`}
        click={() => {
          recipeItemClickHandler(item.id);
        }}
        title={item.title}
        key={item.id}
      />
    ));
  }

  const onSearchHandler = (e) => {
    e.preventDefault();
    const searchedValue = searchRef.current.value;
    searchRef.current.value = "";
    history.push({ search: `query=${searchedValue}` });
    setSearchWord(searchedValue);
  };

  return (
    <header className={styles.container}>
      {alertContent && <Modal>{alertContent}</Modal>}

      <h1>LOGO HERE</h1>

      <form onSubmit={onSearchHandler}>
        <Input
          inputRef={searchRef}
          style={styles["search-box"]}
          placeholder="Search over 1,000,000 recipees..."
          type="text"
        />

        <ButtonMain
          style={styles["button-search"]}
          btnType="submit"
          btnText="Submit"
        />
      </form>

      <div>
        {navTextMarkup.length && navTextMarkup}
        <div className={styles["bookmark-container"]}>{bookmarkItemsDom}</div>
      </div>
    </header>
  );
};

export default Header;
