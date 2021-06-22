import { useEffect, useState } from 'react';

export default () => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [authToken, setAuthToken] = useState(() => {
    try {
      // Get from local storage by key
      return window.localStorage.getItem('authToken');
      // Parse stored json or if none return initialValue
    } catch (error) {
      // If error also return initialValue
      console.warn(error);
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const saveToken = (token) => {
    try {
      // Save state
      setAuthToken(token);
      // Save to local storage
      window.localStorage.setItem('authToken', token);
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.warn(error);
    }
  };
  return { authToken, saveToken };
};
