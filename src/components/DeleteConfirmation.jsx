import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSocket } from '../contexts/socket';

const DeleteConfrimation = ({ channel, show, toggleConfirmation }) => {
  const socket = useSocket();
  const handleClose = () => toggleConfirmation(false);

  const handleConfirmDeletion = () => {
    socket.emit('removeChannel', { id: channel.id }, (response) => {
      const { status } = response;
      if (status === 'ok') {
        // deletion is happening in socket provider. What should I do here?
        // dispatch(deleteChannel(channel.id));
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
