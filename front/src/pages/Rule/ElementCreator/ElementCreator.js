import React, { useState } from "react";
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

import { useDispatch } from "react-redux";

import ElementSelect from "./components/ElementSelect";
import { elementToString, handleElementName } from "../../../helpers";

function ElementCreator (props) {
  const dispatch = useDispatch()
  const [element, setElement] = useState({
    number: "",
    letter: "",
    name: "",
    text: "",
    rule_reference: props.match.params.rule,
  })

  const [selectedElement, setSelectedElement] = useState("")
  const [parentElements, setParentElements] = useState([])
  const [selectedParent, setSelectedParent] = useState("")
  const [availableParents, setAvailableParents] = useState([])
  const [selectedAvailableParent, setSelectedAvailableParent] = useState("")
  const [parentsEmpty, setParentsEmpty] = useState(false)

  const handleElementChange = async (elementSelect) => {
    await setSelectedElement(elementSelect)
    await setSelectedParent("")
    await setSelectedAvailableParent("")
    
    await api.get(`/element/by-label/${elementSelect}`)
      .then((res) => setParentElements(res.data.data.parent))
    // Limpando a lista de parentes ao alterar o elemento
  }
  
  const handleChangeParent = async parent => {
    await setSelectedParent(parent)
    await setParentsEmpty(false)
    await setSelectedAvailableParent("")
    // Se a referencia retornar vazia, é porque não há nenhum pai para agrupar o elemento, exibir uma mensagem vermelha
    // para adicionar o pai antes do filho
    await api.get(`/${parent}?rule_reference=${props.match.params.rule}`)
      .then((res) => {
        setAvailableParents(res.data.data)
          if(res.data.data.length === 0) {
            setParentsEmpty(true)
          }
      })
    
  }
    
  const handleChangeAvailableParent = (parentElementId) => {
    setSelectedAvailableParent(parentElementId)
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    let elementData = element;
    // If is adding to the own rule
    if(selectedParent === "rule") {
      elementData["rule"] = element.rule_reference;
    } else {
      elementData[`${selectedParent}`] = selectedAvailableParent;
    }
    await api.post(`/${selectedElement}`, elementData)
      .then((res) => {
        dispatch({type: 'SNACKBAR_SHOW', message: `${handleElementName(selectedElement)} adicionado(a) com sucesso`})
        props.history.push(`/regra/${element.rule_reference}`);
      });
  }
    
  return (
    <PageBase title="Adicionar Elemento">
      <form onSubmit={handleSubmit}>
        <Row>
          {/* Selecionar o tipo de elemento que será criado */}
          <Col sm={6} md={6} lg={6}>
            <ElementSelect
              onElementChange={handleElementChange}/>
          </Col>

          {/* Selecionar onde este elemento ficará na lei */}
          <Col sm={6} md={6} lg={6}>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor="Element">Agrupar em</InputLabel>
              <Select
                value={selectedParent ? selectedParent : ""}
                onChange={(e) => handleChangeParent(e.target.value)}
              >
                <MenuItem value="">
                  <em>Nenhum</em>
                </MenuItem>
                {parentElements.length > 0 && parentElements.map((elem, index) => {
                  return (<MenuItem value={elem} key={index}> {handleElementName(elem)} </MenuItem>);
                }) }
              </Select>
            </FormControl>
          </Col>

        </Row>
        {/* Se o elemento for adicionado a própria lei, não há elemento para agrupar */}
        {selectedParent !== "rule" && 
      <Row>
        {/* Selecionar em qual elemento da lei o elemento criado será adicionado como filho */}
        <Col sm={12} md={12} lg={12}>
          <FormControl
            error={parentsEmpty}
            fullWidth={true}>
            <InputLabel htmlFor="Element">Selecionar agrupamento</InputLabel>
            <Select
              value={selectedAvailableParent ? selectedAvailableParent : ""}
              onChange={(e) => handleChangeAvailableParent(e.target.value)}
            >
              <MenuItem value="">
                <em>Nenhum</em>
              </MenuItem>
              {availableParents.length > 0 && availableParents.map((elem, index) => {
                return (<MenuItem value={elem.id} key={index}> { elementToString(selectedParent, elem) }</MenuItem>);
              }) }
            </Select>
            {parentsEmpty && <FormHelperText>Nenhum(a) {handleElementName(selectedParent)} disponível</FormHelperText>}
          </FormControl>
        </Col>
      </Row>
        }

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
            Criar
          </Button>
        </div>
      </form>
    </PageBase>
  );
};

export default ElementCreator;