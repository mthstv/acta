import React from "react";
import HomeCard from "../components/HomeCard";
import { Row, Col } from "react-bootstrap";
import api from "../services/api";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const style = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed',
};
class RuleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    api.get('/rule')
    .then((res) => {
      this.setState({ rules: res.data.data });
    })
  }

  render() {
    // const { classes } = this.props;
    const { rules } = this.state;
    console.log(rules)
    return (
      <>
        <div>
          {rules && rules.map((item) =>
              <Row key={item.id}>
              <Col md={12}>
                <HomeCard
                  title={ item.rule_title }
                  text={ item.description }
                  linkToRedirect={`/regra/${item.id}`}
                />
              </Col>
            </Row>
          )}
        </div>
        <Fab color="primary" style={style} aria-label="add">
          <AddIcon />
        </Fab>
      </>
    );
  }
}

export default RuleList;
