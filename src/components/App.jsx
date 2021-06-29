import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store.js';
import Login from './Login';
import Channels from './Channels';
import RedirectToLogin from './routes/RedirectToLogin';
import { AuthProvider, useAuth } from '../hooks/auth';

export default function App() {
  return (
    <Provider store={store}>
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
      </AuthProvider>
    </Provider>
  );
}

function Home() {
  const { getCurrentUser } = useAuth();
  const currentUser = JSON.parse(getCurrentUser());

  return (
    <Route
      render={({ location }) => (currentUser ? (
        <Channels user={currentUser} />
      ) : (
        <RedirectToLogin location={location} />
      ))}
    />
  );
}

function About() {
  return <h2>About</h2>;
}

function NoMatch() {
  return <h1>404</h1>;
}
