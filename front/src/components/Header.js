import React, { useState, useRef, useEffect } from "react";
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

import CustomSearchBox from './CustomSearchBox';
import { RuleHit, NameHit, TextHit } from './SearchHits';

import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Index,
  Hits
} from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  'AKYYFEGWVX',
  '162f026f53f9fdeefc26d00d94e1f6f2'
);

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
    marginTop: 20,
    width: 800,
    maxWidth: 800,
    height: 300,
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
                onClick={handleSearchResultToggle}>
                <CustomSearchBox />
              </div>
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
                        <Grid item xs={12} sm={12} md={8} lg={10}>
                          <Paper
                            className={classes.searchResults}>
                            <ClickAwayListener onClickAway={handleSearchResultClose}>
                              <MenuList id="menu-list-grow">
                                <MenuItem onClick={handleSearchResultClose}>
                                <Index indexName="rules">
                                  <Hits hitComponent={RuleHit}/>
                                </Index>
                                </MenuItem>
                                <MenuItem onClick={handleSearchResultClose}>
                                  <Index indexName="parts">
                                    <Hits hitComponent={NameHit}/>
                                  </Index>
                                </MenuItem>
                                <MenuItem onClick={handleSearchResultClose}>
                                  <Index indexName="books">
                                    <Hits hitComponent={NameHit}/>
                                  </Index>
                                </MenuItem>
                                <MenuItem onClick={handleSearchResultClose}>
                                  <Index indexName="titles">
                                    <Hits hitComponent={NameHit}/>
                                  </Index>
                                </MenuItem>
                                <MenuItem onClick={handleSearchResultClose}>
                                  <Index indexName="chapters">
                                    <Hits hitComponent={NameHit}/>
                                  </Index>
                                </MenuItem>
                                <MenuItem onClick={handleSearchResultClose}>
                                  <Index indexName="sections">
                                    <Hits hitComponent={NameHit}/>
                                  </Index>
                                </MenuItem>
                                <MenuItem onClick={handleSearchResultClose}>
                                  <Index indexName="subsections">
                                    <Hits hitComponent={NameHit}/>
                                  </Index>
                                </MenuItem>
                                <MenuItem onClick={handleSearchResultClose}>
                                  <Index indexName="articles">
                                    <Hits hitComponent={TextHit}/>
                                  </Index>
                                </MenuItem>
                                <MenuItem onClick={handleSearchResultClose}>
                                  <Index indexName="paragraphs">
                                    <Hits hitComponent={TextHit}/>
                                  </Index>
                                </MenuItem>
                                <MenuItem onClick={handleSearchResultClose}>
                                  <Index indexName="incises">
                                    <Hits hitComponent={TextHit}/>
                                  </Index>
                                </MenuItem>
                                <MenuItem onClick={handleSearchResultClose}>
                                  <Index indexName="lines">
                                    <Hits hitComponent={TextHit}/>
                                  </Index>
                                </MenuItem>
                                <MenuItem onClick={handleSearchResultClose}>
                                  <Index indexName="items">
                                    <Hits hitComponent={TextHit}/>
                                  </Index>
                                </MenuItem>
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grid>
                      </Grow>
                    )}
                </Popper>
              {/* <Paper className={classes.searchResult}>
                <Index indexName="rules">
                  <h2>Regras:</h2>
                  <Hits hitComponent={RuleHit}/>
                </Index>
              </Paper> */}
              {/* <Index indexName="parts">
                <h2>index: parts</h2>
                <Hits hitComponent={SearchHit}/>
              </Index> */}
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
