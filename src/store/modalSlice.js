import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpened: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.isOpened = !state.isOpened;
    },
  },
});

export const { toggleModal } = modalSlice.actions;
