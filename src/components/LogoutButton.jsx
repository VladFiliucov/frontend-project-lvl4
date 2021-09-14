import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { logoutSuccess } from '../store/currentUserSlice';

const LogoutButton = ({ children }) => {
  const loggedIn = useSelector((state) => state.currentUser.details);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logoutSuccess());
    history.push('/login');
  };

  if (!loggedIn) return null;

  return (
    <Button onClick={handleClick}>
      {children}
    </Button>
  );
};

export default LogoutButton;
