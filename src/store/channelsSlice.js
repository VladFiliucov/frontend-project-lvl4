import { createSlice } from '@reduxjs/toolkit';
import { remove } from 'lodash';
import { fetchDataFromApi } from '../thunks/fetchData';

const initialState = {
  data: [],
  error: null,
  loading: false,
  currentChannelId: null,
};

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload;
    },
    addChannel: (state, action) => {
      state.data.push(action.payload);
    },
    deleteChannel: (state, action) => {
      remove(state.data, (channel) => channel.id === action.payload);
      if (state.currentChannelId === action.payload) {
        state.currentChannelId = 1;
      }
    },
    renameChannel: (state, action) => {
      const channel = state.data.find((channel) => channel.id === action.payload.id);
      channel.name = action.payload.name;
    },
  },
  extraReducers: {
    [fetchDataFromApi.fulfilled]: (state, action) => {
      state.data = action.payload.data.channels;
      state.currentChannelId = action.payload.data.currentChannelId;
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

export const {
  setCurrentChannelId, addChannel, deleteChannel, renameChannel,
} = channelsSlice.actions;
