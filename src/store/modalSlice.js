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
    showModal: (_, action) => ({
      isOpened: true,
      type: action.payload.type,
      channelId: action.payload.channelId,
    }),
    hideModal: () => ({
      isOpened: false,
      type: null,
      options: null,
    }),
  },
});

export const { showModal, hideModal } = modalSlice.actions;
