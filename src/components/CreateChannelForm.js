import React, { useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useSocket } from '../contexts/socket.js';

const ChannelSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
});

const CreateChannelForm = ({ newChannelInputRef }) => {
  const socket = useSocket();
  useEffect(() => {
    newChannelInputRef.current.focus();
  }, [newChannelInputRef]);

  return (
    <div>
      <Formik
        initialValues={{ name: '' }}
        validationSchema={ChannelSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          console.log('Submitting?');
          const channel = {
            name: values.name, removable: true,
          };
          socket.emit('newChannel', channel, ({ status }) => {
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
          <form onSubmit={handleSubmit} autoComplete='off'>
            <div className="form-group">
              <input
                type="text"
                name="name"
                className={`mb-2 form-control ${errors.name && 'is-invalid'}`}
                ref={newChannelInputRef}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {
                errors.name && touched.name
                  && (
                    <div className="invalid-feedback">
                      {errors.name}
                    </div>
                  )
              }
              <div className="d-flex justify-content-end">
                <button type="button" className="me-2 btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                  Send
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default CreateChannelForm;
