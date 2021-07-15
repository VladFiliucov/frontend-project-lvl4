import React, { useState } from 'react';
import { Formik } from 'formik';
import { Alert, Form, Button } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { useAuth } from '../hooks/auth';
import SignupFormWrapper from './SignupFormWrapper';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Too Short!')
    .required('Required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
});

const SignupForm = () => {
  const [userExistsError, setUserExistsError] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();

  return (
    <SignupFormWrapper>
      { userExistsError && (
        <Alert variant="danger">
          Username already taken
        </Alert>
      )}
      <Formik
        initialValues={{ username: '', password: '', passwordConfirmation: '' }}
        validationSchema={SignupSchema}
        onSubmit={async (values, { setSubmitting }) => {
          console.log('Values are', values);
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
