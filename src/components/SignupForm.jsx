import React, { useState } from 'react';
import { Formik } from 'formik';
import { Alert, Form, Button } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { signUpUser } from '../api';
import SignupFormWrapper from './SignupFormWrapper';
import { useAuth } from '../contexts/auth';

const getSignupSchema = (translation) => Yup.object().shape({
  username: Yup.string()
    .min(3, translation('signupPage.form.errors.usernameLength'))
    .max(20, translation('signupPage.form.errors.usernameLength'))
    .required(translation('signupPage.form.errors.required')),
  password: Yup.string()
    .min(6, translation('signupPage.form.errors.passwordLength'))
    .required(translation('signupPage.form.errors.required')),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], translation('signupPage.form.errors.passwordMatch'))
    .required(translation('signupPage.form.errors.required')),
});

const SignupForm = () => {
  const [userExistsError, setUserExistsError] = useState(false);
  const history = useHistory();
  const { loginCurrentUser } = useAuth();
  const location = useLocation();
  const { t } = useTranslation();

  const signupSchema = getSignupSchema(t);

  return (
    <SignupFormWrapper>
      { userExistsError && (
        <Alert variant="danger">
          {t('signupPage.form.errors.userExists')}
        </Alert>
      )}
      <Formik
        initialValues={{ username: '', password: '', passwordConfirmation: '' }}
        validationSchema={signupSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const creds = JSON.stringify(values, null, 2);

          signUpUser(creds).then(({ status, data }) => {
            switch (status) {
              case 201:
              case 200:
                loginCurrentUser(data);
                // eslint-disable-next-line
            const { from } = location.state || { from: { pathname: '/' } };
                setUserExistsError(false);
                history.replace(from);
                break;
              case 409:
                setUserExistsError(true);
                break;
              default:
                throw new Error('Unknown status on signup');
            }
          }).catch((e) => {
            console.error('Handle network errors here', e);
          });

          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <Form onSubmit={handleSubmit}>
            <h1>{t('signupPage.headline')}</h1>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>{t('signupPage.form.fields.username')}</Form.Label>
              <Form.Control
                name="username"
                type="text"
                placeholder={t('signupPage.form.fields.username')}
                value={values.username}
                onChange={handleChange}
                isInvalid={touched.username && !!errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username && touched.username && errors.username}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>{t('signupPage.form.fields.password')}</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder={t('signupPage.form.fields.password')}
                value={values.password}
                onChange={handleChange}
                isInvalid={touched.password && !!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password && touched.password && errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPasswordConfirmation">
              <Form.Label>{t('signupPage.form.fields.passwordConfirmation')}</Form.Label>
              <Form.Control
                name="passwordConfirmation"
                type="password"
                placeholder={t('signupPage.form.fields.passwordConfirmation')}
                value={values.passwordConfirmation}
                onChange={handleChange}
                isInvalid={touched.passwordConfirmation && !!errors.passwordConfirmation}
              />
              <Form.Control.Feedback type="invalid">
                {
                  errors.passwordConfirmation
                    && touched.passwordConfirmation
                    && errors.passwordConfirmation
                }
              </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" disabled={isSubmitting}>{t('signupPage.form.cta')}</Button>
          </Form>
        )}
      </Formik>
    </SignupFormWrapper>
  );
};

export default SignupForm;
