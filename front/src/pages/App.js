import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import defaultTheme from "../theme";
import { withStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import Header from "../components/Header";
import LeftDrawer from "../components/LeftDrawer";
import Data from "../data";
import NotFound from "./NotFoundPage/NotFoundPage";
import Rules from "./Rule/RuleList";
import Rule from "./Rule/RulePage";
import RuleCreator from "./Rule/RuleCreator/RuleCreator";
import RuleEditor from "./Rule/RuleEditor/RuleEditor";
import ElementCreator from "./Rule/ElementCreator/ElementCreator";
import ElementEditor from "./Rule/ElementEditor/ElementEditor";
import UserList from "./User/UserList/UserList";
import UserProfile from "./User/UserProfile/UserProfile";
import Logout from "./Logout";
import { useSelector, useDispatch } from "react-redux";

import { isAuthenticated, logout } from "../services/auth";
import api from "../services/api";

const styles = () => ({
  container: {
    margin: "80px 20px 20px 15px",
    paddingLeft: defaultTheme.drawer.width,
    [defaultTheme.breakpoints.down("sm")]: {
      paddingLeft: 0
    }
  },
  containerFull: {
    paddingLeft: defaultTheme.drawer.miniWidth,
    [defaultTheme.breakpoints.down("sm")]: {
      paddingLeft: 0
    }
  },
  settingBtn: {
    top: 80,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    color: "white",
    width: 48,
    right: 0,
    height: 48,
    opacity: 0.9,
    padding: 0,
    zIndex: 999,
    position: "fixed",
    minWidth: 48,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  }
});

function App(props) {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const [state, setState] = useState({
    theme: defaultTheme,
    navDrawerOpen:
      window && window.innerWidth && window.innerWidth >= defaultTheme.breakpoints.values.md
        ? true
        : false
  })

  useEffect(() => {
    // Get user data
    api.get("/auth/by-token")
    .then((res) => {
      dispatch({type: 'SAVE_USER_DATA', user: res.data.data})
      localStorage.setItem("token", res.data.data.auth_token);
      delete res.data.data.auth_token;
      localStorage.setItem("user", JSON.stringify(res.data.data));
      })
      .catch((err) => {
        logout();
        props.history.push("/login");
        console.log("token expired");
      });
  },[props, dispatch])

  const handleChangeNavDrawer = () => {
    setState({
      theme: defaultTheme,
      navDrawerOpen: !state.navDrawerOpen
    });
  }

  // const handleChangeTheme = colorOption => {
  //   const theme = customTheme({
  //     palette: colorOption
  //   });
  //   setState({
  //     theme
  //   });
  // }
  return (
    <ThemeProvider theme={state.theme}>
      <Header handleChangeNavDrawer={handleChangeNavDrawer} navDrawerOpen={state.navDrawerOpen} history={props.history}/>
      <LeftDrawer
        user={user}
        history={props.history}
        isLogged={isAuthenticated()}
        navDrawerOpen={state.navDrawerOpen}
        handleChangeNavDrawer={handleChangeNavDrawer}
        menus={Data.menus}
      />
      <div className={classNames(props.classes.container, !state.navDrawerOpen && props.classes.containerFull)}>
        <Switch>
          <Route exact path="/" component={Rules} />
          {/* <Route path="/dashboard" component={Dashboard} /> */}
          {/* <Route path="/form" component={Form} /> */}
          <Route path="/regra/:rule" component={Rule} />
          <Route path="/criar-regra" component={RuleCreator} />
          <Route path="/editar-regra/:rule" component={RuleEditor} />
          <Route path="/criar-elemento/regra/:rule" component={ElementCreator} />
          <Route path="/editar-elemento/:label/:element" component={ElementEditor} />
          <Route path="/usuarios" component={UserList} />
          <Route path="/perfil/:user" component={UserProfile} />
          {/* <Route path="/table/basic" component={BasicTable} />
          <Route path="/table/data" component={DataTable} /> */}
          <Route path="/logout" component={Logout} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

App.propTypes = {
  children: PropTypes.element,
  classes: PropTypes.object
};

export default withStyles(styles)(App);
