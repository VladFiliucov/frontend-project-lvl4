import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useAuth } from '../hooks/auth';

const LogoutButton = ({ children }) => {
  const auth = useAuth();
  const history = useHistory();

  const handleClick = () => {
    auth.signout(() => {
      history.push('/login');
    });
  };

  if (!auth.user) return null;

  return (
    <Button onClick={handleClick}>
      {children}
    </Button>
  );
};

export default LogoutButton;
