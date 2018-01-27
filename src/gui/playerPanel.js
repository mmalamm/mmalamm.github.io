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
  shouldComponentUpdate(nextProps) {
    console.log(nextProps);
    return this.props.player.cards.length !== nextProps.player.cards.length
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);

  }

  render() {
    // console.log(this.props);
    // generateValidHands(this.state.cards);
    return (
      <div>
        <HandPanel cards={this.state.cards} playTurn={this.player.playTurn} name={this.player.name} />
      </div>
    );
  }
}

export default PlayerPanel;
