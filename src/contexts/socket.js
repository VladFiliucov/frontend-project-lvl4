import React, { createContext, useContext } from 'react';
import { io } from 'socket.io-client';

const socketContext = createContext();

function useSocketProvider() {
  console.log('Calling useSocketProvider');
  const socket = io();

  socket.on('newMessage', function(msg) {
    console.log('catching', msg)
    // dispatch and action in RTK to append new message
    // handle slow network in function submission
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
