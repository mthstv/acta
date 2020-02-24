import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import PageBase from "../../../components/PageBase";
import styles from './styles';

import api from '../../../services/api';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { handleRole } from '../../../helpers';

import * as snackbarActions from '../../../_actions/snackbar'

class UserProfile extends Component {
    constructor(props) {
      super(props)
    }

    state = {
      userIsAuth: false,
      name: '',
      email: '',
      role: ''
  }
    componentDidMount() {
      if(parseInt(this.props.user.id) === parseInt(this.props.match.params.user)) {       
        this.setState(this.props.user);
        this.setState({is_auth: true});
      } else {
        this.setState({is_auth: false});
      }
    }

    handleSubmit = async (e) => {
      e.preventDefault()

      // await api.post('/rule', this.state)
      // .then((res) =>{
      //   this.props.snackbarActions.showSnackbar('Registro criada com sucesso');
      //   this.props.history.push('/');
      // })
    }

  render() {
    return (
        <PageBase title={`Perfil`}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            label="Nome"
            fullWidth={true}
            margin="normal"
            value={this.state.name}
            onChange={(e) => this.setState({name: e.target.value})}
            />

          <TextField
            label="E-mail"
            fullWidth={true}
            margin="normal"
            value={this.state.email}
            onChange={(e) => this.setState({email: e.target.value})}
            />

          <TextField
            label="Nível de permissão"
            fullWidth={false}
            margin="normal"
            value={handleRole(this.state.role)}
            disabled
            />

            <div style={styles.buttons}>
              <Link to="/">
                  <Button variant="contained">Cancelar</Button>
              </Link>

              <Button
                style={styles.saveButton}
                variant="contained"
                type="submit"
                color="primary"
                >
                  Salvar
              </Button>
              {/* <Button
                style={styles.saveButton}
                variant="contained"
                color="secondary"
                >
                  Criar e adicionar elementos
              </Button> */}
            </div>
        </form>
      </PageBase>
    );
  }
};

const mapStateToProps = state => ({
  user: state.user,
});

function mapDispatchToProps (dispatch) {
  return {
      snackbarActions: bindActionCreators(snackbarActions, dispatch),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);