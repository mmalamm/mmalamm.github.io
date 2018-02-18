import React, { Component } from "react";
import HandPanel from "./handPanel";

//bring in playerInfo and turnPanel for self

class PlayerPanel extends Component {
  constructor(props) {
    super(props);
    this.player = props.player;
    this.state = {
      cards: []
    };
  }

  componentWillMount() {
    this.player.myCards$.subscribe(cards => this.setState({ cards }));
  }

  render() {
    return (
      <div>
        <HandPanel
          cards={this.state.cards}
          playTurn={this.player.playTurn}
          p={this.player}
          score={this.props.score}
        />
      </div>
    );
  }
}

export default PlayerPanel;
