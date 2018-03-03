import React from "react";
import ReactDOM from "react-dom";
import "./gui/styles/styles.scss";

import Game from "./big2/game/game";

const name = "Ayesha";
const game = new Game(name);
game.addAiPlayer("Laila");
game.addAiPlayer("Hana");
game.addAiPlayer("Zara");
game.start();

//////////////
import { generateValidHands } from "./big2/ai/valid_hands";
window.ayesha = "Ayesha";
window.laila = "Laila";
window.hana = "Hana";
window.zara = "Zara";
window.vh = cards => generateValidHands(cards);
window.gh = playerName => generateValidHands(_ms().initDeal[playerName]);
window.sh = playerName => _ms().players.find(p => p.name === playerName).cards;
//////////////

import App from "./gui/components/app";

const rootElement = document.getElementById("app");

ReactDOM.render(<App game={game} player={game.players[0]} />, rootElement);
