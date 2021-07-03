import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { nanoid } from '@reduxjs/toolkit';
import { useSocket } from '../contexts/socket.js';

const MesssageSchema = Yup.object().shape({
  message: Yup.string().required('Required'),
});

const MessageForm = () => {
  const socket = useSocket();

  return (
    <div>
      <Formik
        initialValues={{ message: '' }}
        validationSchema={MesssageSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const { message: formMessage } = values;

          const message = {
            id: nanoid(), userId: 1, channelId: 1, msg: formMessage,
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
