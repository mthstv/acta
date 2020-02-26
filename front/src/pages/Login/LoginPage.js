import React, { Component } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Help from "@material-ui/icons/Help";
import TextField from "@material-ui/core/TextField";
// import Checkbox from "@material-ui/core/Checkbox";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import theme from "../../theme";
import styles from './styles';

import api from '../../services/api';
import { login } from '../../services/auth';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as userActions from '../../_actions/user'
import * as snackbarActions from '../../_actions/snackbar'


class LoginPage extends Component {
  // constructor(props) {
  //   super(props);
  //   // console.log(props);
  // }

  state = {
    email: '',
    password: '',
    error: false,
    errorMessage: ''
  }

  LoginUser = (e) => {
    e.preventDefault();

    api.post('/auth/login', this.state)
    .then(async (res) => {
      await this.props.userActions.SaveUserData(res.data.data);
      login(res.data.data)
      // this.props.history.push('/');
      window.location.href = '/'
      
    })
    .catch((err) => {
      if(err.response) {
        this.setState({ error: true, errorMessage: err.response.data.message });
      }
    })
  }

  handleForgotPass = () => {
    // console.log(this.props.snackbarActions)
   this.props.snackbarActions.showSnackbar('Teste! Tudo funcionando!');
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <div style={styles.loginContainer}>
            <Paper style={styles.paper}>
              <form onSubmit={this.LoginUser}>
                <TextField 
                  label="E-mail" 
                  fullWidth={true}
                  required
                  error={this.state.error}
                  helperText={this.state.errorMessage}
                  onChange={(e) => this.setState({ email: e.target.value, error: false, errorMessage: '' })}/>
                
                <div style={{ marginTop: 16 }}>
                  <TextField 
                    label="Senha" 
                    fullWidth={true} 
                    required
                    error={this.state.error}
                    type="password" 
                    onChange={(e) => this.setState({ password: e.target.value, error: false, errorMessage: '' })}/>
                </div>
  
                <div style={{ marginTop: 10 }}>
                  {/* <FormControlLabel
                    control={
                      <Checkbox
                        label="Lembre de mim"
                        style={styles.checkRemember.style}
                      />
                    }
                    label="Lembre de mim"
                  /> */}
                  <Button
                    type="submit"
                    variant="contained" 
                    color="primary" 
                    style={styles.loginBtn}>
                    Login
                  </Button>
                </div>
              </form>
            </Paper>
  
            <div style={styles.buttonsDiv} >
              <Button href="/registrar" style={styles.flatButton}>
                <PersonAdd />
                <span style={{ margin: 5 }}>Registrar</span>
              </Button>
  
              <Button 
                style={styles.flatButton}
                onClick={this.handleForgotPass}>
                <Help />
                <span style={{ margin: 5 }}>Esqueceu a senha?</span>
              </Button>
            </div>
  
          </div>
        </div>
      </ThemeProvider>
    );
  }
};

const mapStateToProps = state => ({
  user: state.user,
});

function mapDispatchToProps (dispatch) {
  return {
      userActions: bindActionCreators(userActions, dispatch),
      snackbarActions: bindActionCreators(snackbarActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
