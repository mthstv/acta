import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import PersonAdd from "@material-ui/icons/PersonAdd";
import TextField from "@material-ui/core/TextField";
import theme from "../../theme";
import styles from "./styles";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import api from "../../services/api";
import { login } from "../../services/auth";

import * as userActions from "../../_actions/user";

function RegisterPage(props) {

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [error, setError] = useState({
    errorMessages:""
  })
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  useEffect(() => {
    if (user.name.trim() && user.email.trim() && user.password.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [user.name, user.email, user.password]);

  const registerUser = (e) => {
    e.preventDefault();
    api.post("/auth/register", user)
      .then(async (res) => {
        await props.SaveUserData(res.data.data);
        login(res.data.data);
        window.location.href = "/";
      })
      .catch((err) => {
        if(err.response) {
          setError({ errorMessages: err.response.data.errors });
        }
      });
  };

  const handleFieldChange = (field, value) => {
    setError({errorMessages: {}})
    setUser({...user,  [field]: value})
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <div style={styles.loginContainer}>
          <Paper style={styles.paper}>
            <form onSubmit={registerUser}>
              <TextField 
                label="Nome" 
                fullWidth={true}
                required
                error={Boolean(error.errorMessages.name)}
                onChange={(e) => handleFieldChange('name', e.target.value)}/>
            
              <div style={{ marginTop: 16 }}>
                <TextField 
                  label="E-mail" 
                  fullWidth={true}
                  required
                  error={Boolean(error.errorMessages.email)}
                  helperText={error.errorMessages.email ? error.errorMessages.email[0] : ""}
                  onChange={(e) => handleFieldChange('email', e.target.value)}/>
              </div>
            
              <div style={{ marginTop: 16 }}>
                <TextField
                  label="Senha"
                  fullWidth={true}
                  required
                  error={Boolean(error.errorMessages.password)}
                  helperText={error.errorMessages.password ? error.errorMessages.password[0] : ""}
                  type="password"
                  onChange={(e) => handleFieldChange('password', e.target.value)}/>
              </div>
            
              <div style={{ marginTop: 10 }}>
                <Button 
                  type="submit"
                  variant="contained" 
                  color="primary" 
                  style={styles.loginBtn}
                  disabled={isButtonDisabled}>
                  Registrar
                </Button>
              </div>
            </form>
          </Paper>

          <div style={styles.buttonsDiv} >
            <Button href="/login" style={styles.flatButton}>
              <PersonAdd />
              <span style={{ margin: 5 }}>Login</span>
            </Button>
          </div>

        </div>
      </div>
    </ThemeProvider>
  );
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(userActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
