import React, { Component } from "react";
import TurnPanel from './turnPanel';
import HandPanel from './handPanel';

class PlayerPanel extends Component {
  constructor(props) {
    this.player = props.player;
    this.cards = props.player.cards;
    this.validHand = null
  }

  render() {
    return (
      <div>
        <TurnPanel validHand={this.validHand} />
        <HandPanel cards={this.cards} />
      </div>
    );
  }
}

export default PlayerPanel;