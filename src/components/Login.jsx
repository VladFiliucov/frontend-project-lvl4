import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useAuth } from '../hooks/auth';
import routes from '../routes';

const getSigninSchema = (translation) => Yup.object().shape({
  username: Yup.string()
    .required(translation('signinPage.form.errors.required')),
  password: Yup.string()
    .required(translation('signinPage.form.errors.required')),
});

const Login = () => {
  const [authError, setAuthError] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();
  const { signupPath } = routes;
  const { t } = useTranslation();

  const signinSchema = getSigninSchema(t);

  return (
    <div>
      <h1>{t('login')}</h1>
      {authError && <p>{t('signinPage.form.errors.incorrectCredentials')}</p>}
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={signinSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const creds = JSON.stringify(values, null, 2);

          auth.signin(creds, () => {
            const { from } = location.state || { from: { pathname: '/' } };
            setAuthError(false);
            history.replace(from);
          }, () => {
            setAuthError(true);
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
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>{t('signinPage.form.fields.username')}</Form.Label>
              <Form.Control
                name="username"
                type="text"
                placeholder={t('signinPage.form.fields.username')}
                value={values.username}
                onChange={handleChange}
                isInvalid={touched.username && !!errors.username}
                onBlur={handleBlur}
              />
              {errors.username && touched.username && errors.username}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>{t('signinPage.form.fields.password')}</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder={t('signinPage.form.fields.password')}
                value={values.password}
                onChange={handleChange}
                isInvalid={touched.password && !!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password && touched.password && errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            {errors.password && touched.password && errors.password}
            <Button type="submit" disabled={isSubmitting}>{t('login')}</Button>
          </Form>
        )}
      </Formik>
      {t('dontHaveAccount')}
      <Link to={signupPath()}>
        {t('signup')}
      </Link>
    </div>
  );
};

export default Login;
