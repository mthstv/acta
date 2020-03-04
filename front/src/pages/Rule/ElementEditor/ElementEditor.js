import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import PageBase from "../../../components/PageBase";
import styles from "./styles";

import api from "../../../services/api";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as snackbarActions from "../../../_actions/snackbar";

import { elementToString, handleElementName } from "../../../helpers";

class ElementEditor extends Component {

    state = {
      number: "",
      letter: "",
      name: "",
      text: ""
    }

    componentDidMount() {
      // this.setState({ rule_reference: this.props.match.params.rule });
    }
 
    handleSubmit = async (e) => {
      e.preventDefault();
    }
    
    render() {
      return (
        <PageBase title="Editar Elemento">
          <form onSubmit={this.handleSubmit}>
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


export default connect(mapStateToProps, mapDispatchToProps)(ElementEditor);