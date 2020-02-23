import React from "react";
import RuleCard from "../../components/RuleCard";
import { Row, Col } from "react-bootstrap";
import api from "../../services/api";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

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
class RuleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    api.get('/rule')
    .then((res) => {
      this.setState({ rules: res.data.data });
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
                />
              </Col>
            </Row>
          )}
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

export default RuleList;
