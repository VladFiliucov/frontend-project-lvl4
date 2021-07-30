import React, { useRef, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useSocket } from '../contexts/socket';

const buildValidationScheema = (exisingChannels) => (
  Yup.object().shape({
    name: Yup.mixed().notOneOf(exisingChannels).required('Required'),
  })
);

const RenameChannelForm = ({ channel, show, toggleConfirmation }) => {
  const { renameChannel } = useSocket();
  const inputRef = useRef(null);
  const handleClose = () => toggleConfirmation(false);

  const handleCloseClick = () => {
    toggleConfirmation(false);
  };

  const allChannelNames = useSelector(
    (state) => state.channels.data.map((chnl) => chnl.name),
  );
  const validationSchema = buildValidationScheema(allChannelNames);

  useEffect(() => {
    if (!show) return;
    inputRef.current.focus();
  }, [show]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Rename Channel</Modal.Title>
        </Modal.Header>

        <Formik
          initialValues={{ name: '' }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            const payload = {
              name: values.name, id: channel.id,
            };
            renameChannel(payload, (response) => {
              const { status } = response;
              if (status === 'ok') {
                resetForm();
                toggleConfirmation(false);
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
            <Modal.Body>
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
            </Modal.Body>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default RenameChannelForm;
