import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import api from "../../services/api";
import { getSingleRule } from './components/FullRule'

class RulePage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
  
    componentDidMount() {
      api.get(`/rule/${this.props.match.params.rule}`)
      .then((res) => {
        this.setState({ rule: res.data.data });
      })
    }

                    
    render() {
      const { rule } = this.state;
      console.log(rule)
      return (
        rule ?
          <Row>
            <Col md={12}>
              <Card>
                <Card.Body>
                  {getSingleRule(rule)}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        :
        <div/>
      );
    }
  }
  
  export default RulePage;