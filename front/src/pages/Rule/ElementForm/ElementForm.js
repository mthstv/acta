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
import { handleElementName } from '../../../helpers';
class ElementForm extends Component {

    state = {
      ordering: '',
      name: '',
      text: '',

      selectedElement: '',
      parentElements: [],
      selectedParent: ''
    }

    handleSubmit = async (e) => {
      e.preventDefault()
    }

    handleElementChange = async (element) => {
      await this.setState({ selectedElement: element })
      await api.get(`/element/by-label/${element}`)
        .then((res) => this.setState({ parentElements: res.data.data.parent }) )
      console.log('selected element', this.state.selectedElement)
      console.log('parents', this.state.parentElements)
    }

    handleChangeParent = async parent => {
      await this.setState({ selectedParent: parent })
      // Listar todos os elementos parentes selecionados da regra
      // criar um law_id em todos os elementos para filtrar por regra
      await api.get(`/rule/${this.props.match.params.rule}`)
        .then((res) => {
          console.log('rule', res.data.data)
        })
      console.log('selected parent', this.state.selectedParent)
    }

  render() {
    return (
        <PageBase title="Adicionar Elemento">
        <form onSubmit={this.handleSubmit}>
        <Row>
          {/* Selecionar o tipo de elemento que será criado */}
          <Col sm={6} md={6} lg={6}>
            <ElementSelect
             onElementChange={this.handleElementChange}/>
          </Col>

          {/* Selecionar onde este elemento ficará na lei */}
          <Col sm={6} md={6} lg={6}>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor="Element">Agrupar em</InputLabel>
              <Select
                value={this.state.selectedParent ? this.state.selectedParent : ''}
                onChange={(e) => this.handleChangeParent(e.target.value)}
              >
                <MenuItem value="">
                <em>Nenhum</em>
                </MenuItem>
                {this.state.parentElements.length > 0 && this.state.parentElements.map((elem, index) => {
                  return (<MenuItem value={elem} key={index}> {handleElementName(elem)} </MenuItem>);
                }) }
              </Select>
            </FormControl>
          </Col>
        </Row>
        {/* Selecionar em qual elemento da lei o elemento criado será adicionado como filho */}
        <Row>
          <Col sm={12} md={12} lg={12}>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor="Element">Selecionar agrupamento</InputLabel>
              <Select
                value={''}
              >
                <MenuItem value="">
                <em>Nenhum</em>
                </MenuItem>
                {/* {this.state.parentElements.length > 0 && this.state.parentElements.map((elem, index) => {
                  return (<MenuItem value={elem} key={index}> {handleElementName(elem)} </MenuItem>);
                }) } */}
              </Select>
            </FormControl>
          </Col>
        </Row>

        <Row>
          <Col sm={2} md={2} lg={2}>
            <TextField
              label={this.state.selectedElement === 'line' ? "Letra" : "Numeração"}
              fullWidth={true}
              margin="normal"
              type={this.state.selectedElement === 'line' ? "text" : "number"}
              value={this.state.ordering}
              onChange={(e) => this.setState({ordering: e.target.value})}
              />
          </Col>
          <Col sm={10} md={10} lg={10}>
            <TextField
              label="Nome"
              fullWidth={true}
              margin="normal"
              value={this.state.name}
              onChange={(e) => this.setState({name: e.target.value})}
              />
          </Col>
        </Row>
        <TextField
          label="Texto"
          fullWidth={true}
          margin="normal"
          multiline
          rows={3}
          value={this.state.text}
          onChange={(e) => this.setState({text: e.target.value})}
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