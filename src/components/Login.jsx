import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useToken from '../hooks/useToken';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const submitFormData = (formData) => axios({
  method: 'post',
  headers: { 'content-type': 'application/json' },
  url: '/api/v1/login',
  validateStatus: () => true,
  data: formData,
});

const Login = () => {
  const navigateTo = useNavigate();
  const { saveToken } = useToken();
  const [authError, setAuthError] = useState(false);

  return (
    <div>
      <h1>Please Log in</h1>
      {authError && <p>Incorrect username or password</p>}
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={SignupSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const creds = JSON.stringify(values, null, 2);

          const { status, data } = await submitFormData(creds);

          switch (status) {
            case 401:
              setAuthError(true);
              break;
            case 200:
              saveToken(data.token)
              setAuthError(false);
              navigateTo('/');
              break;
            default:
              throw 'Wooot';
          }

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
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
