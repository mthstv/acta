import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import PageBase from "../../../components/PageBase";
import styles from "./styles";

import api from "../../../services/api";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as snackbarActions from "../../../_actions/snackbar";

function RuleEditor (props) {

  const [rule, setRule] = useState({
    rule_title: "",
    description: "",
    preamble: ""
  })
  const [ruleId, setRuleId] = useState(props.match.params.rule)
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await api.patch(`/rule/${ruleId}`, rule)
    .then((res) =>{
      props.snackbarActions.showSnackbar("Registro alterado com sucesso");
      props.history.push("/");
    })
    .catch((err) => {
      if(err.response.status === 401) {
        window.location.href = "/login";
      }
    });
  }

  useEffect(() => {
    setRuleId(props.match.params.rule)

    api.get(`/rule/${ruleId}`)
    .then((res) => { 
      setRule(res.data.data)
    })
    .catch((err) => {
      if(err.response.status === 401) {
        window.location.href = "/login";
      }
    });
    document.title = `ACTA - Editar Regra`;
  }, [props, ruleId])
  
  // useEffect(() => {getRuleData()})
  return (
    <PageBase title="Criar nova regra">
      <form onSubmit={handleSubmit}>
        <TextField
          label="Título *"
          fullWidth={true}
          margin="normal"
          value={rule.rule_title}
          onChange={(e) => setRule({...rule, rule_title: e.target.value})}
        />

        <TextField
          label="Descrição"
          fullWidth={true}
          margin="normal"
          multiline
          rows={2}
          value={rule.description ? rule.description : ""}
          onChange={(e) => setRule({...rule, description: e.target.value})}
        />

        <TextField
          label="Preâmbulo"
          fullWidth={true}
          margin="normal"
          multiline
          rows={4}
          value={rule.preamble ? rule.preamble : ""}
          onChange={(e) => setRule({...rule, preamble: e.target.value})}
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
        </div>
      </form>
    </PageBase>
  );
};

const mapStateToProps = state => ({
  user: state.user,
});

function mapDispatchToProps (dispatch) {
  return {
    snackbarActions: bindActionCreators(snackbarActions, dispatch),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(RuleEditor);