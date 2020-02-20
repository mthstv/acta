import React, { Component } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Help from "@material-ui/icons/Help";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Link } from "react-router-dom";
import theme from "../../theme";
import styles from './styles';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import api from '../../services/api';
import { isAuthenticated, login } from '../../services/auth';

import * as userActions from '../../_actions/user'


class LoginPage extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    email: '',
    password: ''
  }

  LoginUser = () => {
    api.post('/user/login', this.state)
    .then(async (res) => {
      await this.props.SaveUserData(res.data.data);
      login(res.data.data)
      // this.props.history.push('/');
      window.location.href = '/'
      
    })
    .catch((err) => {
      if(err.response) {
        console.log(err.response.data.message)
      }
    })
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <div style={styles.loginContainer}>
            <Button href="/" style={styles.flatButton}>
              Voltar
            </Button>
            <Paper style={styles.paper}>
              <form>
                <TextField 
                  label="E-mail" 
                  fullWidth={true} 
                  onChange={(e) => this.setState({email: e.target.value})}/>
                
                <div style={{ marginTop: 16 }}>
                  <TextField 
                    label="Senha" 
                    fullWidth={true} 
                    type="password" 
                    onChange={(e) => this.setState({password: e.target.value})}/>
                </div>
  
                <div style={{ marginTop: 10 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        label="Lembre de mim"
                        style={styles.checkRemember.style}
                      />
                    }
                    label="Lembre de mim"
                  />
                  <Button 
                    variant="contained" 
                    color="primary" 
                    style={styles.loginBtn}
                    onClick={this.LoginUser}>
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
  
              <Button href="/" style={styles.flatButton}>
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(userActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
