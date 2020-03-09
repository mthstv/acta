import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
// import AccountCircle from "@material-ui/icons/AccountCircle";
// import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
// import ReplyRoundedIcon from '@material-ui/icons/ReplyRounded';
// import MoreIcon from "@material-ui/icons/MoreVert";
import Badge from "@material-ui/core/Badge";
import { Toolbar } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";

import CustomSearchBox from './CustomSearchBox';

import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  SearchBox,
  Index,
  Hits
} from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  'AKYYFEGWVX',
  '162f026f53f9fdeefc26d00d94e1f6f2'
);


const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    // marginLeft: theme.drawer.width,
    width: `calc(100% - ${theme.drawer.width}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 10
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});

function Header(props) {
  const [notificationMoreAnchorEl, setNotificationMoreAnchorEl] = useState(null)


  const handleNotificationMenuOpen = event => {
    setNotificationMoreAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationMoreAnchorEl(null);
  };

    return (
      <div>
        <AppBar
          className={classNames(props.classes.appBar, {
            [props.classes.appBarShift]: props.navDrawerOpen
          })}
        >
          <Toolbar>
            <IconButton
              className={props.classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
              onClick={props.handleChangeNavDrawer}
            >
              <MenuIcon />
            </IconButton>

            {/* SEARCHBAR */}
            {/* <InstantSearch indexName="rules" searchClient={searchClient}>
              <SearchBox />

              <Index indexName="rules">
                <h2>index: rules</h2>
                <Hits />
              </Index>

              <Index indexName="parts">
                <h2>index: parts</h2>
                <Hits />
              </Index>
            </InstantSearch> */}
            <CustomSearchBox defaultRefinement="iphone"/>

            <div className={props.classes.grow} />
            <div className={props.classes.sectionDesktop}>

              {/* NOTIFICATIONS */}
              <IconButton color="inherit" onClick={handleNotificationMenuOpen}>
                <Badge
                  className={props.classes.margin}
                  badgeContent={0}
                  color="secondary"
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </div>
            <div className={props.classes.sectionMobile}>

              {/* NOTIFICATIONS MOBILE */}
              <IconButton color="inherit" onClick={handleNotificationMenuOpen}>
                <Badge
                  className={props.classes.margin}
                  badgeContent={0}
                  color="secondary"
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              {/* NOTIFICATIONS MENU */}
              <Menu
                anchorEl={notificationMoreAnchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(notificationMoreAnchorEl)}
                onClose={handleNotificationMenuClose}
              >
                <MenuItem>
                  {/* <ListItemIcon>
                    <NotificationsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Nenhuma notificação" /> */}
                  Nenhuma notificação
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  // }
}

Header.propTypes = {
  styles: PropTypes.object,
  handleChangeNavDrawer: PropTypes.func,
  classes: PropTypes.object,
  navDrawerOpen: PropTypes.bool
};

export default withStyles(styles)(Header);
