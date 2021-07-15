import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store';
import { SocketProvider } from '../contexts/socket.js';
import Login from './Login';
import Home from './routes/Home';
import { AuthProvider } from '../hooks/auth';
import Modal from './Modal';
import Signup from './routes/Signup';
import LogoutButton from './LogoutButton';

export default function App() {
  return (
    <Provider store={store}>
      <SocketProvider>
        <AuthProvider>
          <Router>
            <div>
              <nav className='d-flex'>
                <ul className='mr-auto p-2'>
                  <li>
                    <Link to="/">Hexlet Chat</Link>
                  </li>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/signup">Sign up</Link>
                  </li>
                </ul>
                <div className='p-2'>
                  <LogoutButton>
                    Sign out
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
    </Provider>
  );
}

function NoMatch() {
  return <h1>404</h1>;
}
