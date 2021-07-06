import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { store } from '../store';

const ModalContents = () => {
  const newMessages = useSelector((state) => {
    return state.messages
  });

  return (
    <div>
      {newMessages.map((message) => (
        <p>{message.msg}</p>
      ))}
    </div>
  );
};

const ChannelModal = () => (
  <Provider store={store}>
    <ModalContents />
  </Provider>
);

export default ChannelModal;
