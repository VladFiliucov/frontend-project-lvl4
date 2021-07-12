import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentChannelId } from '../store/channelsSlice';

const Channel = ({ channel }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setCurrentChannelId(channel.id));
  };
  return (
    <li className="nav-item w-100">
      <button onClick={handleClick} className="w-100 rounded-0 text-start btn">
        <span className="me-1">
          #
        </span>
        {channel.name}
      </button>
    </li>
  );
};

export default Channel;
