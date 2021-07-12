import React from 'react';
import { useSelector } from 'react-redux';

import Messages from './Messages';
import Channel from './Channel';
import ChannelHeader from './ChannelHeader';

const Channels = () => {
  const { data, error, loading } = useSelector((state) => state.channels);

  if (loading) return <h1>Fetching channels...</h1>;
  if (error) return <h1>There was an error fetching data</h1>;

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <ChannelHeader />
          <ul className="nav flex-column nav-pills nav-fill px-2">
            {data.map((channel) => <Channel key={`channel-${channel.id}`} channel={channel} />)}
          </ul>
        </div>
        <Messages />
      </div>
    </div>
  );
};

export default Channels;
