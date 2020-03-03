import React from "react";
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

import { logout } from "../services/auth";

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
    // width: "100%",
    // [theme.breakpoints.up("sm")]: {
    //   marginLeft: theme.spacing(),
    //   width: "auto"
    // }
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
    // width: "auto"
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

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      notificationMoreAnchorEl: null,
      searchBarWidth: "40%"
    };
  }

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleNotificationMenuClose();
  };

  handleNotificationMenuOpen = event => {
    this.setState({ notificationMoreAnchorEl: event.currentTarget });
  };

  handleNotificationMenuClose = () => {
    this.setState({ notificationMoreAnchorEl: null });
  };

  handleLogout = () => {
    logout();
    this.props.history.push("/login");
  }

  render() {
    const { handleChangeNavDrawer, classes, navDrawerOpen } = this.props;

    // const { anchorEl } = this.state;
    // const isMenuOpen = Boolean(this.state.a1anchorEl);
    const isNotificationMenuOpen = Boolean(this.state.notificationMoreAnchorEl);

    // const renderMenu = (
    //   <Menu
    //     anchorEl={anchorEl}
    //     anchorOrigin={{ vertical: "top", horizontal: "right" }}
    //     transformOrigin={{ vertical: "top", horizontal: "right" }}
    //     open={isMenuOpen}
    //     onClose={this.handleMenuClose}
    //   >
    //     <MenuItem onClick={this.handleClose}>Profile</MenuItem>
    //     <MenuItem onClick={this.handleClose}>My account</MenuItem>
    //   </Menu>
    // );

    return (
      <div>
        <AppBar
          className={classNames(classes.appBar, {
            [classes.appBarShift]: navDrawerOpen
          })}
        >
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
              onClick={handleChangeNavDrawer}
            >
              <MenuIcon />
            </IconButton>

            {/* SEARCHBAR */}
            <div className={classes.search} style={{width: this.state.searchBarWidth}}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Busca..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                fullWidth={true}
                onFocus={() => this.setState({ searchBarWidth: "100%" })}
                onBlur={() => this.setState({ searchBarWidth: "40%" })}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>

              {/* <IconButtotransition: width 100ms ease-in-out;n color="inherit">
                <Badge
                  className={classes.margin}
                  badgeContent={4}
                  color="secondary"
                >
                  <MailIcon />
                </Badge>
              </IconButton> */}

              {/* NOTIFICATIONS */}
              <IconButton color="inherit" onClick={this.handleNotificationMenuOpen}>
                <Badge
                  className={classes.margin}
                  badgeContent={0}
                  color="secondary"
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              {/* NOTIFICATIONS MOBILE */}
              <IconButton color="inherit" onClick={this.handleNotificationMenuOpen}>
                <Badge
                  className={classes.margin}
                  badgeContent={0}
                  color="secondary"
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              {/* NOTIFICATIONS MENU */}
              <Menu
                anchorEl={this.state.notificationMoreAnchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={isNotificationMenuOpen}
                onClose={this.handleNotificationMenuClose}
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
  }
}

Header.propTypes = {
  styles: PropTypes.object,
  handleChangeNavDrawer: PropTypes.func,
  classes: PropTypes.object,
  navDrawerOpen: PropTypes.bool
};

export default withStyles(styles)(Header);
