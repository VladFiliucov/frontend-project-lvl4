import React from 'react';
import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Chat from '../Chat';
import RedirectToLogin from './RedirectToLogin';
import { useAuth } from '../../hooks/auth';
import fetchDataFromApi from '../../thunks/fetchData';

function Home() {
  const dispatch = useDispatch();
  const { user } = useAuth();

  // TODO: if no user probably should clear state
  if (user) {
    dispatch(fetchDataFromApi());
  }

  return (
    <Route
      render={({ location }) => (user ? (
        <Chat />
      ) : (
        <RedirectToLogin location={location} />
      ))}
    />
  );
}

export default Home;
