import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getMessagesForChannel } from '../store/messagesSlice';

const Messages = () => {
  const { error, loading } = useSelector((state) => state.messages);
  const { t } = useTranslation();
  const messages = useSelector(getMessagesForChannel);

  if (loading) return <h1>Fetching data...</h1>;
  if (error) return <h1>There was an error fetching data</h1>;

  return (
    <div>
      <h2>{t('chatPage.messages')}</h2>
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
