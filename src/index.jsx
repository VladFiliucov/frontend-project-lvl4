// @ts-check
import React from 'react';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import App from './components/App.jsx';

import '../assets/application.scss';
import './initializers/i18n';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

export default async (socketClient) => <App socketClient={socketClient} />;
