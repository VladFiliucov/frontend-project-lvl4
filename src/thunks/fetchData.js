import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_DATA_ENDPOINT } from '../constants';
import tokenHelpers from '../helpers/tokenHelpers';

const fetchData = async () => {
  const { getCurrentUser } = tokenHelpers();
  const { token } = JSON.parse(getCurrentUser());

  const response = await axios.get(API_DATA_ENDPOINT, {
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
