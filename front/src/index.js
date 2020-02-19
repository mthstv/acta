import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from 'react-redux';
import { createBrowserHistory } from "history";
import registerServiceWorker from "./registerServiceWorker";
import "./styles.scss";
import "font-awesome/css/font-awesome.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./pages/App";
import Login from "./pages/Login/LoginPage";
import Register from "./pages/Register/RegisterPage";
import store from './store';

import { isAuthenticated } from './services/auth'

const history = createBrowserHistory();

console.log(isAuthenticated())
render(
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route
            exact={!isAuthenticated()}
            path="/"
            render={ (props) => ( isAuthenticated() ? <App {...props} /> : <Redirect from="/" to="/login" /> ) }
          />
          <Route exact path="/login" component={Login} />
          <Route path="/registrar" component={Register} />
        </Switch>
      </Router>
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker();
