import React from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Chat from '../Chat';
import RedirectToLogin from './RedirectToLogin';
import fetchDataFromApi from '../../thunks/fetchData';

function Home() {
  const dispatch = useDispatch();
  const { details: userDetails } = useSelector((state) => state.currentUser);

  // TODO: if no user probably should clear state
  if (userDetails) {
    dispatch(fetchDataFromApi());
  }

  return (
    <Route
      render={({ location }) => (userDetails ? (
        <Chat />
      ) : (
        <RedirectToLogin location={location} />
      ))}
    />
  );
}

export default Home;
