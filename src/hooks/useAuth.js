import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useToken from './useToken.js';

export default () => {
  const [authorized, setAuthorised] = useState(false);
  const navigateTo = useNavigate();
  const { authToken } = useToken();

  useEffect(() => {
    if (authToken) {
      setAuthorised(true);
    } else {
      setAuthorised(false);
      navigateTo('/login');
    }
  }, [authorized, authToken]);
};
