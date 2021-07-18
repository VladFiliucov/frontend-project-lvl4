import React, { useEffect, useRef } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { nanoid } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { useSocket } from '../contexts/socket.js';
import { useAuth } from '../hooks/auth';

const getMessageSchemaValidation = (t) => Yup.object().shape({
  message: Yup.string().required(t('chatPage.messageForm.errors.required')),
});

const MessageForm = () => {
  const inputRef = useRef(null);
  const socket = useSocket();
  const auth = useAuth();
  const { t } = useTranslation();
  const { currentChannelId } = useSelector((state) => state.channels);

  const messageSchemaValidation = getMessageSchemaValidation(t);

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId]);

  return (
    <div>
      <Formik
        initialValues={{ message: '' }}
        validationSchema={messageSchemaValidation}
        validateOnBlur={false}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const { message: formMessage } = values;
          const currentUser = JSON.parse(auth.getCurrentUser());

          const message = {
            id: nanoid(), userId: currentUser.id, channelId: currentChannelId, msg: formMessage,
          };
          socket.emit('newMessage', message, ({ status }) => {
            if (status === 'ok') {
              resetForm();
            }
            // TODO: if error - handle
          });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} autoComplete="off">
            <input
              type="text"
              name="message"
              data-testid="new-message"
              ref={inputRef}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.message}
            />
            {errors.message && touched.message && errors.message}
            <Button type="submit" disabled={isSubmitting}>{t('chatPage.messageForm.actions.submit')}</Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default MessageForm;
