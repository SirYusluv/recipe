import { Route, Switch } from "react-router";

import HomePage from "./pages/homePage/home-page";
import PageNotFound from "./pages/404/404";
import Header from "./UI/header/header";
import SearchContext from "./store/search-context";
import { useState } from "react/cjs/react.development";

function App() {
  const [searchResult, setSearchResult] = useState([]);

  console.log("App: ", searchResult.length);

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
