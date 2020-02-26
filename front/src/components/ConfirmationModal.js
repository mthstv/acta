import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from "@material-ui/core/Button";

export default function ConfirmationModal(props) {
  const styles = {
    buttons: {
      marginTop: 30,
      float: "right"
    },
    saveButton: {
      marginLeft: 10
    },
    customColorButton: {
      marginLeft: 10,
      backgroundColor: props.confirmcolor
    }
  };

  return (
    <Modal
      {...props}
      // { onHide, title, body, confirmcolor, confirmtext }
      size="md"
      aria-labelledby="contained-modal"
      style={{zIndex: 99999}}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal">
          { props.title ? props.title : 'Confirmação' }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
        { props.body ? props.body : 'Tem certeza que deseja fazer isso?' }
        </p>
      </Modal.Body>
      <Modal.Footer>
        <div style={styles.buttons}>
          <Button variant="contained" onClick={() => props.onHide(false)}>Cancelar</Button>
          <Button
            style={props.confirmcolor ? styles.customColorButton : styles.saveButton}
            variant="contained"
            type="submit"
            color="primary"
            onClick={() => props.onHide(true)}
            >
            { props.confirmtext ? props.confirmtext : 'Confirmar' }
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}