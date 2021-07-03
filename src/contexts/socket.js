import React, { createContext, useContext } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addMessage } from '../store/messagesSlice';

const socketContext = createContext();

function useSocketProvider() {
  console.log('Calling useSocketProvider');
  const socket = io();
  const dispatch = useDispatch();

  socket.on('newMessage', (msg) => {
    dispatch(addMessage(msg));
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
  console.log('Calling useSocket');
  return useContext(socketContext);
}
