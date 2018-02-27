import React, { Component } from "react";
import PlayerInfo from "./playerInfo";
import TurnPanel from "./turnPanel";
import OpponentCards from "./components/opponentsPanel/opponentCards";

const getPlayerTurn = (name, trkr) => {
  return trkr.last3Turns.find(t => t.playerName === name);
};

const OpponentPanel = props => {
  const style = {
    width: "30rem",
    flex: "flex-end",
    marginRight: "2rem",
    backgroundColor: props.isMyTurn ? "#00001a" : "inherit"
  };
  return (
    <div style={style}>
      <div style={{ display: "flex" }}>
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
    const style = {
      display: "flex",
      height: "20rem"
    };
    return (
      <div style={style}>
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
