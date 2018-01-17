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
    console.log(props);
    super(props);
    this.player = props.player;
    this.state = {
      cards: props.player.hand
    };
  }

  render() {
    // console.log(this.props);
    generateValidHands(this.state.cards);
    return (
      <div>
        <HandPanel cards={this.state.cards} />
      </div>
    );
  }
}

export default PlayerPanel;
