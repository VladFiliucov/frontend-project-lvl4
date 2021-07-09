import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { store } from '../store';

const ModalContents = () => {
  const { data, error, loading } = useSelector((state) => state.messages)

  if (loading) return <h1>Fetching data...</h1>;
  if (error) return <h1>There was an error fetching data</h1>;

  return (
    <div>
      {data.map((message) => (
        <p>{message.msg}</p>
      ))}
    </div>
  );
};

const Modal = () => (
  <Provider store={store}>
    <ModalContents />
  </Provider>
);

export default Modal;
