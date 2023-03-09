import React from "react";
import ReactDOM from "react-dom";
import { render } from "react-dom";
import IncomeStatement from "../src/Pages/05-IncomeStatement/IncomeStatement";
import File_SIE from "./Pages/02-SIE/Fill_SIE";
import Year from "./Pages/04-Year/Year";
import home from "./Pages/01-Home/home";
import Info from "./Pages/03-Information/Info";
import Steps from "../src/Pages/Steps/steps";

import Login from "./Pages/Login/Login";
import ScrollTopDemo from "./Pages/ScrollTop/ScrollTop";

import "./index.css";
import { Provider } from "react-redux";
import { HashRouter, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers/index";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css"; //icons
import "primeflex/primeflex.css";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Pages/Sidebar/Sidebar";
import steps from "../src/Pages/Steps/steps";
import Cards from "./Pages/00-Corporate Page/Cards";
import Theme from "./Pages/Theme/Theme";
//import social from "./Pages/Social Media Login/social";
import ThemeTry from "./Pages/Theme/ThemeTry";
import Merge from "./Pages/Merge/Merge";
import axios from "axios";

const history = createBrowserHistory();
let store = createStore(reducers, applyMiddleware(thunk));

const propsStore = store.getState();

axios.get("/generateUUID").then((response) => {
  // console.log(response.data, "## RESPONSE");
  let currentPageUrl = window.location.href;
  let splitCurrentPageUrl = currentPageUrl.split("/");
  // console.log(splitCurrentPageUrl, "===", splitCurrentPageUrl.length);
  let uuid = "";
  if (splitCurrentPageUrl.length == 7) {
    uuid = splitCurrentPageUrl[5];
  } else {
    uuid = response.data;
  }

  // console.log(propsStore, "## BEFORE SET");

  let sessionDetails = {
    uuid: uuid,
    currentPage: "home",
    IsAnnualReportSubmitted: false,
  };
  propsStore["sessionDetails"]["sessionDetails"].values = sessionDetails;

  // console.log(propsStore, "## AFTER SET sessionDetails to PROPS");

  const annualReport = "/annualreport/";
  const fileSIE = annualReport + uuid + "/fileSIE";
  const year = annualReport + uuid + "/year";
  const info = annualReport + uuid + "/info";
  const incomeStatement = annualReport + uuid + "/incomeStatement";

  render(
    <Provider store={store}>
      <HashRouter history={history}>
        <Switch>
          <Route exact path="/" component={home} />
          <Route exact path={fileSIE} component={File_SIE} />
          <Route exact path={info} component={Info} />
          <Route exact path={year} component={Year} />
          <Route exact path={incomeStatement} component={IncomeStatement} />
          <Route exact path="/steps" component={Steps} />
          <Route exact path="/ThemeTry" component={ThemeTry} />
          <Route exact path="/merge" component={Merge} />
        </Switch>
      </HashRouter>
    </Provider>,
    document.getElementById("root")
  );
});
