import React, { createRef } from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CreateChannelForm from './CreateChannelForm';
import { hideModal } from '../store/modalSlice';
import { DeleteConfrimationBody, DeleteConfrimationFooter } from './DeleteConfirmation';

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
      modalBodyProps: {
        newChannelInputRef,
      },
      modalFooterComponent: null,
      modalFooterProps: null,
    },
    DeleteChannelConfirmationModal: {
      modalTitle: 'Delete channel',
      modalBodyComponent: DeleteConfrimationBody,
      modalBodyProps: {},
      modalFooterComponent: DeleteConfrimationFooter,
      modalFooterProps: { ...options },
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
        <currentModal.modalBodyComponent {...currentModal.modalBodyProps} />
      </Modal.Body>
      {
        currentModal.modalFooterComponent
        && (
        <Modal.Footer>
          <currentModal.modalFooterComponent {...currentModal.modalFooterProps} />
        </Modal.Footer>
        )
      }
    </Modal>
  );
};

export default ModalContents;
