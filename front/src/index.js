import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Switch } from "react-router-dom";
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

const history = createBrowserHistory();

render(
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/registrar" component={Register} />
          <Route path="/" component={App} />
        </Switch>
      </Router>
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker();
