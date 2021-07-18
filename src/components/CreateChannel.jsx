import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import CreateChannelForm from './CreateChannelForm';
import { toggleModal } from '../store/modalSlice';

const CreateChannel = ({ newChannelInputRef, isOpened }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleModal());
  };

  return (
    <Modal show={isOpened} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('chatPage.form.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateChannelForm newChannelInputRef={newChannelInputRef} />
      </Modal.Body>
    </Modal>
  );
};

export default CreateChannel;
