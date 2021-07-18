import React, { createRef } from 'react';
import { useSelector } from 'react-redux';
import CreateChannel from './CreateChannel';

const ModalContents = () => {
  const newChannelInputRef = createRef(null);
  const modalOpened = useSelector((state) => state.modal.isOpened);

  return <CreateChannel newChannelInputRef={newChannelInputRef} isOpened={modalOpened} />;
};

const Modal = () => (
  <ModalContents />
);

export default Modal;
