import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import useToken from '../hooks/useToken.js';

// inspired by https://redux-toolkit.js.org/tutorials/rtk-query/#setting-up-your-store-and-api-service
export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/',
    prepareHeaders: (headers) => {
      // Can connect to store from here. Perhaps I could store token in state?
      // prepareHeaders: (headers, { getState }) => {
      // const token = getState().auth.token

      const { getCurrentUser } = useToken();
      const { token } = JSON.parse(getCurrentUser());

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => 'data',
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMessagesQuery } = messagesApi;
