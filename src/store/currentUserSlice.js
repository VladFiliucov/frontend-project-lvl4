import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  details: window.localStorage.getItem('currentUser')
    ? JSON.parse(window.localStorage.getItem('currentUser'))
    : null,
};

// Inspired by https://www.softkraft.co/how-to-setup-redux-with-redux-toolkit/

export const currentUserSlice = createSlice({
  /* eslint-disable no-param-reassign */
  name: 'currentUser',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.details = action.payload;
      window.localStorage.setItem('currentUser', JSON.stringify(action.payload));
    },
    logoutSuccess: (state) => {
      state.details = null;
      window.localStorage.removeItem('currentUser');
    },
  },
  /* eslint-enable no-param-reassign */
});

export const { loginSuccess, logoutSuccess } = currentUserSlice.actions;
