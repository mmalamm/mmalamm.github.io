import React from "react";
import ReactDOM from "react-dom";

import Game from "./big2/game/game";

const name = "Ayesha";
const game = new Game(name);
game.addAiPlayer("Laila");
game.addAiPlayer("Hana");
game.addAiPlayer("Zara");
game.start();
game.play();

import App from "./gui/app.js";

const rootElement = document.getElementById("app");

ReactDOM.render(<App game={game} player={game.players[0]} />, rootElement);
