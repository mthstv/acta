import React, { useState, useRef, useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import { makeStyles } from '@material-ui/core/styles';
import { InstantSearch, Index } from 'react-instantsearch-dom';

import CustomHit from './CustomHit';
import CustomSearchBox from './CustomSearchBox';

import api from '../../services/api';
import searchClient from '../../services/search';

const useStyles = makeStyles(theme => ({
searchResults: {
    borderRadius: '5px 5px 0px 0px',
    padding: theme.spacing(2),
    marginTop: 50,
    width: '97vw',
    maxHeight: 300,
    overflow: 'auto',
  }
}));

const SearchResultsMenu = (props) => {
  const classes = useStyles();
    
  const [ruleData, setRuleData] = useState([])
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  //Search Results
  const handleToggle = () => {
    setOpen(true);
  };

  const handleClose = event => {
    if (event && anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  const prevOpen = useRef(open);

  useEffect(() => {
    api.get('/rule')
      .then((res) => {
        const resumedRules = []
        res.data.data.forEach((rule) => {
          const { id, rule_title } = rule
          resumedRules.push({ id, rule_title })
        })
        setRuleData(resumedRules)
      })

    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);


  return (
    <InstantSearch indexName="rules" searchClient={searchClient}>
      {/* SEARCHBAR */}
      <div
        style={{width: '100%'}}
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onKeyUp={handleToggle}>
        <CustomSearchBox />
      </div>
      {/* SEARCH RESULTS */}
      <div>
        <Popper 
          open={open} 
          anchorEl={anchorRef.current}
          placement="left-start"
          transition
          disablePortal>
          {({ TransitionProps }) => (
            <>
              <Grow
              {...TransitionProps}>
                <div>
                  <Paper
                    className={classes.searchResults}
                    elevation={0}
                    square={true}>
                    <ClickAwayListener onClickAway={handleClose}> 
                      {/* WHEN THE HIT RETURNS EMPTY, ITS STILL RENDERING A MENU ITEM */}
                      <MenuList id="menu-list-grow">

                        <Index indexName="rules">
                          <CustomHit history={props.history} ruleData={ruleData} handleClose={handleClose}/>
                        </Index>

                        <Index indexName="parts">
                          <CustomHit history={props.history} ruleData={ruleData} handleClose={handleClose}/>
                        </Index>
                      
                        <Index indexName="books">
                          <CustomHit history={props.history} ruleData={ruleData} handleClose={handleClose}/>
                        </Index>
                      
                        <Index indexName="titles">
                          <CustomHit history={props.history} ruleData={ruleData} handleClose={handleClose}/>
                        </Index>
                      
                        <Index indexName="chapters">
                          <CustomHit history={props.history} ruleData={ruleData} handleClose={handleClose}/>
                        </Index>
                      
                        <Index indexName="sections">
                          <CustomHit history={props.history} ruleData={ruleData} handleClose={handleClose}/>
                        </Index>
                      
                        <Index indexName="subsections">
                          <CustomHit history={props.history} ruleData={ruleData} handleClose={handleClose}/>
                        </Index>
                      
                        <Index indexName="articles">
                          <CustomHit history={props.history} ruleData={ruleData} handleClose={handleClose}/>
                        </Index>
                      
                        <Index indexName="paragraphs">
                          <CustomHit history={props.history} ruleData={ruleData} handleClose={handleClose}/>
                        </Index>
                      
                        <Index indexName="incises">
                          <CustomHit history={props.history} ruleData={ruleData} handleClose={handleClose}/>
                        </Index>
                      
                        <Index indexName="lines">
                          <CustomHit history={props.history} ruleData={ruleData} handleClose={handleClose}/>
                        </Index>
                      
                        <Index indexName="items">
                          <CustomHit history={props.history} ruleData={ruleData} handleClose={handleClose}/>
                        </Index>

                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                  <Paper
                    square
                    elevation={1}
                    style={{textAlign: 'right', backgroundColor: 'white', borderRadius: '0px 0px 5px 5px',}}>
                    <img src={require('../../images/search-by-algolia.svg')} alt="algolia-logo"/>
                  </Paper>
                </div>
              </Grow>
          </>
          )}
        </Popper>
      </div>
    </InstantSearch>
  );
}

export default SearchResultsMenu;