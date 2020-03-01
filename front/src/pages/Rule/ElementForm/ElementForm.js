import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";

import PageBase from "../../../components/PageBase";
import styles from "./styles";

import api from "../../../services/api";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as snackbarActions from "../../../_actions/snackbar";

import ElementSelect from "./components/ElementSelect";
import { elementToString, handleElementName } from "../../../helpers";
class ElementForm extends Component {

    state = {
      number: "",
      letter: "",
      name: "",
      text: "",
      rule_reference: "",

      selectedElement: "",
      parentElements: [],
      selectedParent: "",
      availableParents: [],
      selectedAvailableParent: "",
      parentsEmpty: false 
    }

    componentDidMount() {
      this.setState({ rule_reference: this.props.match.params.rule });
    }

    
    handleElementChange = async (element) => {
      await this.setState({ selectedElement: element });
      await this.setState({ selectedParent: "" });
      await this.setState({ selectedAvailableParent: "" });
      
      await api.get(`/element/by-label/${element}`)
        .then((res) => this.setState({ parentElements: res.data.data.parent }) );
      // Limpando a lista de parentes ao alterar o elemento
    }
    
    handleChangeParent = async parent => {
      await this.setState({ selectedParent: parent });
      await this.setState({parentsEmpty: false});
      await this.setState({ selectedAvailableParent: "" });
      // Se a referencia retornar vazia, é porque não há nenhum pai para agrupar o elemento, exibir uma mensagem vermelha
      // para adicionar o pai antes do filho
      await api.get(`/${this.state.selectedParent}?rule_reference=${this.props.match.params.rule}`)
        .then((res) => this.setState({availableParents: res.data.data}));
      
      if(this.state.availableParents.length === 0) {
        this.setState({parentsEmpty: true});
      }
    }
    
    handleChangeAvailableParent = (parentElementId) => {
      this.setState({ selectedAvailableParent: parentElementId });
    }
 
    handleSubmit = async (e) => {
      e.preventDefault();
      let elementData = this.state;
      // If is adding to the own rule
      if(this.state.selectedParent === "rule") {
        elementData["rule"] = this.state.rule_reference;
      } else {
        elementData[`${this.state.selectedParent}`] = this.state.selectedAvailableParent;
      }
      await api.post(`/${this.state.selectedElement}`, elementData)
        .then((res) => {
          this.props.snackbarActions.showSnackbar(`${handleElementName(this.state.selectedElement)} adicionado com sucesso`);
          this.props.history.push(`/regra/${this.state.rule_reference}`);
        });
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
                    value={this.state.selectedParent ? this.state.selectedParent : ""}
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
            {/* Se o elemento for adicionado a própria lei, não há elemento para agrupar */}
            {this.state.selectedParent !== "rule" && 
          <Row>
            {/* Selecionar em qual elemento da lei o elemento criado será adicionado como filho */}
            <Col sm={12} md={12} lg={12}>
              <FormControl
                error={this.state.parentsEmpty}
                fullWidth={true}>
                <InputLabel htmlFor="Element">Selecionar agrupamento</InputLabel>
                <Select
                  value={this.state.selectedAvailableParent ? this.state.selectedAvailableParent : ""}
                  onChange={(e) => this.handleChangeAvailableParent(e.target.value)}
                >
                  <MenuItem value="">
                    <em>Nenhum</em>
                  </MenuItem>
                  {this.state.availableParents.length > 0 && this.state.availableParents.map((elem, index) => {
                    return (<MenuItem value={elem.id} key={index}> { elementToString(this.state.selectedParent, elem) }</MenuItem>);
                  }) }
                </Select>
                {this.state.parentsEmpty && <FormHelperText>Nenhum(a) {handleElementName(this.state.selectedParent)} disponível</FormHelperText>}
              </FormControl>
            </Col>
          </Row>
            }

            <Row>
              <Col sm={2} md={2} lg={2}>
                {this.state.selectedElement === "line" ?
                  <TextField
                    label={"Letra"}
                    fullWidth={true}
                    margin="normal"
                    type={"text"}
                    value={this.state.letter}
                    onChange={(e) => this.setState({letter: e.target.value})}
                  />
                  :
                  <TextField
                    label={"Numeração"}
                    fullWidth={true}
                    margin="normal"
                    type={"number"}
                    value={this.state.number}
                    onChange={(e) => this.setState({number: e.target.value})}
                  />
                }
              </Col>
              <Col sm={10} md={10} lg={10}>
                {["part","book","title","chapter","section","subsection"].includes(this.state.selectedElement) ?
                  <TextField
                    label="Nome"
                    fullWidth={true}
                    margin="normal"
                    value={this.state.name}
                    onChange={(e) => this.setState({name: e.target.value})}
                  />
                  :
                  <TextField
                    key="element-text"
                    label="Texto"
                    fullWidth={true}
                    margin="normal"
                    multiline
                    rows={3}
                    value={this.state.text}
                    onChange={(e) => this.setState({text: e.target.value})}
                  />
                }
              </Col>
            </Row>

            <div style={styles.buttons}>
              <Link to={`/regra/${this.state.rule_reference}`}>
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
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ElementForm);