import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSocket } from '../contexts/socket';
import { hideModal } from '../store/modalSlice';

export const DeleteConfrimationBody = () => <p>Are you sure!?</p>;

export const DeleteConfrimationFooter = ({ channel }) => {
  const dispatch = useDispatch();
  const { removeChannel } = useSocket();
  const handleClose = () => dispatch(hideModal());

  const handleConfirmDeletion = () => {
    removeChannel({ id: channel.id }, (response) => {
      const { status } = response;
      if (status === 'ok') {
        handleClose();
      }
      // TODO: if error - handle
    });
  };

  return (
    <>
      <Button variant="secondary" onClick={handleClose}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleConfirmDeletion}>
        Delete
      </Button>
    </>
  );
};
