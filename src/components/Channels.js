import React from 'react';
import { useSelector } from 'react-redux';

import { fetchDataFromApi } from '../thunks/fetchData';
import Messages from './Messages';

const Channels = () => {
  const { data, error, loading } = useSelector((state) => state.channels);

  if (loading) return <h1>Fetching channels...</h1>;
  if (error) return <h1>There was an error fetching data</h1>;

  return (
    <div>
      <h2>channels</h2>
      {data.map((channel) => (
        <div key={`channel-${channel.id}`}>
          <strong>{channel.name}</strong>
        </div>
      ))}
      <Messages />
    </div>
  );
};

export default Channels;
