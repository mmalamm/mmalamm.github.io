import React, { Component } from "react";
import TurnPanel from "./turnPanel";
import HandPanel from "./handPanel";

import validHands from '../ai/vh1';

const generateValidHands = dealtCards => {
  // console.log("cards: ", dealtCards);
  const currentValidHands = validHands(dealtCards, 1);
  // console.log(currentValidHands);
  return currentValidHands;
};


class PlayerPanel extends Component {
  constructor(props) {
    super(props);
    this.player = props.player;
    this.state = {
      cards: []
    };
    // console.log(props);
    this.player.myCards$.subscribe(c => console.log(c))
    // console.log(generateValidHands(props.player.cards))
  }

  render() {
    return (
      <div>
        <HandPanel
          cards={this.state.cards}
          playTurn={this.player.playTurn}
          p={this.player}
          name={this.player.name}
        />
      </div>
    );
  }
}

export default PlayerPanel;
