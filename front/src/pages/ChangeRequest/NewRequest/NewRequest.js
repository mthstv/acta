import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import PageBase from "../../../components/PageBase";
import styles from "./styles";

import api from "../../../services/api";

import { useDispatch, useSelector } from "react-redux";

import { handleUrlTranslateElement, elementToTitle } from "../../../helpers";

function NewRequest (props) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const [request, setRequest] = useState({
    consultant: null,
    element_name: "",
    element_id: "",
    rule_reference: null,
    old_text: "",
    new_text: ""
  })

  const [element, setElement] = useState({
    number: "",
    letter: "",
    name: "",
    text: "",
    rule_reference: ""
  })

  const [selectedElement, setSelectedElement] = useState('')

  useEffect(() => {
    const elementLabel = handleUrlTranslateElement(props.match.params.label)
    const elementId = props.match.params.element
    setSelectedElement(elementLabel)
    api.get(`/${elementLabel}/${elementId}`)
      .then((res) => {
        let newRequest = {
            consultant: user.id,
            element_name: elementLabel,
            element_id: elementId,
            rule_reference: res.data.data.rule_reference,
            old_text: res.data.data.name ? res.data.data.name : res.data.data.text,
            new_text: res.data.data.name ? res.data.data.name : res.data.data.text
        }
        setElement(res.data.data)
        setRequest(newRequest)
      })
  },[props])
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    api.post(`/change-request`, request)
      .then((res) => {
        props.history.push(`/regra/${element.rule_reference}`)
        dispatch({type: 'SNACKBAR_SHOW', message: `Solicitação gerada com sucesso`})
      })
  }
    
  return (
    <PageBase title={"Nova solicitação de alteração: " + elementToTitle(selectedElement, element)}>
      <form onSubmit={handleSubmit}>
        <Row>
          <Col sm={12} md={12} lg={12}>
            {["part","book","title","chapter","section","subsection"].includes(selectedElement) ?
              <TextField
                label="Nome"
                fullWidth={true}
                margin="normal"
                value={request.new_text}
                onChange={(e) => setRequest({...request, new_text: e.target.value})}
              />
              :
              <TextField
                key="element-text"
                label="Texto"
                fullWidth={true}
                margin="normal"
                multiline
                rows={3}
                value={request.new_text}
                onChange={(e) => setRequest({...request, new_text: e.target.value})}
              />
            }
          </Col>
        </Row>
        <div style={styles.buttons}>
          <Link to={`/regra/${request.rule_reference}`}>
            <Button variant="contained">Cancelar</Button>
          </Link>

          <Button
            style={styles.saveButton}
            variant="contained"
            type="submit"
            color="primary"
            disabled={request.old_text === request.new_text}
          >
            Salvar
          </Button>
        </div>
      </form>
    </PageBase>
  );
};

export default NewRequest;