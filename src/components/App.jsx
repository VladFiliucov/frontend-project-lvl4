import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import routes from '../routes';
import Login from './Login';
import Home from './routes/Home';
import Modal from './Modal';
import Signup from './routes/Signup';
import LogoutButton from './LogoutButton';

export default function App() {
  const { t } = useTranslation();
  const { loginPath, homePath, signupPath } = routes;

  return (
    <>
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
            <Route path={loginPath()}>
              <Login />
            </Route>
            <Route exact path={homePath()}>
              <Home />
            </Route>
            <Route exact path={signupPath()}>
              <Signup />
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </Router>
      <Modal />
    </>
  );
}

function NoMatch() {
  const { t } = useTranslation();

  return (
    <h1>
      {t('notFoundPage.headline')}
    </h1>
  );
}
