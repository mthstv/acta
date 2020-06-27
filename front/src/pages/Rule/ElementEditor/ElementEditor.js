import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import PageBase from "../../../components/PageBase";
import styles from "./styles";

import api from "../../../services/api";

import { useDispatch } from "react-redux";

import { handleElementName, handleUrlTranslateElement } from "../../../helpers";
import ConfirmationModal from "../../../components/ConfirmationModal";

function ElementEditor (props) {
  const dispatch = useDispatch()
  const [element, setElement] = useState({
    number: "",
    letter: "",
    name: "",
    text: "",
    rule_reference: ""
  })

  const [modalShow, setModalShow] = useState(false)
  const [selectedElement, setSelectedElement] = useState('')

  useEffect(() => {
    const elementLabel = handleUrlTranslateElement(props.match.params.label)
    const elementId = props.match.params.element
    setSelectedElement(elementLabel)
    api.get(`/${elementLabel}/${elementId}`)
      .then((res) => {
        setElement(res.data.data)
      })
  },[props])
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    api.patch(`/${selectedElement}/${element.id}`, element)
      .then((res) => {
        props.history.push(`/regra/${element.rule_reference}`)
        dispatch({type: 'SNACKBAR_SHOW', message: `${handleElementName(selectedElement)} alterado(a) com sucesso`})
      })
  }

  const handleDeleteButton = async verification => {
    if(verification) {
      api.delete(`/${selectedElement}/${element.id}`)
        .then((res) => {
          props.history.push(`/regra/${element.rule_reference}`)
          dispatch({type: 'SNACKBAR_SHOW', message: `${handleElementName(selectedElement)} excluído(a) com sucesso`})
        })
    } else {
      setModalShow(false);
    }
  }
    
  return (
    <PageBase title={"Editar " + handleElementName(selectedElement)}>
      <ConfirmationModal
        open={modalShow}
        onClose={handleDeleteButton}
        body={`Tem certeza que deseja excluir este(a) ${handleElementName(selectedElement)}?`}
        confirmcolor="red"
      />
      <form onSubmit={handleSubmit}>
        <Row>
          <Col sm={2} md={2} lg={2}>
            {selectedElement === "line" ?
              <TextField
                label={"Letra"}
                fullWidth={true}
                margin="normal"
                type={"text"}
                value={element.letter}
                onChange={(e) => setElement({...element, letter: e.target.value})}
              />
              :
              <TextField
                label={"Numeração"}
                fullWidth={true}
                margin="normal"
                type={"number"}
                value={element.number}
                onChange={(e) => setElement({...element, number: e.target.value})}
              />
            }
          </Col>
          <Col sm={10} md={10} lg={10}>
            {["part","book","title","chapter","section","subsection"].includes(selectedElement) ?
              <TextField
                label="Nome"
                fullWidth={true}
                margin="normal"
                value={element.name}
                onChange={(e) => setElement({...element, name: e.target.value})}
              />
              :
              <TextField
                key="element-text"
                label="Texto"
                fullWidth={true}
                margin="normal"
                multiline
                rows={3}
                value={element.text}
                onChange={(e) => setElement({...element, text: e.target.value})}
              />
            }
          </Col>
        </Row>

        <div style={styles.deleteButtonDiv}>
          <Button variant="contained" style={styles.deleteButton} onClick={() => setModalShow(true)}>Excluir</Button>
        </div>
        <div style={styles.buttons}>
          <Link to={`/regra/${element.rule_reference}`}>
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

export default ElementEditor;