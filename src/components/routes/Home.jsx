import React, {useRef}  from 'react';
import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Channels from '../Channels';
import MessageForm from '../MessageForm';
import RedirectToLogin from './RedirectToLogin';
import { useAuth } from '../../hooks/auth';
import { fetchDataFromApi } from '../../thunks/fetchData';

function Home() {
  const dispatch = useDispatch();
  const { getCurrentUser } = useAuth();
  const currentUser = JSON.parse(getCurrentUser());
  dispatch(fetchDataFromApi())
  const inputRef = useRef(null);

  return (
    <Route
      render={({ location }) => (currentUser ? (
        <>
          <Channels user={currentUser} inputRef={inputRef} />
          <MessageForm inputRef={inputRef} />
        </>
      ) : (
        <RedirectToLogin location={location} />
      ))}
    />
  );
}

export default Home;
