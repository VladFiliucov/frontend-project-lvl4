import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Messages from './Messages';
import { setCurrentChannelId } from '../store/channelsSlice';

const Channels = () => {
  const { data, error, loading } = useSelector((state) => state.channels);
  const dispatch = useDispatch();

  if (loading) return <h1>Fetching channels...</h1>;
  if (error) return <h1>There was an error fetching data</h1>;

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setCurrentChannelId(2))
  }

  return (
    <div>
      <h2>channels</h2>
      {data.map((channel) => (
        <div key={`channel-${channel.id}`}>
          <strong>{channel.name}</strong>
        </div>
      ))}
      <Messages />
      <button onClick={handleClick}>Fire</button>
    </div>
  );
};

export default Channels;
