import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import useToken from './useToken.js';

const authContext = createContext();

const signInUser = (formData) => axios({
  method: 'post',
  headers: { 'content-type': 'application/json' },
  url: '/api/v1/login',
  validateStatus: (status) => [200, 401].includes(status),
  data: formData,
});

const signUpUser = (formData) => axios({
  method: 'post',
  headers: { 'content-type': 'application/json' },
  url: '/api/v1/signup',
  validateStatus: (status) => [201, 409].includes(status),
  data: formData,
});

const fakeAuth = {
  isAuthenticated: false,
  signin(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signup(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const { saveToken, getCurrentUser, logoutCurrentUser } = useToken();

  const signin = (creds, successCb, unauthorizedCb) => fakeAuth.signin(() => {
    signInUser(creds).then(({ status, data }) => {
      switch (status) {
        case 200:
          setUser(data);
          saveToken(data);
          successCb();
          break;
        case 401:
          unauthorizedCb();
          break;
        default:
          throw 'Oups';
      }
    }).catch(() => {
      console.log('Handle network errors here');
    });
  });

  const signup = (creds, successCb, confictCb) => fakeAuth.signup(() => {
    signUpUser(creds).then(({ status, data }) => {
      switch (status) {
        case 201:
          setUser(data);
          saveToken(data);
          successCb();
          break;
        case 409:
          confictCb();
          break;
        default:
          throw 'Oups';
      }
    }).catch((e) => {
      console.log('Handle network errors here', e);
    });
  });

  const signout = (cb) => fakeAuth.signout(() => {
    setUser(null);
    logoutCurrentUser();
    cb();
  });

  return {
    user,
    getCurrentUser,
    signin,
    signup,
    signout,
  };
}

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}
