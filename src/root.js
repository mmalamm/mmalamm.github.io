import React from 'react';
import ReactDOM from 'react-dom';

console.log('heya! world');

import Deck from './game/deck';
const myDeck = new Deck();
console.log(myDeck);

import App from './gui/app.js';

ReactDOM.render(<App deck={myDeck}/>, document.getElementById('app'));
