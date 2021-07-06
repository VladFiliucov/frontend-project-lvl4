import React from 'react';
import { useSelector } from 'react-redux'

// TODO: Things to fetch
// { channels, messages, currentChannelId }
const Messages = () => {
  const { data, error, loading } = useSelector((state) => state.messages)

  if (loading) return <h1>Fetching data...</h1>;
  if (error) return <h1>There was an error fetching data</h1>;

  return (
    <div>
      <h2>Messages</h2>
      {data.map((message) => (
        <div key={`message-${message.id}`}>
          <strong>{message.userId}: {message.msg}</strong>
        </div>
      ))}
    </div>
  );
};

export default Messages;
