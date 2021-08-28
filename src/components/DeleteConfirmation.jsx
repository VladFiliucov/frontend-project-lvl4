import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useSocket } from '../contexts/socket';
import { hideModal } from '../store/modalSlice';

export const DeleteConfrimationBody = () => {
  const { t } = useTranslation();

  return (
    <p>{t('modals.deleteConfirmation.confirmationMessage')}</p>
  );
};

export const DeleteConfrimationFooter = ({ channel }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
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
        {t('modals.deleteConfirmation.actions.cancel')}
      </Button>
      <Button variant="primary" onClick={handleConfirmDeletion}>
        {t('modals.deleteConfirmation.actions.submit')}
      </Button>
    </>
  );
};
