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

export default function App({ socketClient }) {
  const { t } = useTranslation();

  return (
    <Provider store={store}>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <SocketProvider socketClient={socketClient}>
            <AuthProvider>
              <Router>
                <div>
                  <nav className="d-flex">
                    <ul className="mr-auto p-2">
                      <li>
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
