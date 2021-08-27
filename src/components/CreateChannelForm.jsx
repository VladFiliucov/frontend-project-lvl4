import React, { useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useSocket } from '../contexts/socket';
import { hideModal } from '../store/modalSlice';
import { setCurrentChannelId } from '../store/channelsSlice.js';

const buildValidationScheema = (exisingChannels, t) => {
  const exisitngChannelsMsg = t('chatPage.form.errors.channelExists');
  const requiredMsg = t('chatPage.form.errors.required');

  return Yup.object().shape({
    name: Yup.mixed().notOneOf(exisingChannels, exisitngChannelsMsg).required(requiredMsg),
  });
};

const CreateChannelForm = ({ newChannelInputRef }) => {
  const { createChannel } = useSocket();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    newChannelInputRef.current.focus();
  }, [newChannelInputRef]);

  const allChannelNames = useSelector(
    (state) => state.channels.data.map((channel) => channel.name),
  );

  const validationSchema = buildValidationScheema(allChannelNames, t);

  const handleCloseClick = () => {
    dispatch(hideModal());
  };

  return (
    <div>
      <Formik
        initialValues={{ name: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          const channel = {
            name: values.name, removable: true,
          };
          createChannel(channel, (response) => {
            const { status, data } = response;
            if (status === 'ok') {
              resetForm();
              dispatch(hideModal());
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
                data-testid="add-channel"
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
                  {t('chatPage.form.actions.cancel')}
                </button>
                <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                  {t('chatPage.form.actions.submit')}
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
