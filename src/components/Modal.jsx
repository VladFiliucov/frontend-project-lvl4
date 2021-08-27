import React, { createRef } from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CreateChannelForm from './CreateChannelForm';
import { hideModal } from '../store/modalSlice';

const ModalContents = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const newChannelInputRef = createRef(null);
  const { isOpened, type, options } = useSelector((state) => state.modal);

  const handleClose = () => {
    dispatch(hideModal());
  };

  const modals = {
    NewChannelModal: {
      modalTitle: t('chatPage.form.title'),
      modalBodyComponent: CreateChannelForm,
      modalProps: {
        newChannelInputRef,
      },
    },
  };

  const currentModal = modals[type];

  if (!currentModal) return null;

  return (
    <Modal show={isOpened} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{currentModal.modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <currentModal.modalBodyComponent {...currentModal.modalProps} />
      </Modal.Body>
    </Modal>
  );
};

export default ModalContents;
