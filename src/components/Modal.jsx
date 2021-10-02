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
  const { isOpened, type: modalType, channelId } = useSelector((state) => state.modal);

  const handleClose = () => {
    dispatch(hideModal());
  };

  if (modalType === 'NewChannelModal') {
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
  }

  if (modalType === 'DeleteChannelConfirmationModal') {
    return (
      <Modal show={isOpened} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modals.deleteConfirmation.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeleteConfrimationBody />
        </Modal.Body>
        <Modal.Footer>
          <DeleteConfrimationFooter channelId={channelId} />
        </Modal.Footer>
      </Modal>
    );
  }

  if (modalType === 'RenameChannelModal') {
    return (
      <Modal show={isOpened} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modals.renameChannel.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RenameChannelForm channelId={channelId} />
        </Modal.Body>
      </Modal>
    );
  }

  return null;
};

export default ModalContents;
