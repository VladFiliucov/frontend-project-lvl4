import React, { useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useSocket } from '../contexts/socket.js';
import { toggleModal } from '../store/modalSlice';
import {setCurrentChannelId} from '../store/channelsSlice.js';

const buildValidationScheema = (exisingChannels) => (
  Yup.object().shape({
    name: Yup.mixed().notOneOf(exisingChannels).required('Required'),
  })
);

const CreateChannelForm = ({ newChannelInputRef }) => {
  const socket = useSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    newChannelInputRef.current.focus();
  }, [newChannelInputRef]);

  const allChannelNames = useSelector((state) => state.channels.data.map((channel) => channel.name));

  const validationSchema = buildValidationScheema(allChannelNames);

  const handleCloseClick = (e) => {
    dispatch(toggleModal());
  };

  return (
    <div>
      <Formik
        initialValues={{ name: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          console.log('Submitting?');
          const channel = {
            name: values.name, removable: true,
          };
          socket.emit('newChannel', channel, (response) => {
            const { status, data } = response;
            if (status === 'ok') {
              resetForm();
              dispatch(toggleModal());
              dispatch(setCurrentChannelId(data.id));
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
                <button type="button" onClick={handleCloseClick} className="me-2 btn btn-secondary">
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
