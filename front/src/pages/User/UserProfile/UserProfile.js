import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import PageBase from "../../../components/PageBase";
import styles from "./styles";
import { handleRole } from "../../../helpers";
import { Row, Col } from 'react-bootstrap';
import CreateIcon from '@material-ui/icons/Create';

import api from "../../../services/api";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as snackbarActions from "../../../_actions/snackbar";
import * as userActions from "../../../_actions/user";

class UserProfile extends Component {
  // constructor(props) {
  //   super(props)
  // }

    state = {
      is_auth: false,
      name: "",
      email: "",
      role: "",
      avatar_url: null,
      avatarHover: false
    }
    componentDidMount() {
      this.setState({is_auth: parseInt(this.props.user.id) === parseInt(this.props.match.params.user)});
      
      api.get(`/user/${parseInt(this.props.match.params.user)}`, this.state)
        .then((res) =>{
          this.setState(res.data.data);
        })
        .catch((err) => {
          if(err.response.status === 401) {
            window.location.href = "/login";
          }
          if(err.response && err.response.status === 404) {
            this.props.history.push('/404');
          }
        });
    }

    handleSubmit = async (e) => {
      e.preventDefault();

      if(this.state.is_auth) {
        await api.patch("/user/auth-update", this.state)
          .then((res) =>{
            this.props.userActions.SaveUserData(res.data.data);
            this.props.snackbarActions.showSnackbar("Dados alterados com sucesso");
          })
          .catch((err) => {
            if(err.response.status === 401) {
              window.location.href = "/login";
            }
          });

      } else {
        delete this.state.auth_token;
        await api.patch(`/user/${this.state.id}`, this.state)
          .then((res) =>{
            this.props.snackbarActions.showSnackbar("Usuário alterado com sucesso");
          })
          .catch((err) => {
            if(err.response.status === 401) {
              window.location.href = "/login";
            }
          });

      }
    }

    handleAvatarChange = () => {
      console.log('change avatar')
    }

    render() {
      return (
        <PageBase title={"Perfil"}>
          <form onSubmit={this.handleSubmit}>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12} >
                <Row>
                  <Col xs={12} sm={12} md={4} lg={4}>
                    {/* Div on avatar hover */}
                    {this.state.avatarHover && 
                      <div 
                        style={styles.hoverCircle} 
                        onClick={() => { return this.state.is_auth ? this.handleAvatarChange() : null}}
                        onMouseLeave={() => this.setState({ avatarHover: false })}>
                        <div style={{marginTop: 70}}>
                          <CreateIcon fontSize="large" />
                        </div>
                      </div> 
                    }
                    {/* Avatar div */}
                    <div style={styles.userAvatar}>
                      <img 
                        style={styles.avatarImg}
                        alt="user-profile"
                        src={this.state.avatar_url ? this.state.avatar_url : require('../../../images/user-profile.png')}
                        onMouseEnter={() => { return this.state.is_auth ? this.setState({ avatarHover: true }) : null}}
                      />
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={8} lg={8}>
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
                  </Col>
                </Row>
              </Col>
            </Row>


            <div style={styles.buttons}>
              <Link to={this.state.is_auth ? "/" : "/usuarios"}>
                <Button variant="contained">Voltar</Button>
              </Link>

              <Button
                style={styles.saveButton}
                variant="contained"
                type="submit"
                color="primary"
              >
                {this.state.is_auth ? "Salvar" : "Alterar" }
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
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);