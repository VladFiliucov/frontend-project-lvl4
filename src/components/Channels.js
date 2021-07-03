import React from 'react';
import { useGetChannelsQuery } from '../services/channels.js';
import Messages from './Messages';

// TODO: Things to fetch
// { channels, messages, currentChannelId }
const Channels = () => {
  const { data, error, isLoading } = useGetChannelsQuery();

  if (isLoading) return <h1>Fetching channels...</h1>;
  if (error) return <h1>There was an error fetching data</h1>;
  // merge messages here

  return (
    <div>
      <h2>channels</h2>
      {data.channels.map((channel) => (
        <div key={`channel-${channel.id}`}>
          <strong>{channel.name}</strong>
        </div>
      ))}
      <Messages />
    </div>
  );
};

export default Channels;
