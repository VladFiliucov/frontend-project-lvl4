import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import store from '../store';
import rollbarConfig from '../initializers/rollbar';
import { SocketProvider } from '../contexts/socket';
import Login from './Login';
import Home from './routes/Home';
import { AuthProvider } from '../hooks/auth';
import Modal from './Modal';
import Signup from './routes/Signup';
import LogoutButton from './LogoutButton';

const getSocketListeners = (socketClient) => ({
  onNewMessage: (cb) => socketClient.on('newMessage', cb),
  onNewChannel: (cb) => socketClient.on('newChannel', cb),
  onRemoveChannel: (cb) => socketClient.on('removeChannel', cb),
  onRenameChannel: (cb) => socketClient.on('renameChannel', cb),
});

const getSocketEmitters = (socketClient) => ({
  sendNewMessage: (msg, cb) => socketClient.emit('newMessage', msg, cb),
  createChannel: (payload, cb) => socketClient.emit('newChannel', payload, cb),
  renameChannel: (payload, cb) => socketClient.emit('renameChannel', payload, cb),
  removeChannel: (payload, cb) => socketClient.emit('removeChannel', payload, cb),
});

export default function App({ socketClient }) {
  const { t } = useTranslation();
  const socketListeners = getSocketListeners(socketClient);
  const socketEmitters = getSocketEmitters(socketClient);

  return (
    <Provider store={store}>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <SocketProvider listeners={socketListeners} emitters={socketEmitters}>
            <AuthProvider>
              <Router>
                <div className="d-flex flex-column h-100">
                  <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
                    <ul className="mr-auto p-2">
                      <li className="list-group-item">
                        <Link to="/">{t('siteName')}</Link>
                      </li>
                    </ul>
                    <div className="p-2">
                      <LogoutButton>
                        {t('signout')}
                      </LogoutButton>
                    </div>
                  </nav>

                  <Switch>
                    <Route path="/login">
                      <Login />
                    </Route>
                    <Route exact path="/">
                      <Home />
                    </Route>
                    <Route exact path="/signup">
                      <Signup />
                    </Route>
                    <Route path="*">
                      <NoMatch />
                    </Route>
                  </Switch>
                </div>
              </Router>
              <Modal />
            </AuthProvider>
          </SocketProvider>
        </ErrorBoundary>
      </RollbarProvider>
    </Provider>
  );
}

function NoMatch() {
  return <h1>404</h1>;
}
