// @ts-check
import React from 'react';
import ReactDOM from 'react-dom';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import App from './components/App.jsx';
import Modal from './components/Modal.jsx';

import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const container = document.querySelector('#chat');
const modalContainer = document.querySelector('#modal');

const runApp = () => {
  ReactDOM.render(<App />, container);
  ReactDOM.render(<Modal />, modalContainer);
};

runApp();

// const p = document.createElement('p');
// p.classList.add('card-text');
// p.textContent = 'It works!';

// const h5 = document.createElement('h5');
// h5.classList.add('card-title');
// h5.textContent = 'Project Slackwannabe';

// const cardBody = document.createElement('div');
// cardBody.classList.add('card-body');
// cardBody.append(h5, p);

// const card = document.createElement('div');
// card.classList.add('card', 'text-center');
// card.append(cardBody);

// container.append(card);

// console.log('it works!');
