import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import Login from './Login';
import useAuth from '../hooks/useAuth';

export default function App() {
  return (
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

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  useAuth();

  return <h2>Home</h2>;
}

function About() {
  useAuth();

  return <h2>About</h2>;
}

function NoMatch() {
  return <h1>404</h1>;
}
