import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import PageBase from "../../../components/PageBase";
import styles from './styles';
import { handleRole } from '../../../helpers';

import api from '../../../services/api';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as snackbarActions from '../../../_actions/snackbar'
import * as userActions from '../../../_actions/user'

class UserProfile extends Component {
    // constructor(props) {
    //   super(props)
    // }

    state = {
      is_auth: false,
      name: '',
      email: '',
      role: ''
  }
    componentDidMount() {
      this.setState({is_auth: parseInt(this.props.user.id) === parseInt(this.props.match.params.user)});
      
      api.get(`/user/${parseInt(this.props.match.params.user)}`, this.state)
      .then((res) =>{
        this.setState(res.data.data);
      })
      .catch((err) => {
        if(err.response.status === 401) {
          window.location.href = '/login'
        }
      })
    }

    handleSubmit = async (e) => {
      e.preventDefault()

      if(this.state.is_auth) {
        await api.patch('/user/auth-update', this.state)
        .then((res) =>{
          this.props.userActions.SaveUserData(res.data.data);
          this.props.snackbarActions.showSnackbar('Dados alterados com sucesso');
        })
        .catch((err) => {
          if(err.response.status === 401) {
            window.location.href = '/login'
          }
        })

      } else {
        delete this.state.auth_token
        await api.patch(`/user/${this.state.id}`, this.state)
        .then((res) =>{
          this.props.snackbarActions.showSnackbar('Usuário alterado com sucesso');
        })
        .catch((err) => {
          if(err.response.status === 401) {
            window.location.href = '/login'
          }
        })

      }
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
              <Link to={this.state.is_auth ? '/' : '/usuarios'}>
                  <Button variant="contained">Voltar</Button>
              </Link>

              <Button
                style={styles.saveButton}
                variant="contained"
                type="submit"
                color="primary"
                >
                  {this.state.is_auth ? 'Salvar' : 'Alterar' }
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
      userActions: bindActionCreators(userActions, dispatch),
      snackbarActions: bindActionCreators(snackbarActions, dispatch),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);