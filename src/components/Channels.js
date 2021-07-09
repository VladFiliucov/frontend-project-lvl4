import React from 'react';
import { useSelector } from 'react-redux';

import Messages from './Messages';
import Channel from './Channel';
import ChannelHeader from './ChannelHeader';

const Channels = ({ inputRef }) => {
  const { data, error, loading } = useSelector((state) => state.channels);

  if (loading) return <h1>Fetching channels...</h1>;
  if (error) return <h1>There was an error fetching data</h1>;

  return (
    <div>
      <ChannelHeader />
      <ul>
        {data.map((channel) => <Channel key={`channel-${channel.id}`} channel={channel} inputRef={inputRef} />)}
      </ul>
      <Messages />
    </div>
  );
};

export default Channels;
