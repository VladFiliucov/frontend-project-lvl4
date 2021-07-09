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

export default function App() {
  return (
    <Provider store={store}>
      <SocketProvider>
        <AuthProvider>
          <Router>
            <div>
              <nav>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                </ul>
              </nav>

              <Switch>
                <Route path="/login">
                  <Login />
                </Route>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/about">
                  <About />
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

function About() {
  return <h2>About</h2>;
}

function NoMatch() {
  return <h1>404</h1>;
}
