import React from 'react';
import ReactDOM from 'react-dom';

import Deck from './game/deck';
const myDeck = new Deck();

const name = prompt('enter name');
const game = new Game(name);
game.addPlayer('nafis');
game.addPlayer('rishat');
game.addPlayer('andrew');

import App from './gui/app1.js';

const rootElement = document.getElementById('app');

ReactDOM.render(<App game={game} />, rootElement);
