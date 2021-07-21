import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { useRollbar } from '@rollbar/react';
import { API_LOGIN_ENDPOINT, API_SIGNUP_ENDPOINT } from '../constants';
import tokenHelpers from '../helpers/tokenHelpers';

const authContext = createContext();

const signInUser = (formData) => axios({
  method: 'post',
  headers: { 'content-type': 'application/json' },
  url: API_LOGIN_ENDPOINT,
  validateStatus: (status) => [200, 201, 401].includes(status),
  data: formData,
});

const signUpUser = (formData) => axios({
  method: 'post',
  headers: { 'content-type': 'application/json' },
  url: API_SIGNUP_ENDPOINT,
  validateStatus: (status) => [200, 201, 409].includes(status),
  data: formData,
});

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const rollbar = useRollbar();
  const { saveToken, getCurrentUser, logoutCurrentUser } = tokenHelpers();

  const signin = (creds, successCb, unauthorizedCb) => {
    signInUser(creds).then(({ status, data }) => {
      switch (status) {
        case 200:
        case 201:
          setUser(data);
          saveToken(data);
          successCb();
          break;
        case 401:
          unauthorizedCb();
          break;
        default:
          throw new Error('Error on signin');
      }
    }).catch((error) => {
      const parsedCredentials = JSON.parse(creds);

      rollbar.error('Error signing in user', error, { username: parsedCredentials.username });
    });
  };

  const signup = (creds, successCb, confictCb) => {
    signUpUser(creds).then(({ status, data }) => {
      switch (status) {
        case 201:
        case 200:
          setUser(data);
          saveToken(data);
          successCb();
          break;
        case 409:
          confictCb();
          break;
        default:
          throw new Error('Unknown status on signup');
      }
    }).catch((e) => {
      console.error('Handle network errors here', e);
    });
  };

  const signout = (cb) => {
    setUser(null);
    logoutCurrentUser();
    cb();
  };

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
