import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import PageBase from "../../../components/PageBase";
import styles from './styles';

import api from '../../../services/api';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as snackbarActions from '../../../_actions/snackbar'

import ElementSelect from './components/ElementSelect';
class ElementForm extends Component {
    // constructor(props) {
    //   super(props)
    // }

    state = {
      rule_title: '',
      description: '',
      preamble: '',

      element:'',
      parentElements: ''
    }

    handleSubmit = async (e) => {
      e.preventDefault()

      // await api.post('/rule', this.state)
      // .then((res) =>{
      //   this.props.snackbarActions.showSnackbar('Registro criada com sucesso');
      //   this.props.history.push('/');
      // })
      // .catch((err) => {
      //   if(err.response.status === 401) {
      //     window.location.href = '/login'
      //   }
      // })
    }

    handleElement = async (element) => {
      await this.setState({ element })
      await api.get(`/element/by-label/${element}`)
        .then((res) => this.setState({ parentElements: res.data.data.parent }) )
      console.log('element', this.state.element)
      console.log('parents', this.state.parentElements)
    }

  render() {
    return (
        <PageBase title="Adicionar Elemento">
        {/* criar 2 selects, um para elemento e outro para elemento pai onde esse elemento criado irá ser adicionado */}
        <form onSubmit={this.handleSubmit}>
        <Row>
          <Col sm={6} md={6} lg={6}>
            <ElementSelect
             onElementChange={this.handleElement}/>
          </Col>
        </Row>
        {/* 
          <FormControl fullWidth={true}>
            <InputLabel htmlFor="City">City</InputLabel>
            <Select
              inputProps={{
                name: "City",
                id: "City"
              }}
              fullWidth={true}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"London"}>London</MenuItem>
              <MenuItem value={"Paris"}>Paris</MenuItem>
              <MenuItem value={"Rome"}>Rome</MenuItem>
            </Select>
          </FormControl> */}

          <TextField
            label="Título"
            fullWidth={true}
            margin="normal"
            value={this.state.rule_title}
            onChange={(e) => this.setState({rule_title: e.target.value})}
            />

          <TextField
            label="Descrição"
            fullWidth={true}
            margin="normal"
            multiline
            rows={2}
            value={this.state.description}
            onChange={(e) => this.setState({description: e.target.value})}
            />

          <TextField
            label="Preâmbulo"
            fullWidth={true}
            margin="normal"
            multiline
            rows={4}
            value={this.state.preamble}
            onChange={(e) => this.setState({preamble: e.target.value})}
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
                  Criar
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


export default connect(mapStateToProps, mapDispatchToProps)(ElementForm);