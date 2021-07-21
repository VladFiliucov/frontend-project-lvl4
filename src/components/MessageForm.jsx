import React, { useEffect, useRef } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { nanoid } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Form } from 'react-bootstrap';
import { useSocket } from '../contexts/socket';
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
    // need timeout here to give time for CreateChannel modal to unmount
    // as while modal is active rest of the page is unavailable and ref.focus fires nowhere
    const focusTimeout = setTimeout(() => {
      inputRef.current.focus();
    }, 50);
    return () => clearTimeout(focusTimeout);
  }, [currentChannelId]);

  return (
    <div className="mt-auto px-5 py-3">
      <Formik
        initialValues={{ message: '' }}
        validationSchema={messageSchemaValidation}
        validateOnBlur={false}
        onSubmit={async (values, { resetForm }) => {
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
          <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Control
                type="text-area"
                name="message"
                data-testid="new-message"
                onBlur={handleBlur}
                value={values.message}
                onChange={handleChange}
                ref={inputRef}
              />
              <Form.Control.Feedback type="invalid">
                {errors.message && touched.message && errors.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" disabled={isSubmitting}>{t('chatPage.messageForm.actions.submit')}</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MessageForm;
