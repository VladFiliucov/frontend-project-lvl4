import React, { useState } from 'react';
import { Formik } from 'formik';
import { Alert, Form, Button } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/auth';
import SignupFormWrapper from './SignupFormWrapper';

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
  const location = useLocation();
  const auth = useAuth();
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

          auth.signup(creds, () => {
            const { from } = location.state || { from: { pathname: '/' } };
            setUserExistsError(false);
            history.replace(from);
          }, () => {
            setUserExistsError(true);
          });

          setSubmitting(false);
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
          <Form onSubmit={handleSubmit}>
            <h1>Registration</h1>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                type="text"
                placeholder="Username"
                value={values.username}
                onChange={handleChange}
                isInvalid={touched.username && !!errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username && touched.username && errors.username}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Your password"
                value={values.password}
                onChange={handleChange}
                isInvalid={touched.password && !!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password && touched.password && errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPasswordConfirmation">
              <Form.Label>Password confirmation</Form.Label>
              <Form.Control
                name="passwordConfirmation"
                type="password"
                placeholder="Your password"
                value={values.passwordConfirmation}
                onChange={handleChange}
                isInvalid={touched.passwordConfirmation && !!errors.passwordConfirmation}
              />
              <Form.Control.Feedback type="invalid">
                {errors.passwordConfirmation && touched.passwordConfirmation && errors.passwordConfirmation}
              </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" disabled={isSubmitting}>Register</Button>
          </Form>
        )}
      </Formik>
    </SignupFormWrapper>
  );
};

export default SignupForm;
