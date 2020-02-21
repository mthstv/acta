import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import PageBase from "../../../components/PageBase";
import styles from './styles';

import api from '../../../services/api';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as snackbarActions from '../../../_actions/snackbar'

class FormPage extends Component {
    constructor(props) {
      super(props)
    }

    state = {
      title: '',
      description: '',
      preamble: ''
    }

    handleSubmit = (e) => {
      e.preventDefault()
      this.props.snackbarActions.showSnackbar('Regra criada com sucesso');
      console.log(this.state)
    }

  render() {
    return (
        <PageBase title="Criar nova regra">
        <form onSubmit={this.handleSubmit}>
          <TextField
            label="Título *"
            fullWidth={true}
            margin="normal"
            value={this.state.title}
            onChange={(e) => this.setState({title: e.target.value})}
            />

          <TextField
            label="Descrição"
            fullWidth={true}
            margin="normal"
            multiline
            rows={2}
            value={this.state.description}
            onChange={(e) => this.setState({description: e.target.value})}
            />

          <TextField
            label="Preâmbulo"
            fullWidth={true}
            margin="normal"
            multiline
            rows={4}
            value={this.state.preamble}
            onChange={(e) => this.setState({preamble: e.target.value})}
            />

            <div style={styles.buttons}>
              <Link to="/">
                  <Button variant="contained">Cancel</Button>
              </Link>

              <Button
                style={styles.saveButton}
                variant="contained"
                type="submit"
                color="primary"
                >
                  Save
              </Button>
            </div>
        </form>
      </PageBase>
    );
  }
};

const mapStateToProps = state => ({
  user: state.user,
});

function mapDispatchToProps (dispatch) {
  return {
      snackbarActions: bindActionCreators(snackbarActions, dispatch),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(FormPage);