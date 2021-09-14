// Игнорируем коменты в этом файлe. пробовал всякие штуки с оставляю себе на будующее for reference.
// Но они ломают тесты хекслета
import { configureStore } from '@reduxjs/toolkit';
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query';
// import { channelsApi } from '../services/channels.js';
// import { messagesApi } from '../services/messages.js';
import { messagesSlice } from './messagesSlice.js';
import { channelsSlice } from './channelsSlice.js';
import { modalSlice } from './modalSlice.js';
import { currentUserSlice } from './currentUserSlice.js';

// inspired by https://redux-toolkit.js.org/tutorials/rtk-query/#add-the-service-to-your-store
const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    // [channelsApi.reducerPath]: channelsApi.reducer,
    // [messagesApi.reducerPath]: messagesApi.reducer,
    messages: messagesSlice.reducer,
    channels: channelsSlice.reducer,
    modal: modalSlice.reducer,
    currentUser: currentUserSlice.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  // .concat(messagesApi.middleware)
  // .concat(channelsApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export default store;
