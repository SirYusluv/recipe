import logo from "./logo.svg";
import "./App.css";

import { Fragment } from "react";

import { Route, Switch } from "react-router";

import HomePage from "./pages/homePage/home-page";
import PageNotFound from "./pages/404/404";
import Header from "./UI/header/header";

function App() {
  return (
    <Fragment>
      <Header />

      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Fragment>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
