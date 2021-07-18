import React from 'react';
import { Redirect } from 'react-router-dom';

const RedirectToLogin = ({ location }) => (
  <Redirect
    to={{
      pathname: '/login',
      state: { from: location },
    }}
  />
);

export default RedirectToLogin;
