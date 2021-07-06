import React  from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { store } from '../store';
import { SocketProvider } from '../contexts/socket.js';
import Login from './Login';
import Channels from './Channels';
import RedirectToLogin from './routes/RedirectToLogin';
import { AuthProvider, useAuth } from '../hooks/auth';
import MessageForm from './MessageForm';
import { fetchDataFromApi } from '../thunks/fetchData';

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
                <MessageForm />
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
      </SocketProvider>
    </Provider>
  );
}

function Home() {
  const dispatch = useDispatch();
  const { getCurrentUser } = useAuth();
  const currentUser = JSON.parse(getCurrentUser());
  dispatch(fetchDataFromApi())

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
