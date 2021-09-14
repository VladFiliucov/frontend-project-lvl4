// @ts-check
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { SocketProvider } from './contexts/socket';
import { AuthProvider } from './contexts/auth';
import { addMessage } from './store/messagesSlice';
import { addChannel, deleteChannel, renameChannel } from './store/channelsSlice';
import store from './store';
import rollbarConfig from './initializers/rollbar';
import 'core-js/stable/index.js';

import App from './components/App.jsx';

import '../assets/application.scss';
import generateI18NInstance from './initializers/i18n';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const getSocketEmitters = (socketClient) => ({
  sendNewMessage: (msg, cb) => socketClient.emit('newMessage', msg, cb),
  createChannel: (payload, cb) => socketClient.emit('newChannel', payload, cb),
  renameChannel: (payload, cb) => socketClient.emit('renameChannel', payload, cb),
  removeChannel: (payload, cb) => socketClient.emit('removeChannel', payload, cb),
});

export default async (socketClient) => {
  const i18nInstance = await generateI18NInstance();

  const socketEmitters = getSocketEmitters(socketClient);

  socketClient.on('newMessage', (newMessage) => {
    store.dispatch(addMessage(newMessage));
  });

  socketClient.on('newChannel', (newChannel) => {
    store.dispatch(addChannel(newChannel));
  });

  socketClient.on('removeChannel', ({ id }) => {
    store.dispatch(deleteChannel(id));
  });

  socketClient.on('renameChannel', (channel) => {
    store.dispatch(renameChannel(channel));
  });

  return (
    <I18nextProvider i18n={i18nInstance}>
      <Provider store={store}>
        <RollbarProvider config={rollbarConfig}>
          <ErrorBoundary>
            <SocketProvider eventEmitters={socketEmitters}>
              <AuthProvider>
                <App />
              </AuthProvider>
            </SocketProvider>
          </ErrorBoundary>
        </RollbarProvider>
      </Provider>
    </I18nextProvider>
  );
};
