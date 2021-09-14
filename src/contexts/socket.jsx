import React, { createContext, useContext } from 'react';

const socketContext = createContext();

export function SocketProvider({ children, eventEmitters }) {
  return (
    <socketContext.Provider value={eventEmitters}>
      {children}
    </socketContext.Provider>
  );
}

export function useSocket() {
  return useContext(socketContext);
}
