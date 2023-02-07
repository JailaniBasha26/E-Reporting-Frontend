import React from "react";
import ReactDOM from "react-dom";
import { render } from "react-dom";
import YYY from "../src/Pages/YYY";
import AddOrganization from "../src/Pages/AddOrganization";
import IncomeStatement from "../src/Pages/IncomeStatement/IncomeStatement";
import File_SIE from "../src/Pages/SIE/Fill_SIE";
import Year from "../src/Pages/year/Year";
import home from "../src/Pages/Home/home";
import Info from "../src/Pages/Information/Info";
import Header from "../src/Pages/Header/header";
import Steps from "../src/Pages/Steps/steps";
import Sidebar from "./Pages/SideBar/Sidebar";
import MenubarDemo from "../src/Pages/Zeenath Demo/MenubarDemo";
import Navbar from "../src/Pages/Zeenath Demo/Navbar";
//import RebelSkool_Logo from "../..Zeenath Demo/RebelSkool_Logo.jpg";
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
import { Nav } from "react-bootstrap";

const history = createBrowserHistory();
let store = createStore(reducers, applyMiddleware(thunk));

render(
  <Provider store={store}>
    <HashRouter history={history}>
      <Switch>
        <Route exact path="/" component={home} />
        <Route exact path="/year" component={Year} />
        <Route exact path="/info" component={Info} />
        <Route exact path="/addOrganization/" component={AddOrganization} />
        <Route exact path="/incomeStatement/" component={IncomeStatement} />
        <Route exact path="/fileSIE/" component={File_SIE} />
        <Route exact path="/header" component={Header} />
        <Route exact path="/steps" component={Steps} />
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
