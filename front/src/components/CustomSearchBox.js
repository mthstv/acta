import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";


import algoliasearch from 'algoliasearch/lite';
// import { connectSearchBox } from 'react-instantsearch-dom';

const styles = theme => ({
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
})
const CustomSearchBox = (props) => {

  const [searchBarWidth, setSearchBarWidth] = useState("40%")

  return (
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
  );
};

CustomSearchBox.propTypes = {
  styles: PropTypes.object,
  handleChangeNavDrawer: PropTypes.func,
  classes: PropTypes.object,
  navDrawerOpen: PropTypes.bool
};

export default withStyles(styles)(CustomSearchBox);
