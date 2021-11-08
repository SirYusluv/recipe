import { Route, Switch } from "react-router";

import HomePage from "./pages/homePage/home-page";
import PageNotFound from "./pages/404/404";
import Header from "./UI/header/header";
import SearchContext from "./store/search-context";
import { useState } from "react/cjs/react.development";

function App() {
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

  return (
    <SearchContext.Provider value={{ searchResult, setSearchResult }}>
      <Header />

      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </SearchContext.Provider>
  );
}

export default App;
