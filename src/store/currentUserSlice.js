import { createSlice } from '@reduxjs/toolkit';

const savedUser = localStorage.getItem('currentUser');
const initialState = {
  details: savedUser
    ? JSON.parse(savedUser)
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
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
    },
    logoutSuccess: (state) => {
      state.details = null;
      localStorage.removeItem('currentUser');
    },
  },
  /* eslint-enable no-param-reassign */
});

export const { loginSuccess, logoutSuccess } = currentUserSlice.actions;
