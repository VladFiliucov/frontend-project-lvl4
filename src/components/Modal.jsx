import React, {createRef} from 'react';
import { Provider, useSelector } from 'react-redux';
import { SocketProvider } from '../contexts/socket.js';
import { store } from '../store';
import CreateChannel from './CreateChannel';

const toggleOverlay = (show) => {
  const bodyTag = document.body;

  if (show) {
    bodyTag.classList.add('bg-light', 'modal-open');
    bodyTag.setAttribute('style', 'overflow: hidden;');
    return;
  }
  bodyTag.classList.remove('bg-light', 'modal-open');
  bodyTag.removeAttribute('style');
};

const ModalContents = () => {
  const newChannelInputRef = createRef(null);

  const modalOpened = useSelector((state) => {
    const { isOpened } = state.modal;

    toggleOverlay(isOpened);

    return isOpened;
  });

  if (!modalOpened) return null;

  return (
    <div>
      <CreateChannel newChannelInputRef={newChannelInputRef} />
    </div>
  );
};

const Modal = () => (
  <Provider store={store}>
    <SocketProvider>
      <ModalContents />
    </SocketProvider>
  </Provider>
);

export default Modal;
