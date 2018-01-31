import React, { Component } from "react";
import TurnPanel from "./turnPanel";
import HandPanel from "./handPanel";
import validHands from "../game/validHands";

const generateValidHands = dealtCards => {
  console.log("cards: ", dealtCards);
  const currentValidHands = validHands(dealtCards, 2);
  console.log(currentValidHands);
  return currentValidHands;
};

class PlayerPanel extends Component {
  constructor(props) {
    super(props);
    this.player = props.player;
    this.state = {
      cards: props.player.cards
    };
  }

  render() {
    const isMyTurn =
      this.player.name === this.player.matchStatus.currentPlayerName;
    return (
      <div style={{ backgroundColor: isMyTurn ? "#2E4053" : "black" }}>
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
