import { createSelector, createSlice } from '@reduxjs/toolkit';
import { remove } from 'lodash';
import { fetchDataFromApi } from '../thunks/fetchData';
import { deleteChannel } from './channelsSlice';

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

const getCurrentChannel = (state) => state.channels.currentChannelId;
const getMessages = (state) => state.messages.data;

export const getMessagesForChannel = createSelector(
  [getCurrentChannel, getMessages],
  (currentChannelId, allMessages) => allMessages.filter((message) => message.channelId === currentChannelId),
);

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
    [deleteChannel]: (state, action) => {
      remove(state.data, (msg) => msg.channelId === action.payload);
    },
  },
});

export const { addMessage } = messagesSlice.actions;
