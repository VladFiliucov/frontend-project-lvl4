import { createSlice } from '@reduxjs/toolkit';
import { fetchDataFromApi } from '../thunks/fetchData';

const initialState = {
  data: [],
  error: null,
  loading: false,
};

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  extraReducers: {
    [fetchDataFromApi.fulfilled]: (state, action) => {
      state.data = action.payload.data.channels;
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
