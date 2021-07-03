import { createSlice } from '@reduxjs/toolkit';

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
});

export const { addMessage } = messagesSlice.actions;
