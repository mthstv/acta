import React, { Component } from "react";
import RuleCard from "./components/RuleCard";
import { Row, Col } from "react-bootstrap";
import api from "../../services/api";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as snackbarActions from '../../_actions/snackbar'

const styles = {
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  }
};
class RuleList extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.getRules()
  }

  getRules = () => {
    api.get('/rule')
    .then((res) => {
      this.setState({ rules: res.data.data });
    })
    .catch((err) => {
      if(err.response.status === 401) {
        window.location.href = '/login'
      }
    })
  }

  /**
   * Receives roleID from child to delete 
   */
  handleDelete = async (ruleID) => {
   api.delete(`/rule/${ruleID}`)
    .then((res) => {
      this.props.snackbarActions.showSnackbar('Regra excluída com sucesso')
      this.getRules()
    })
    .catch((err) => {
      this.props.snackbarActions.showSnackbar('Houve um problema ao realizar esta ação')
    })
  }

  render() {
    // const { classes } = this.props;
    const { rules } = this.state;
    return (
      <>
        <div>
          {rules && rules.map((item) =>
              <Row key={item.id}>
              <Col md={12}>
                <RuleCard
                  history={this.props.history}
                  title={ item.rule_title }
                  text={ item.description }
                  ruleId={item.id}
                  handleDelete={this.handleDelete}
                />
              </Col>
            </Row>
            )}
          {rules && rules.length === 0 ?
            <div style={{textAlign: 'center', color: 'white'}}>
              Nenhuma regra encontrada
            </div>
          :''}
        </div>
        <Fab 
          color="primary" 
          style={styles.fab} 
          aria-label="add"
          onClick={() => this.props.history.push('/criar-regra')}
          >
          <AddIcon />
        </Fab>
      </>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    snackbarActions: bindActionCreators(snackbarActions, dispatch),
  }
}


export default connect(null, mapDispatchToProps)(RuleList);