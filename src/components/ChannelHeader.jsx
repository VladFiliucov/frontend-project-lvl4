import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toggleModal } from '../store/modalSlice';

const ChannelHeader = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleClick = () => {
    dispatch(toggleModal());
  };

  return (
    <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
      <span>{t('chatPage.headline')}</span>
      <button onClick={handleClick} type="button" className="p-0 text-primary btn btn-group-vertical">
        <span className="visually-hidden">
          +
        </span>
      </button>
    </div>
  );
};

export default ChannelHeader;
