const snackbar = (state = {}, action) => {
    switch (action.type) {
      case "SNACKBAR_SHOW":
        return {
          ...state,
          snackbarOpen: true,
          snackbarMessage: action.message
        };
      case "SNACKBAR_CLEAR":
        return {
          ...state,
          snackbarOpen: false,
          errorSnackbarOpen: false,
          infoSnackbarOpen: false
        };
      default:
        return state;
    }
  };
  
  export default snackbar;