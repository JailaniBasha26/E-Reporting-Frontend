import React from "react";
import ReactDOM from "react-dom";
import { render } from "react-dom";
import YYY from "../src/Pages/YYY";
import AddOrganization from "../src/Pages/AddOrganization";
import PlayGround from "../src/Pages//PlayGround";
import File_SIE from "../src/Pages/SIE/Fill_SIE";
import Year from "../src/Pages/SIE/Year";
import home from "../src/Pages/Home/home";
import "./index.css";
import { Provider } from "react-redux";
import { HashRouter, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers/index.js";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";                              //icons
import Fill_SIE from "../src/Pages/SIE/Fill_SIE";

const history = createBrowserHistory();
let store = createStore(reducers, applyMiddleware(thunk));

render(
  <Provider store={store}>
    <HashRouter history={history}>
      <Switch>
        <Route exact path="/" component={home} />
        <Route exact path="/addOrganization/" component={AddOrganization} />
        <Route exact path="/PlayGround/" component={PlayGround} />
        <Route exact path="/fileSIE/" component={File_SIE} />
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
