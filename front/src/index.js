import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import {createStore, combineReducers } from 'redux';
// import { Provider } from 'react-redux';
// import * as reducers from './reducers/index';
import createHistory from 'history/createBrowserHistory';
import registerServiceWorker from "./registerServiceWorker";
import "./styles.scss";
import "font-awesome/css/font-awesome.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./pages/App";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";

const history = createHistory();

render(
      <Router history={history}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/registrar" component={Register} />
          <Route path="/" component={App} />
        </Switch>
      </Router>,
    document.getElementById('root')
)
registerServiceWorker();
