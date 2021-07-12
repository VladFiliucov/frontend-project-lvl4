import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const DeleteConfrimation = ({ channel, show, toggleConfirmation }) => {
  const handleClose = () => toggleConfirmation(false);
  const handleShow = () => toggleConfirmation(true);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure!?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteConfrimation;
