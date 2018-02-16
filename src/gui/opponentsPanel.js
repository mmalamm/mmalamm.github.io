import React, { Component } from "react";
import PlayerInfo from "../gui2/player_info";
import TurnPanel from "../gui2/turn_panel";

const OpponentCards = ({ num }) => {
  const box = "▋";
  return <div style={{ color: "blue", fontSize: "18" }}>{box.repeat(num)}</div>;
};

const getPlayerTurn = (name, trkr) => {
  return trkr.last3Turns.find(t => t.playerName === name);
};

const OpponentPanel = props => {
  const style = {
    width: "30rem",
    flex: "flex-end",
    marginRight: "2rem"
  };
  return (
    <div style={style}>
      <div style={{ display: "flex" }}>
        <div>
          <OpponentCards num={props.numCardsLeft} />
        </div>
        <div>
          <PlayerInfo name={props.name} score={props.score} />
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
          return (
            <OpponentPanel
              key={o.name}
              numCardsLeft={this.state.cardsLeft[o.name]}
              score={this.props.score[o.name]}
              name={o.name}
              turn={getPlayerTurn(o.name, this.state)}
            />
          );
        })}
      </div>
    );
  }
}

export default OpponentsPanel;
