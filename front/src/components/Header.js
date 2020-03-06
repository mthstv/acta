import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
// import AccountCircle from "@material-ui/icons/AccountCircle";
// import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
// import ReplyRoundedIcon from '@material-ui/icons/ReplyRounded';
// import MoreIcon from "@material-ui/icons/MoreVert";
import Badge from "@material-ui/core/Badge";
import { Toolbar } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";


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
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(),
    marginLeft: 0,
    transition: "width 500ms ease-in-out"
  },
  searchIcon: {
    width: theme.spacing(5),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    paddingTop: theme.spacing(),
    paddingRight: theme.spacing(),
    paddingBottom: theme.spacing(),
    paddingLeft: theme.spacing(5),
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("md")]: {
      // width: "auto"
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
  const [searchBarWidth, setSearchBarWidth] = useState("40%")


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
            <div className={props.classes.search} style={{width: searchBarWidth}}>
              <div className={props.classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Busca..."
                classes={{
                  root: props.classes.inputRoot,
                  input: props.classes.inputInput
                }}
                fullWidth={true}
                onFocus={() => setSearchBarWidth("100%")}
                onBlur={() => setSearchBarWidth("40%")}
              />
            </div>
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
