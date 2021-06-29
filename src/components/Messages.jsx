import React from 'react';
import { useGetMessagesQuery } from '../services/messages.js';

// TODO: Things to fetch
// { channels, messages, currentChannelId }
const Messages = () => {
  const { data, error, isLoading } = useGetMessagesQuery();

  if (isLoading) return <h1>Fetching data...</h1>;
  if (error) return <h1>There was an error fetching data</h1>;

  return (
    <div>
      <h2>messages</h2>
      {data?.messages.map((message) => (
        <div key={`message-${message.id}`}>
          <strong>{message}</strong>
        </div>
      ))}
    </div>
  );
};

export default Messages;
