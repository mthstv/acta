import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import PersonAdd from "@material-ui/icons/PersonAdd";
import TextField from "@material-ui/core/TextField";
import theme from "../../theme";
import Collapse from '@material-ui/core/Collapse';
import styles from "./styles";
import Fade from '@material-ui/core/Fade';

import { useDispatch } from "react-redux";

import api from "../../services/api";
import { login } from "../../services/auth";

import {ReactComponent as Icon} from "../../images/book_shelf.svg";

function RecoverPasswordPage(props) {
  const dispatch = useDispatch()
  const [user, setUser] = useState({
    password: "",
    password_confirmation: ""
  })
  const [error, setError] = useState({
    errorMessages:""
  })
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [loaded, setLoaded] = useState(false)
  
  useEffect(() => {
      setUser({...user, email: props.match.params.email, token: props.match.params.token})
    if (user.password.trim() && user.password_confirmation.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
    setLoaded(true)
  }, [user.password, user.password_confirmation]);

  const recoverUser = (e) => {
    e.preventDefault();
    api.post("/auth/reset-password", user)
      .then(async (res) => {
        await dispatch({type: 'SNACKBAR_SHOW', message: 'Nova senha salva com sucesso, efetuando login...'})
        await dispatch({type: 'SAVE_USER_DATA', user: res.data.data})
        login(res.data.data);
        setTimeout(() => window.location.href = "/", 3000);
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
            <Fade 
              in={loaded}
              style={{ transformOrigin: '0 0 0' }}
              {...(loaded ? { timeout: (1500)  } : {})}>
              <div style={{textAlign: "center"}}>
                {/* <Icon style={{height: 100, fill: '#eeeeee', background: "linear-gradient(#2196F3, #219DF3 50%)", borderRadius: 10, marginLeft: 200, marginBottom: 200}} /> */}
                <Icon style={{height: 100, fill: "rgb(158, 158, 158)"}} />
                <b className="customlogo glitch mx-auto" style={{color: "rgb(158, 158, 158)", fontSize: 40}}>
                  ACTA
                </b>
              </div>
            </Fade>
            <Collapse in={loaded}>
              <div>
                <Paper style={styles.paper}>
                  <form onSubmit={recoverUser}>
                    <div>
                      <TextField
                        label="Nova senha"
                        fullWidth={true}
                        required
                        error={Boolean(error.errorMessages.password)}
                        helperText={error.errorMessages.password ? error.errorMessages.password[0] : ""}
                        type="password"
                        onChange={(e) => handleFieldChange('password', e.target.value)}/>
                    </div>
                    <div style={{ marginTop: 16 }}>
                      <TextField
                        label="Confirme a nova senha"
                        fullWidth={true}
                        required
                        error={Boolean(error.errorMessages.password_confirmation)}
                        helperText={error.errorMessages.password_confirmation ? error.errorMessages.password_confirmation[0] : ""}
                        type="password"
                        onChange={(e) => handleFieldChange('password_confirmation', e.target.value)}/>
                    </div>
                  
                    <div style={{ marginTop: 10 }}>
                      <Button 
                        type="submit"
                        variant="contained" 
                        color="primary" 
                        style={styles.loginBtn}
                        disabled={isButtonDisabled}>
                        Recuperar
                      </Button>
                    </div>
                  </form>
                </Paper>
              </div>
            </Collapse>
            <Fade 
              in={loaded}
              style={{ transformOrigin: '0 0 0' }}
              {...(loaded ? { timeout: (2500)  } : {})}>
              <div style={styles.buttonsDiv} >
                <Button href="/login" style={styles.flatButton}>
                  <PersonAdd />
                  <span style={{ margin: 5 }}>Login</span>
                </Button>
              </div>
            </Fade> 
          </div>
      </div>
    </ThemeProvider>
  );
}

export default RecoverPasswordPage;
