import React, { createContext, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../store/messagesSlice';
import { addChannel, deleteChannel, renameChannel } from '../store/channelsSlice';

const socketContext = createContext();

function useSocketProvider(socketClient) {
  const socket = socketClient;
  const dispatch = useDispatch();

  socket.on('newMessage', (msg) => {
    dispatch(addMessage(msg));
  });

  socket.on('newChannel', (channel) => {
    dispatch(addChannel(channel));
  });

  socket.on('removeChannel', ({ id }) => {
    dispatch(deleteChannel(id));
  });

  socket.on('renameChannel', (channel) => {
    dispatch(renameChannel(channel));
  });

  return socket;
}

export function SocketProvider({ children, socketClient }) {
  const socket = useSocketProvider(socketClient);

  return (
    <socketContext.Provider value={socket}>
      {children}
    </socketContext.Provider>
  );
}

export function useSocket() {
  return useContext(socketContext);
}
