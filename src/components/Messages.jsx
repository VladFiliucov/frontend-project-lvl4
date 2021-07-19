import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getMessagesForChannel } from '../store/messagesSlice';
import MessageForm from './MessageForm';

const Messages = () => {
  const { error, loading } = useSelector((state) => state.messages);
  const { t } = useTranslation();
  const messages = useSelector(getMessagesForChannel);

  if (loading) return <h1>Fetching data...</h1>;
  if (error) return <h1>There was an error fetching data</h1>;

  return (
    <div className="d-flex flex-column align-items-stretch">
      <h2 className="p-2 bd-highlight">{t('chatPage.messages')}</h2>
      <div className="flex-grow-1 overflow-auto px-5">
        {messages.map((message) => (
          <div key={`message-${message.id}`} className="p-1 bd-highlight">
            <strong>
              {message.userId}
              :
              {' '}
              {message.msg}
            </strong>
          </div>
        ))}
      </div>
      <MessageForm />
    </div>
  );
};

export default Messages;
