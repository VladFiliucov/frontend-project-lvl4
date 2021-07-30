import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSocket } from '../contexts/socket';

const DeleteConfrimation = ({ channel, show, toggleConfirmation }) => {
  const { removeChannel } = useSocket();
  const handleClose = () => toggleConfirmation(false);

  const handleConfirmDeletion = () => {
    removeChannel({ id: channel.id }, (response) => {
      const { status } = response;
      if (status === 'ok') {
        // TODO: Any UI/UX changes?
      }
      // TODO: if error - handle
    });
  };

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
          <Button variant="primary" onClick={handleConfirmDeletion}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteConfrimation;
