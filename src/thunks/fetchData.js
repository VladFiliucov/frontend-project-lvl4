import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import tokenHelpers from '../helpers/tokenHelpers';

const fetchData = async () => {
  const { getCurrentUser } = tokenHelpers();
  const { token } = JSON.parse(getCurrentUser());

  const response = await axios.get('/api/v1/data', {
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
  async () => {
    const { status, data, error } = await fetchData();

    return { status, data, error };
  },
);

export default fetchDataFromApi;
