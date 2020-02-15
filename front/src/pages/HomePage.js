import React from "react";
import HomeCard from "../components/HomeCard";
import { Row, Col } from "react-bootstrap";
import api from "../services/api";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

class HomePage extends React.Component {
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
                  title={ item.description }
                  text={ item.preamble }
                  linkToRedirect={`/regra/${item.id}`}
                />
              </Col>
            </Row>
          )}
        </div>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </>
    );
  }
}

export default HomePage;
