import React, { Component } from "react";
import { validateTurn, disablePass } from "./lib";
import Card from "../common/cardComponent";
import PlayerInfo from "../common/playerInfo";
import handChecker from "../../../big2/handChecker";
import ButtonsPanel from "./buttonsPanel";

class HandPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hand: props.cards,
      userSelection: [],
      validSubmit: null,
      disablePass: true
    };
  }

  componentWillMount() {
    const { p } = this.props;
    p.myCards$.subscribe(d => {
      this.setState(s => ({
        ...s,
        hand: d,
        userSelection: [],
        validSubmit: null
      }));
    });
    p.getMatchStatus$.subscribe(d => {
      this.setState(s => ({ ...s, disablePass: disablePass(d, p) }));
    });
  }

  handleClick = e => {
    e.preventDefault();
    const turn = {
      playerName: this.props.p.name,
      name: this.state.validSubmit.name,
      payload: this.state.validSubmit
    };
    this.props.playTurn(turn);
  };
  handlePass = e => {
    e.preventDefault();
    const tracker = this.props.p.getMatchStatus$.getValue();
    if (disablePass(tracker, this.props.p))
      return console.log("Cannot pass this round");
    const pass = handChecker("PASS");
    const turn = {
      playerName: this.props.p.name,
      name: "PASS",
      payload: pass
    };
    this.props.playTurn(turn);
    this.setState({
      userSelection: [],
      validSubmit: null
    });
  };

  toggleSelect = card => {
    return e =>
      this.setState(prevState => {
        let newSelection =
          prevState.userSelection.indexOf(card) === -1
            ? prevState.userSelection.concat(card)
            : prevState.userSelection.filter(c => c !== card);
        return {
          userSelection: newSelection,
          validSubmit: handChecker(newSelection)
        };
      });
  };
  render() {
    const tracker = this.props.p.getMatchStatus$.getValue();
    console.log(tracker);
    return (
      <div>
        <div className="handPanel">
          {this.state.hand.map(card => {
            let uniqKey = Date.now().toString() + card._rank;
            let selectionState = this.state.userSelection.find(c => c === card);
            return (
              <div
                className="handPanel__cardContainer"
                key={uniqKey}
                onClick={this.toggleSelect(card)}
              >
                <Card
                  selected={selectionState}
                  value={card.value}
                  suit={card.suit}
                />
              </div>
            );
          })}
        </div>
        <div className="playerPanel__playerInfo">
          <PlayerInfo name={this.props.p.name} score={this.props.score} />
        </div>
        <ButtonsPanel
          disablePlay={
            !validateTurn(tracker, this.state.validSubmit, this.props.p)
          }
          disablePass={this.state.disablePass}
          playTurn={this.handleClick}
          passTurn={this.handlePass}
        />
      </div>
    );
  }
}

export default HandPanel;
