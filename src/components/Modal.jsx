import React, { createRef } from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CreateChannelForm from './CreateChannelForm';
import { hideModal } from '../store/modalSlice';
import { DeleteConfrimationBody, DeleteConfrimationFooter } from './DeleteConfirmation';
import RenameChannelForm from './RenameChannelForm';

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
      modalTitle: t('modals.deleteConfirmation.title'),
      modalBodyComponent: DeleteConfrimationBody,
      modalBodyProps: {},
      modalFooterComponent: DeleteConfrimationFooter,
      modalFooterProps: { ...options },
    },
    RenameChannelModal: {
      modalTitle: t('modals.renameChannel.title'),
      modalBodyComponent: RenameChannelForm,
      modalBodyProps: { ...options },
      modalFooterComponent: null,
      modalFooterProps: null,
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
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <currentModal.modalBodyComponent {...currentModal.modalBodyProps} />
      </Modal.Body>
      {
        currentModal.modalFooterComponent
        && (
        <Modal.Footer>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <currentModal.modalFooterComponent {...currentModal.modalFooterProps} />
        </Modal.Footer>
        )
      }
    </Modal>
  );
};

export default ModalContents;
