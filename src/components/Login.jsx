import React, { useState } from 'react';
import { Formik } from 'formik';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useAuth } from '../hooks/auth';

const getSigninSchema = (translation) => Yup.object().shape({
  username: Yup.string()
    .required(translation('signin.required')),
  password: Yup.string()
    .required(translation('signin.required')),
});

const Login = () => {
  const [authError, setAuthError] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('login')}</h1>
      {authError && <p>{t('incorrectCredentials')}</p>}
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={getSigninSchema(t)}
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
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />
            {errors.username && touched.username && errors.username}
            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <button type="submit" disabled={isSubmitting}>
              {t('login')}
            </button>
          </form>
        )}
      </Formik>
      {t('dontHaveAccount')}
      <Link to="/signup">
        {t('signup')}
      </Link>
    </div>
  );
};

export default Login;
