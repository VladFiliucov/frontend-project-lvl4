import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { store } from '../store';
import { SocketProvider, socketProvider, useSocket } from '../contexts/socket.js';
import Login from './Login';
import Channels from './Channels';
import RedirectToLogin from './routes/RedirectToLogin';
import { AuthProvider, useAuth } from '../hooks/auth';
import {nanoid} from '@reduxjs/toolkit';
import { addMessage } from '../store/messagesSlice';

export default function App() {
  const [boo, setBoo] = useState(['foo'])


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

            <ul>
              {boo.length && boo.map((e) => {
                return <li>{e}</li>
              })}
            </ul>
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route exact path="/">
                <Home />
                <Somecomp />
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

function Somecomp() {
  const socket = useSocket();
  const dispatch = useDispatch()
  console.log('SKT', socket)

  const handleClick = (e) => {
    e.preventDefault();
    const message = {id: nanoid(), userId: 1, channelId: 1, msg: 'Hi there'}
    socket.emit('newMessage', message, (response) => {
      console.log('emitting')
      console.log('Response', response)
      dispatch(addMessage(message));
      // TODO: if all good - clear form and reset
    });
  }

  return (
    <button onClick={handleClick}>Fire</button>
  )
}

function About() {
  return <h2>About</h2>;
}

function NoMatch() {
  return <h1>404</h1>;
}
