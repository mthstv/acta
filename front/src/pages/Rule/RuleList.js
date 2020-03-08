import React, { useState, useEffect } from "react";
import RuleCard from "./components/RuleCard";
import { Row, Col } from "react-bootstrap";
import api from "../../services/api";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Fade from '@material-ui/core/Fade';

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as snackbarActions from "../../_actions/snackbar";

const styles = {
  fab: {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  }
};
function RuleList (props) {

  const [rules, setRules] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    getRules();
  },[])

  const getRules = () => {
    api.get("/rule")
      .then(async (res) => {
        await setRules(res.data.data)
        await setLoaded(true)
      })
      .catch((err) => {
        if(err.response.status === 401) {
          window.location.href = "/login";
        }
      });
  }

  /**
   * Receives roleID from child to delete 
   */
  const handleDelete = async (ruleID) => {
    api.delete(`/rule/${ruleID}`)
      .then((res) => {
        props.snackbarActions.showSnackbar("Regra excluída com sucesso");
        getRules();
      })
      .catch((err) => {
        props.snackbarActions.showSnackbar("Houve um problema ao realizar esta ação");
      });
  }
  return (
    <>
      <div>
        {rules.length > 0 && rules.map((item, index) =>
          <Row key={item.id}>
            <Col md={12}>
            <Fade 
              in={loaded}
              style={{ transformOrigin: '0 0 0' }}
              {...(loaded ? { timeout: (1000 * (index + 0.5))  } : {})}>
              <div>
                <RuleCard
                  history={props.history}
                  title={ item.rule_title }
                  text={ item.description }
                  ruleId={item.id}
                  handleDelete={handleDelete}
                />
              </div>
            </Fade>
            </Col>
          </Row>
        )}
        {loaded && rules.length === 0 ?
          <div style={{textAlign: "center", color: "white"}}>
            Nenhuma regra encontrada
          </div>
          :""}
      </div>
      <Fab 
        color="primary" 
        style={styles.fab} 
        aria-label="add"
        onClick={() => props.history.push("/criar-regra")}
        title="Adicionar regra"
      >
        <AddIcon />
      </Fab>
    </>
  );
}

function mapDispatchToProps (dispatch) {
  return {
    snackbarActions: bindActionCreators(snackbarActions, dispatch),
  };
}


export default connect(null, mapDispatchToProps)(RuleList);