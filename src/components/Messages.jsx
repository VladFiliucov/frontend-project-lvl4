import React from 'react';
import { useSelector } from 'react-redux';
import { getMessagesForChannel } from '../store/messagesSlice';

// TODO: Things to fetch
// { channels, messages, currentChannelId }
const Messages = () => {
  const { error, loading } = useSelector((state) => state.messages);

  if (loading) return <h1>Fetching data...</h1>;
  if (error) return <h1>There was an error fetching data</h1>;

  const messages = useSelector(getMessagesForChannel);

  return (
    <div>
      <h2>Messages</h2>
      {messages.map((message) => (
        <div key={`message-${message.id}`}>
          <strong>
            {message.userId}
            :
            {' '}
            {message.msg}
          </strong>
        </div>
      ))}
    </div>
  );
};

export default Messages;
