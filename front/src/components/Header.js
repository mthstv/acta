import React, { useState, useRef, useEffect } from "react";
import { isMobile } from 'react-device-detect';
import classNames from "classnames";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import { Toolbar } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { InstantSearch, Index } from 'react-instantsearch-dom';
import CustomSearchBox from './SearchBar/CustomSearchBox';
import CustomHit from './SearchBar/CustomHit';
import searchClient from '../services/search'

const useStyles = makeStyles(theme => ({
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
  },
  searchResults: {
    // position: 'absolute',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
    // color: theme.palette.text.secondary,
    marginTop: 15,
    // width: 800,
    // maxWidth: 800,
    // height: 300,
    maxHeight: 300,
    overflowY: 'scroll', 
    // overflow: 'auto',
    // alignItems: 'center', 
    // justifyContent: 'center',
  },
  searchResultsMobile: {
    // position: 'absolute',
    marginTop: 10,
    width: 350,
    maxWidth: 350,
    // height: 300,
    maxHeight: 300,
    overflowY: 'scroll',
    // overflow: 'auto'
  }
}));

function Header(props) {
  const classes = useStyles();

  const [notificationMoreAnchorEl, setNotificationMoreAnchorEl] = useState(null)
  const [openSearchResult, setOpenSearchResult] = useState(false);

  const anchorSearchRef = useRef(null);

  // Notifications
  const handleNotificationMenuOpen = event => {
    setNotificationMoreAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationMoreAnchorEl(null);
  };

  //Search Results
  const handleSearchResultToggle = () => {
    setOpenSearchResult(true);
  };

  const handleSearchResultClose = event => {
    if (anchorSearchRef.current && anchorSearchRef.current.contains(event.target)) {
      return;
    }
    setOpenSearchResult(false);
  };
  const prevOpen = useRef(openSearchResult);

  useEffect(() => {
    if (prevOpen.current === true && openSearchResult === false) {
      anchorSearchRef.current.focus();
    }
    prevOpen.current = openSearchResult;
  }, [openSearchResult]);

  return (
    <div>
      <AppBar
        className={classNames(classes.appBar, {
          [classes.appBarShift]: props.navDrawerOpen
        })}
      >
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Open drawer"
            onClick={props.handleChangeNavDrawer}
          >
            <MenuIcon />
          </IconButton>

          {/* SEARCHBAR */}
            <InstantSearch indexName="rules" searchClient={searchClient}>
              <div
                style={{width: '100%'}}
                ref={anchorSearchRef}
                aria-controls={openSearchResult ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onKeyUp={handleSearchResultToggle}>
                <CustomSearchBox />
              </div>
              <div>
                  <Popper 
                    open={openSearchResult} 
                    anchorEl={anchorSearchRef.current}
                    transition
                    disablePortal>
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                      >
                        <Paper
                          className={classes.searchResults}>
                          <ClickAwayListener onClickAway={handleSearchResultClose}> 
                            {/* WHEN THE HIT RETURNS EMPTY, ITS STILL RENDERING A MENU ITEM */}
                            <MenuList id="menu-list-grow">
                              <Index indexName="rules">
                                <CustomHit history={props.history}/>
                              </Index>
                              <Index indexName="parts">
                                <CustomHit history={props.history}/>
                              </Index>
                            
                              <Index indexName="books">
                                <CustomHit history={props.history}/>
                              </Index>
                            
                              <Index indexName="titles">
                                <CustomHit history={props.history}/>
                              </Index>
                            
                              <Index indexName="chapters">
                                <CustomHit history={props.history}/>
                              </Index>
                            
                              <Index indexName="sections">
                                <CustomHit history={props.history}/>
                              </Index>
                            
                              <Index indexName="subsections">
                                <CustomHit history={props.history}/>
                              </Index>
                            
                              <Index indexName="articles">
                                <CustomHit history={props.history}/>
                              </Index>
                            
                              <Index indexName="paragraphs">
                                <CustomHit history={props.history}/>
                              </Index>
                            
                              <Index indexName="incises">
                                <CustomHit history={props.history}/>
                              </Index>
                            
                              <Index indexName="lines">
                                <CustomHit history={props.history}/>
                              </Index>
                            
                              <Index indexName="items">
                                <CustomHit history={props.history}/>
                              </Index>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                </Popper>
              </div>
            </InstantSearch>


          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>

            {/* NOTIFICATIONS */}
            <IconButton color="inherit" onClick={handleNotificationMenuOpen}>
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
            <IconButton color="inherit" onClick={handleNotificationMenuOpen}>
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


export default Header;
