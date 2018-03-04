import React, { Component } from "react";
import PlayerInfo from "../common/playerInfo";
import TurnPanel from "../common/turnPanel";
import OpponentCards from "./opponentCards";

const getPlayerTurn = (name, trkr) => {
  return trkr.last3Turns.find(t => t.playerName === name);
};

const OpponentPanel = props => {
  const style = {
    backgroundColor: props.isMyTurn ? "#00001a" : "inherit"
  };
  return (
    <div className="opponentPanel" style={style}>
      <div className="opponentPanel__infoCards" style={{ display: "flex" }}>
        <div style={{ margin: "1.5rem 1rem 0 0" }}>
          <PlayerInfo name={props.name} score={props.score} />
        </div>
        <div>
          <OpponentCards num={props.numCardsLeft} />
        </div>
      </div>
      <div>
        <TurnPanel turn={props.turn} />
      </div>
    </div>
  );
};

class OpponentsPanel extends Component {
  constructor(props) {
    super(props);
    this.trkr$ = props.trkr$;
    this.state = {
      players: [],
      currentPlayerName: "",
      last3Turns: [],
      cardsLeft: {},
      turn2Beat: null
    };
  }
  componentWillMount() {
    this.trkr$.subscribe(d => {
      this.setState(d);
    });
  }
  render() {
    const opponents = this.state.players.filter(
      p => p.name !== this.props.player.name
    );
    return (
      <div className="opponentsPanel">
        {opponents.map(o => {
          const isMyTurn = o.name === this.state.currentPlayerName;
          return (
            <OpponentPanel
              key={o.name}
              numCardsLeft={this.state.cardsLeft[o.name]}
              score={this.props.score[o.name]}
              name={o.name}
              turn={getPlayerTurn(o.name, this.state)}
              isMyTurn={isMyTurn}
            />
          );
        })}
      </div>
    );
  }
}

export default OpponentsPanel;
