import { useContext, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import { useState } from "react/cjs/react.development";
import ButtonMain from "../../components/buttons/btn-main/btn-main";
import Input from "../../components/input/input";
import NaviTextIcon from "../../components/title-nav-like/title-nav-like";
import SearchContext from "../../store/search-context";

import styles from "./header.module.css";

// Name: icon
const navText = { "Add Recipe": "plus", Bookmarks: "bookmark" };

const navTextMarkup = [];

for (const title of Object.keys(navText)) {
  navTextMarkup.push(
    <NaviTextIcon title={title} svgName={navText[title]} key={title} />
  );
}

const Header = () => {
  const [searchedWord, setSearchWord] = useState(null);
  const history = useHistory();
  const searchRef = useRef();
  const searchCtx = useContext(SearchContext);

  useEffect(async () => {
    if (!searchedWord) return;

    try {
      console.log("Searching...");
      const searchJSON = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchedWord}`
      );
      const searchFetched = await searchJSON.json();
      searchCtx.setSearchResult(searchFetched.data.recipes);
      console.log("search done");
    } catch (e) {
      console.log(e.message);
      console.log("Error fetching");
    }
  }, [searchedWord]);

  const onSearchHandler = (e) => {
    e.preventDefault();
    const searchedValue = searchRef.current.value;
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
