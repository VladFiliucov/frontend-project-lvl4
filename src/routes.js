// @ts-check

const host = '';
const prefix = 'api/v1';

export default {
  channelsPath: () => [host, prefix, 'channels'].join('/'),
  channelPath: (id) => [host, prefix, 'channels', id].join('/'),
  channelMessagesPath: (id) => [host, prefix, 'channels', id, 'messages'].join('/'),
  // Can separate frontend and backend routing when this get's complicated
  homePath: () => '/',
  loginPath: () => '/login',
  signupPath: () => '/signup',
  loginEndpoint: () => 'api/v1/login',
  signupEndpoint: () => '/api/v1/signup',
  dataEndpoint: () => '/api/v1/data',
};
