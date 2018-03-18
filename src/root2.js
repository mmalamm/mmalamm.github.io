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

debugger;
import App from "./gui2/components/app";
