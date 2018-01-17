import React, { Component } from "react";
import TurnPanel from './turnPanel';
import HandPanel from './handPanel';

class PlayerPanel extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.player = props.player;
    this.cards = props.player.hand;
    this.validHand = null
  }

  render() {
    // console.log(this.props);
    return (
      <div>
        <TurnPanel validHand={this.validHand} />
        <HandPanel cards={this.cards} />
      </div>
    );
  }
}

export default PlayerPanel;