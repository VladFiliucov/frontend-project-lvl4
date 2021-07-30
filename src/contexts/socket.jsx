import React, { createContext, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../store/messagesSlice';
import { addChannel, deleteChannel, renameChannel } from '../store/channelsSlice';

const socketContext = createContext();

export function SocketProvider({ children, listeners, emitters }) {
  const dispatch = useDispatch();

  const {
    onNewMessage, onNewChannel, onRemoveChannel, onRenameChannel,
  } = listeners;

  onNewMessage((newMessage) => {
    dispatch(addMessage(newMessage));
  });

  onNewChannel((newChannel) => {
    dispatch(addChannel(newChannel));
  });

  onRemoveChannel(({ id }) => {
    dispatch(deleteChannel(id));
  });

  onRenameChannel((channel) => {
    dispatch(renameChannel(channel));
  });

  return (
    <socketContext.Provider value={emitters}>
      {children}
    </socketContext.Provider>
  );
}

export function useSocket() {
  return useContext(socketContext);
}
