import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { nanoid } from '@reduxjs/toolkit';
import { useSocket } from '../contexts/socket.js';
import { useAuth } from '../hooks/auth';
import { useSelector } from 'react-redux';

const MesssageSchema = Yup.object().shape({
  message: Yup.string().required('Required'),
});

const MessageForm = ({ inputRef }) => {
  const socket = useSocket();
  const auth = useAuth();
  const { currentChannelId } = useSelector((state) => state.channels)

  return (
    <div>
      <Formik
        initialValues={{ message: '' }}
        validationSchema={MesssageSchema}
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
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="message"
              ref={inputRef}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.message}
            />
            {errors.message && touched.message && errors.message}
            <button type="submit" disabled={isSubmitting}>
              Send
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default MessageForm;
