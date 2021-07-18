export default () => {
  const saveToken = (data) => {
    try {
      // Save to local storage
      window.localStorage.setItem('currentUser', JSON.stringify(data));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.warn(error);
    }
  };
  const getCurrentUser = () => window.localStorage.getItem('currentUser');
  const logoutCurrentUser = () => window.localStorage.removeItem('currentUser');

  return { saveToken, getCurrentUser, logoutCurrentUser };
};
