import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentChannelId } from '../store/channelsSlice';

const Channel = ({ channel, inputRef }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setCurrentChannelId(channel.id));
    inputRef.current.focus();
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
