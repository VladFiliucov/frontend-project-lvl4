import { createSlice } from '@reduxjs/toolkit';

const createMessage = (message) => ({
  id: message.id,
  channelId: message.channelId,
  userId: message.userId,
  msg: message.msg,
});

const initialState = [
  createMessage({
    id: 1, channelId: 1, userId: 1, msg: 'Hello World',
  }),
];

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      console.log('STATE is', state, action);
      const message = createMessage(action.payload);
      state.push(message);
    },
  },
});

export const { addMessage } = messagesSlice.actions;
