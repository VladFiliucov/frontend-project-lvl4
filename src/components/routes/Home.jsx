import React from 'react';
import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Chat from '../Chat';
import RedirectToLogin from './RedirectToLogin';
import fetchDataFromApi from '../../thunks/fetchData';
import { useAuth } from '../../contexts/auth';

function Home() {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  // TODO: if no user probably should clear state
  if (currentUser) {
    dispatch(fetchDataFromApi(currentUser.token));
  }

  return (
    <Route
      render={({ location }) => (currentUser ? (
        <Chat />
      ) : (
        <RedirectToLogin location={location} />
      ))}
    />
  );
}

export default Home;
