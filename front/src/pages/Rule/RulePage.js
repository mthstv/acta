import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import api from "../../services/api";
import { getSingleRule } from "./components/FullRule";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";

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
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 90,
    left: "auto",
    position: "fixed",
  }
};
class RulePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorMode: false
    };
  }
  
  componentDidMount() {
    api.get(`/rule/${this.props.match.params.rule}`)
      .then((res) => {
        this.setState({ rule: res.data.data });
      })
      .catch((err) => {
        if(err.response && err.response.status === 401) {
          window.location.href = "/login";
        }
      });
  }

                    
  render() {
    const { rule } = this.state;
    return (
      rule ?
        <>
          <Row>
            <Col md={12}>
              <Card>
                <Card.Body>
                  {getSingleRule(rule)}
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Fab 
            color="primary" 
            style={styles.createFab} 
            aria-label="add"
            onClick={() => this.props.history.push(`/criar-elemento/regra/${rule.id}`)}
            title="Adicionar elemento"
          >
            <AddToPhotosIcon />
          </Fab>
          <Fab 
            color="secondary" 
            style={styles.editFab} 
            aria-label="edit"
            onClick={() => this.setState({editorMode: true})}
            title="Modo Editor"
          >
            <EditIcon />
          </Fab>
        </>
        :
        <div/>
    );
  }
}
  
export default RulePage;