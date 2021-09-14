import React, { createContext, useContext } from 'react';
import { useSelector } from 'react-redux';

const authContext = createContext();

export function AuthProvider({ children }) {
  const currentUser = useSelector((state) => state.currentUser);

  return (
    <authContext.Provider value={currentUser}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}
