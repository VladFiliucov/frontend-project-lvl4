import { createAsyncThunk } from '@reduxjs/toolkit';
import 'regenerator-runtime/runtime.js';
import axios from 'axios';
import routes from '../routes';

const fetchData = async (token) => {
  const response = await axios.get(routes.dataEndpoint(), {
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
    validateStatus: (status) => [200, 401].includes(status),
  });

  return response;
};

const fetchDataFromApi = createAsyncThunk(
  'data/fetchData',
  async (token) => {
    const { status, data, error } = await fetchData(token);

    return { status, data, error };
  },
);

export default fetchDataFromApi;
