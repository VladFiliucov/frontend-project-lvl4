import React, { useState, useEffect } from 'react';
import axios from 'axios';

const fetchChannels = (user) => axios({
  method: 'get',
  headers: { Authorization: `Bearer ${user.token}` },
  url: '/api/v1/data',
});

const Channels = ({ user }) => {
  const [usersChannels, setUsersChannels] = useState([]);

  useEffect(() => {
    fetchChannels(user).then(({ data: { channels, messages, currentChannelId } }) => {
      setUsersChannels(channels);
    });
  });

  return (
    <div>
      <h2>Show channels</h2>
      {usersChannels.length && usersChannels.map((channel) => <p>{channel.name}</p>)}
    </div>
  );
};

export default Channels;
