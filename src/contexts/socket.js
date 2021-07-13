import React, { createContext, useContext } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addMessage } from '../store/messagesSlice';
import { addChannel, deleteChannel } from '../store/channelsSlice';

const socketContext = createContext();

function useSocketProvider() {
  const socket = io();
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

  return socket;
}

export function SocketProvider({ children }) {
  console.log('Calling SocketProvider');
  const socket = useSocketProvider();

  return (
    <socketContext.Provider value={socket}>
      {children}
    </socketContext.Provider>
  );
}

export function useSocket() {
  return useContext(socketContext);
}
