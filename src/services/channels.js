import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// inspired by https://redux-toolkit.js.org/tutorials/rtk-query/#setting-up-your-store-and-api-service
export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/' }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => 'data',
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetChannelsQuery } = channelsApi;
