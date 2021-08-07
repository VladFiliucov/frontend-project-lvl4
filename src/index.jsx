// @ts-check
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import App from './components/App.jsx';

import '../assets/application.scss';
import generateI18NInstance from './initializers/i18n';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

export default async (socketClient) => {
  const i18nInstance = await generateI18NInstance();

  return (
    <I18nextProvider i18n={i18nInstance}>
      <App socketClient={socketClient} />
    </I18nextProvider>
  );
};
