import { useContext, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import { useState } from "react/cjs/react.development";
import ButtonMain from "../../components/buttons/btn-main/btn-main";
import Input from "../../components/input/input";
import NaviTextIcon from "../../components/title-nav-like/title-nav-like";
import useHttp from "../../hook/use-http";
import SearchContext from "../../store/search-context";

import styles from "./header.module.css";

// Name: icon
const navText = { "Add Recipe": "plus", Bookmarks: "bookmark" };

const navTextMarkup = [];

for (const title of Object.keys(navText)) {
  navTextMarkup.push(
    <NaviTextIcon
      title={title}
      svgName={navText[title]}
      key={title}
      styleList={{
        itemContainer: styles["navi-container"],
        itemSvg: styles["navi-svg"],
        itemText: styles["navi-text"],
      }}
    />
  );
}

const Header = () => {
  const [searchedWord, setSearchWord] = useState(null);
  const history = useHistory();
  const searchRef = useRef();
  const searchCtx = useContext(SearchContext);
  const [isLoading, errorMsg, result, sendRequest] = useHttp();
  // console.log("HH: ", isLoading);

  // const applyData = (r) => {
  //   searchCtx.setSearchResult({
  //     result: r.data.recipes,
  //     isLoading,
  //     errorMsg,
  //   });

  //   console.log(r.data.recipes);
  // };

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
  }, [isLoading, errorMsg, result]);

  const onSearchHandler = (e) => {
    e.preventDefault();
    const searchedValue = searchRef.current.value;
    searchRef.current.value = "";
    history.push({ search: `query=${searchedValue}` });
    setSearchWord(searchedValue);
  };

  return (
    <header className={styles.container}>
      <h1>LOGO HERE</h1>

      <form onSubmit={onSearchHandler}>
        <Input
          inputRef={searchRef}
          placeholder="Search over 1,000,000 recipees..."
          type="text"
        />

        <ButtonMain
          style={styles["button-search"]}
          btnType="submit"
          btnText="Search"
        />
      </form>

      <div> {navTextMarkup.length && navTextMarkup} </div>
    </header>
  );
};

export default Header;
