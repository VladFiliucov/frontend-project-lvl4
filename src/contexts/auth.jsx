import React, { createContext, useContext, useState } from 'react';

const authContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = window.localStorage.getItem('currentUser');

    if (savedUser) return JSON.parse(savedUser);

    return null;
  });

  const logoutCurrentUser = () => {
    window.localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  const loginCurrentUser = (user) => {
    window.localStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentUser(user);
  };

  return (
    <authContext.Provider value={{ currentUser, logoutCurrentUser, loginCurrentUser }}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}
