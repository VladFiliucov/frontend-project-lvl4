export default () => {
  const saveToken = (token) => {
    try {
      // Save to local storage
      window.localStorage.setItem('authToken', token);
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.warn(error);
    }
  };
  const getAuthToken = () => window.localStorage.getItem('authToken');
  return { saveToken, getAuthToken };
};
