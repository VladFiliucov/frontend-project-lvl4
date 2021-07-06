import { createSlice } from '@reduxjs/toolkit';
import messagesApi from '../services/messages';

const createMessage = (message) => ({
  id: message.id,
  channelId: message.channelId,
  userId: message.userId,
  msg: message.msg,
});

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage: (state, action) => {
      const message = createMessage(action.payload);
      state.push(message);
    },
  },
  // extraReducers: (builder) => {
  //   builder.addMatcher(
  //     messagesApi.endpoints.getMessages,
  //     (state, { payload }) => {
  //       console.log('Somehow getting here');
  //       // state.token = payload.token
  //       // state.user = payload.user
  //     }
  //   )
  // },
});

export const { addMessage } = messagesSlice.actions;
