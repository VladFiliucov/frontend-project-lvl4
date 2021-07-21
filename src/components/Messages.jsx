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
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <h2 className="p-2 bd-highlight">{t('chatPage.messages')}</h2>
        </div>
        <div className="chat-messages overflow-auto px-5">
          {messages.map((message) => (
            <div key={`message-${message.id}`} className="text-break mb-2">
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
    </div>
  );
};

export default Messages;
