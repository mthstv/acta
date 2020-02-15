import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./pages/App";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";

export default (
  <Router>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route path="/registrar" component={Register} />
      <Route path="/" component={App} />
    </Switch>
  </Router>
);
