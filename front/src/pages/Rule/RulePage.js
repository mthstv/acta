import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import api from "../../services/api";
import { GetSingleRule } from "./components/FullSingleRule/FullSingleRule";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import Zoom from '@material-ui/core/Zoom';
import { useDispatch } from "react-redux";
import { handleUrlTranslateElement } from '../../helpers'

const styles = {
  createFab: {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  },
  editFab: {
    display: 'flex',
    margin: 0,
    top: "auto",
    right: 28,
    bottom: 90,
    left: "auto",
    position: "fixed",
  }
};

function RulePage (props) {
  const dispatch = useDispatch()
  const [rule, setRule] = useState(null)
  const [editorMode, setEditorMode] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [searchElement, setSearchElement] = useState(null)
  
  useEffect(() => {
    api.get(`/rule/${props.match.params.rule}`)
      .then((res) => {
        setRule(res.data.data)
        setLoaded(true)
      })
      .catch((err) => {
        if(err.response && err.response.status === 404) {
          props.history.push('/erro/404');
        }
      });

      if(props.match.params.elementlabel && props.match.params.elementid) {
        setSearchElement({
          label: handleUrlTranslateElement(props.match.params.elementlabel),
          id: props.match.params.elementid
        })
      }
  },[props.match.params, props.match.url, props.history])

  const handleEditorClick = () => {
    dispatch({type: 'SNACKBAR_SHOW', message: editorMode ? 'Modo editor desativado' : 'Modo editor ativado, selecione um elemento para editá-lo.'})
    setEditorMode(!editorMode)
  }

  return (
    rule ?
      <>
        <Zoom in={loaded}>
          <Row>
            <Col md={12}>
              <Card>
                <Card.Body>
                    <GetSingleRule 
                      rule={rule} 
                      editorMode={editorMode} 
                      history={props.history}
                      match={props.match}
                      searchElement={searchElement}/>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Zoom>
        <Fab 
          color="primary" 
          style={styles.createFab} 
          aria-label="add"
          onClick={() => props.history.push(`/criar-elemento/regra/${rule.id}`)}
          title="Adicionar elemento"
        >
          <AddToPhotosIcon />
        </Fab>
        <Fab 
          color="secondary" 
          size="small"
          style={styles.editFab} 
          aria-label="edit"
          onClick={handleEditorClick}
          title={editorMode  ? "Desativar Modo Editor" : " Ativar Modo Editor"}
          className={editorMode ? "pulse-button" : null}
        >
          <EditIcon />
        </Fab>
      </>
      :
      <div/>
  );
}

export default RulePage;