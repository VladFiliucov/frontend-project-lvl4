import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentChannelId } from '../store/channelsSlice';

const Channel = ({ channel }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setCurrentChannelId(channel.id));
  };
  return (
    <li>
      <button onClick={handleClick}>
        #
        {channel.name}
      </button>
    </li>
  );
};

export default Channel;
