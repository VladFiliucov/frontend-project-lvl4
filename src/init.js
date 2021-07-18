import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';
import runApp from '.';

const start = async () => {
  const appWithSocket = await runApp(io());
  const container = document.querySelector('#chat');

  ReactDOM.render(appWithSocket, container);
};

start();
