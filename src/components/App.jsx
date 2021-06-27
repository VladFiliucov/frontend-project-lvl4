import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import Login from './Login';
import RedirectToLogin from './routes/RedirectToLogin';
import { AuthProvider, useAuth } from '../hooks/auth';

export default function App() {
  return (
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
              <Home>
                <h2>Home</h2>
              </Home>
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
  );
}

function Home({ children, ...rest }) {
  const { getAuthToken } = useAuth();
  const authToken = getAuthToken();

  return (
    <Route
      {...rest}
      render={({ location }) => (authToken ? (
        children
      ) : (
        <RedirectToLogin location={location} />
      ))}
    />
  );
  // useAuth();

  // return (
  //   <Redirect
  //     to={{
  //       pathname: '/login',
  //       state: { from: 'foo' },
  //     }}
  //   />
  // );
  // return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function NoMatch() {
  return <h1>404</h1>;
}
