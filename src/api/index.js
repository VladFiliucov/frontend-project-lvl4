import axios from 'axios';
import routes from '../routes.js';

export const signInUser = (formData) => axios({
  method: 'post',
  headers: { 'content-type': 'application/json' },
  url: routes.loginEndpoint(),
  validateStatus: (status) => [200, 201, 401].includes(status),
  data: formData,
});

export const signUpUser = (formData) => axios({
  method: 'post',
  headers: { 'content-type': 'application/json' },
  url: routes.signupEndpoint(),
  validateStatus: (status) => [200, 201, 409].includes(status),
  data: formData,
});
