import React from 'react';
import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';
import runApp from '.';

const container = document.querySelector('#chat');

// runApp(io);
ReactDOM.render(runApp(io()), container);
