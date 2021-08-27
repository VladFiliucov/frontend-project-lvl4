import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpened: false,
  type: null,
  options: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleModal: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.isOpened = !state.isOpened;
    },
    showModal: (_, action) => ({
      isOpened: true,
      type: action.payload.type,
      options: action.payload.options,
    }),
    hideModal: () => ({
      isOpened: false,
      type: null,
      options: null,
    }),
  },
});

export const { toggleModal, showModal, hideModal } = modalSlice.actions;
