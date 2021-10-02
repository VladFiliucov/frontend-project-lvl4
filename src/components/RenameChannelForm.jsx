import React, { useRef, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../contexts/socket';
import { hideModal } from '../store/modalSlice';

const buildValidationScheema = (exisingChannels) => (
  Yup.object().shape({
    name: Yup.mixed().notOneOf(exisingChannels).required('Required'),
  })
);

const RenameChannelForm = ({ channelId }) => {
  const { renameChannel } = useSocket();
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const allChannelNames = useSelector(
    (state) => state.channels.data.map((chnl) => chnl.name),
  );
  const validationSchema = buildValidationScheema(allChannelNames);
  const handleCloseClick = () => {
    dispatch(hideModal());
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Formik
      initialValues={{ name: '' }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        const payload = {
          name: values.name, id: channelId,
        };
        renameChannel(payload, (response) => {
          const { status } = response;
          if (status === 'ok') {
            resetForm();
            dispatch(hideModal());
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
              data-testid="rename-channel"
              ref={inputRef}
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
              <Button variant="secondary" onClick={handleCloseClick}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} variant="primary" onClick={handleSubmit}>
                Send
              </Button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default RenameChannelForm;
