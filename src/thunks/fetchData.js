import { createAsyncThunk } from '@reduxjs/toolkit';
import 'regenerator-runtime/runtime.js';
import axios from 'axios';
import { useSelector } from 'react-redux';
import routes from '../routes';

const fetchData = async () => {
  const { details } = useSelector((state) => state.currentUser);

  const response = await axios.get(routes.dataEndpoint(), {
    headers: {
      Authorization: `Bearer ${details.token}`,
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
