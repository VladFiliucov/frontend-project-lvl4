import { createSlice } from '@reduxjs/toolkit';
import { fetchDataFromApi } from '../thunks/fetchData';

const createMessage = (message) => ({
  id: message.id,
  channelId: message.channelId,
  userId: message.userId,
  msg: message.msg,
});

const initialState = {
  data: [],
  error: null,
  loading: false,
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const message = createMessage(action.payload);
      state.data.push(message);
    },
  },
  extraReducers: {
    [fetchDataFromApi.fulfilled]: (state, action) => {
      state.data = action.payload.data.messages;
      state.error = null;
      state.loading = false;
    },
    [fetchDataFromApi.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchDataFromApi.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { addMessage } = messagesSlice.actions;
