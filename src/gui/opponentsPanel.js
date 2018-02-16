import React, { Component } from "react";
//import playerinfo
import PlayerInfo from "../gui2/player_info";
//import APPROPRIATE turn panel
import TurnPanel from "../gui2/turn_panel";

const OpponentCards = ({ num }) => {
  const box = "牌 ▋";
  return (
    <div>
      {box} x {num}
    </div>
  );
};

const getPlayerTurn = (name, trkr) => {
  return trkr.last3Turns.find(t => t.playerName === name);
};

const OpponentPanel = props => {
  // takes numCardsLeft, score, name, turn
  return (
    <div>
      <div>
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
    return (
      <div>
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