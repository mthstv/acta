import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import PageBase from "../../../components/PageBase";
import styles from "./styles";

import api from "../../../services/api";

import { useDispatch } from "react-redux";

function RuleCreator (props) {
  const dispatch = useDispatch()
  const [rule, setRule] = useState({
    rule_title: "",
    description: "",
    preamble: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/rule", rule)
      .then((res) =>{
        dispatch({type: 'SNACKBAR_SHOW', message: "Registro criada com sucesso"})
        props.history.push("/");
      })
  }

  return (
    <PageBase title="Criar nova regra">
      <form onSubmit={handleSubmit}>
        <TextField
          label="Título"
          fullWidth={true}
          margin="normal"
          required
          value={rule.rule_title}
          onChange={(e) => setRule({...rule, rule_title: e.target.value})}
        />

        <TextField
          label="Descrição"
          fullWidth={true}
          margin="normal"
          required
          multiline
          rows={2}
          value={rule.description}
          onChange={(e) => setRule({...rule, description: e.target.value})}
        />

        <TextField
          label="Preâmbulo"
          fullWidth={true}
          margin="normal"
          multiline
          rows={4}
          value={rule.preamble}
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
};

export default RuleCreator;