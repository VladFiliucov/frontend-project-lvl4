import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useAuth } from '../contexts/auth';

const LogoutButton = ({ children }) => {
  const { currentUser, logoutCurrentUser } = useAuth();
  const history = useHistory();

  const handleClick = () => {
    logoutCurrentUser();
    history.push('/login');
  };

  if (!currentUser) return null;

  return (
    <Button onClick={handleClick}>
      {children}
    </Button>
  );
};

export default LogoutButton;
