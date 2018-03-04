import React, { Component } from "react";
import HandPanel from "./handPanel";
import TurnPanel from "../common/turnPanel";

//bring in playerInfo and turnPanel for self

class PlayerPanel extends Component {
  constructor(props) {
    super(props);
    this.player = props.player;
    this.state = {
      cards: [],
      turn: {},
      currentPlayerName: ""
    };
  }

  componentWillMount() {
    this.player.myCards$.subscribe(cards => this.setState({ cards }));
    this.player.getMatchStatus$.subscribe(trkr => {
      if (!trkr.last3Turns) return;
      const turn = trkr.last3Turns.find(t => t.playerName === this.player.name);
      const { currentPlayerName } = trkr;
      this.setState({ turn, currentPlayerName });
    });
  }

  render() {
    const backgroundColor =
      this.state.currentPlayerName === this.player.name ? "#00001a" : "inherit";
    return (
      <div className="playerPanel" style={{ backgroundColor }}>
        <div className="playerPanel__turnPanel">
          <TurnPanel turn={this.state.turn} />
        </div>
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
