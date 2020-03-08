import React, { useState, useEffect } from "react";
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

import FileUploadModal from "../../../components/FileUploadModal";

function UserProfile (props) {

  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    avatar_url: null,
  })
  const [avatarHover, setAvatarHover] = useState(false)
  const [uploadModalShow, setUploadModalShow] = useState(false)
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    setIsAuth(parseInt(props.user.id) === parseInt(props.match.params.user))
    
    const fetchUser = () => {
      api.get(`/user/${parseInt(props.match.params.user)}`)
        .then((res) =>{
          setUser(res.data.data)
        })
        .catch((err) => {
          if(err.response.status === 401) {
            window.location.href = "/login";
          }
          if(err.response && err.response.status === 404) {
            props.history.push('/404');
          }
        });
    }
    fetchUser()
  }, [props])
  
  const getUser = async () => {
    await api.get(`/user/${parseInt(props.match.params.user)}`)
    .then((res) =>{
      setUser(res.data.data)
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(isAuth) {
      await api.patch("/user/auth-update", user)
        .then((res) =>{
          props.userActions.SaveUserData(res.data.data);
          props.snackbarActions.showSnackbar("Dados alterados com sucesso");
        })
        .catch((err) => {
          if(err.response.status === 401) {
            window.location.href = "/login";
          }
        });

    } else {
      delete user.auth_token;
      await api.patch(`/user/${user.id}`, user)
        .then((res) =>{
          props.snackbarActions.showSnackbar("Usuário alterado com sucesso");
        })
        .catch((err) => {
          if(err.response.status === 401) {
            window.location.href = "/login";
          }
        });

    }
  }

  const handleAvatarChange = () => {
    setUploadModalShow(true)
  }

  /**
   * upon confirmation, save the file uploaded by user
   */
  const handleUploadSave = async file => {
    if(file) {
      const data = new FormData() 
      data.append('avatar', file)

      await api.post('/user/avatar-upload', data)
      await api.get('/auth/by-token')
        .then((res) => {
          props.userActions.SaveUserData(res.data.data)
          getUser()
        })
      setUploadModalShow(false)
    } else {
      setUploadModalShow(false)
    }
  }


  return (
    <PageBase title={"Perfil"}>
      <div>
        {uploadModalShow && 
          <FileUploadModal
            show={uploadModalShow}
            onHide={handleUploadSave}
          />
        }
        <form onSubmit={handleSubmit}>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} >
              <Row>
                <Col xs={12} sm={12} md={4} lg={4}>
                  {/* Div on avatar hover */}
                  {avatarHover && 
                    <div 
                      style={styles.hoverCircle} 
                      onClick={() => { return isAuth ? handleAvatarChange() : null}}
                      onMouseLeave={() => setAvatarHover(false)}>
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
                      src={user.avatar ? user.avatar_url : require('../../../images/user-profile.png')}
                      onMouseEnter={() => { return isAuth ? setAvatarHover(true) : null}}
                      onClick={() => { return isAuth ? handleAvatarChange() : null}}
                    />
                  </div>
                </Col>
                <Col xs={12} sm={12} md={8} lg={8}>
                <TextField
                  label="Nome"
                  fullWidth={true}
                  margin="normal"
                  value={user.name}
                  onChange={(e) => setUser({...user, name: e.target.value})}
                />

                <TextField
                  label="E-mail"
                  fullWidth={true}
                  margin="normal"
                  value={user.email}
                  onChange={(e) => setUser({...user, email: e.target.value})}
                />

                <TextField
                  label="Nível de permissão"
                  fullWidth={false}
                  margin="normal"
                  value={handleRole(user.role)}
                  disabled
                />
                </Col>
              </Row>
            </Col>
          </Row>


          <div style={styles.buttons}>
            <Link to={isAuth ? "/" : "/usuarios"}>
              <Button variant="contained">Voltar</Button>
            </Link>

            <Button
              style={styles.saveButton}
              variant="contained"
              type="submit"
              color="primary"
            >
              {isAuth ? "Salvar" : "Alterar" }
            </Button>
          </div>
        </form>
      </div>
    </PageBase>
  );
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