import { Route, Switch } from "react-router";
import { useState } from "react";

import HomePage from "./pages/homePage/home-page";
import PageNotFound from "./pages/404/404";
import Header from "./UI/header/header";

import BookmarkContext from "./store/bookmark-context";
import SearchContext from "./store/search-context";
import RecipeInfoContext from "./store/recipe-info-context";
import AlertContext from "./store/alert-context";
import Backdrop from "./UI/backdrop/backdrop";

const App = () => {
  const [bookmarkItems, setBookmarkItems] = useState([]);
  const [hash, setHash] = useState("");
  const [isShown, setIsShown] = useState(false);
  const [result, setSearchResult] = useState({
    result: [],
    isLoading: false,
    errorMsg: null,
  });

  const searchResult = {
    result: result.result.data?.recipes || [],
    isLoading: result.isLoading,
    errorMsg: result.errorMsg,
  };

  console.log("APP:  ", bookmarkItems);

  return (
    <BookmarkContext.Provider value={{ bookmarkItems, setBookmarkItems }}>
      <SearchContext.Provider value={{ searchResult, setSearchResult }}>
        <RecipeInfoContext.Provider value={{ hash, setHash }}>
          <AlertContext.Provider value={{ isShown, setIsShown }}>
            <Header />

            <Switch>
              <Route path="/" exact>
                <HomePage />
              </Route>

              <Route path="*">
                <PageNotFound />
              </Route>
            </Switch>

            {isShown && <Backdrop />}
          </AlertContext.Provider>
        </RecipeInfoContext.Provider>
      </SearchContext.Provider>
    </BookmarkContext.Provider>
  );
};

export default App;
