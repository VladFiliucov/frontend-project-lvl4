// @ts-check
import React from 'react';
import ReactDOM from 'react-dom';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import App from './components/App.jsx';

import '../assets/application.scss';
import './initializers/i18n';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const container = document.querySelector('#chat');

export default (socketClient) => {
  ReactDOM.render(<App socketClient={socketClient} />, container);
};
