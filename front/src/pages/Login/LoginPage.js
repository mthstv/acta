import React from "react";
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

const LoginPage = () => {

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
                // hintText="E-mail" 
                label="E-mail" 
                fullWidth={true} />
              <div style={{ marginTop: 16 }}>
                <TextField 
                  // hintText="Password" 
                  label="Senha" 
                  fullWidth={true} 
                  type="password" />
              </div>

              <div style={{ marginTop: 10 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      label="Lembre de mim"
                      style={styles.checkRemember.style}
                      // labelStyle={styles.checkRemember.labelStyle}
                      // iconStyle={styles.checkRemember.iconStyle}
                    />
                  }
                  label="Lembre de mim"
                />
                <Link to="/">
                  <Button variant="contained" color="primary" style={styles.loginBtn}>
                    Login
                  </Button>
                </Link>
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
};

export default LoginPage;
