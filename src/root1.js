import React from "react";
import ReactDOM from "react-dom";

import Game from "./game/game";
import Deck from "./game/deck";
const myDeck = new Deck();

const name = "Ayesha";
const game = new Game(name);
game.addPlayer("Laila");
game.addPlayer("Hana");
game.addPlayer("Zara");
game.play();

import App from "./gui/app1.js";

const rootElement = document.getElementById("app");

ReactDOM.render(<App game={game} />, rootElement);
