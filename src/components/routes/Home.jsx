import React from 'react';
import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Channels from '../Channels';
import MessageForm from '../MessageForm';
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
        <>
          <Channels />
          <MessageForm />
        </>
      ) : (
        <RedirectToLogin location={location} />
      ))}
    />
  );
}

export default Home;
