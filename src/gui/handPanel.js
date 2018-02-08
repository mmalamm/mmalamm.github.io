import React, { Component } from "react";
import Card from "./cardComponent";
import handChecker from "../game/handChecker";
import TurnPanel from "./turnPanel";
import { validateTurn, disablePass } from "./lib";

class HandPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { hand: props.cards, userSelection: [], validSubmit: null };
  }

  componentWillMount() {
    this.props.p.getMatchStatus$.subscribe(d => {
      console.log(this.props.p.name, d);
    });
    this.props.p.myCards$.subscribe(d => {
      this.setState({ hand: d, userSelection: [], validSubmit: null });
    });
  }

  handleClick = e => {

    e.preventDefault();
    const turn = {
      playerName: this.props.p.name,
      name: this.state.validSubmit.name,
      payload: this.state.validSubmit
    };
    this.props.p.playTurn(turn);
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
    return (
      <div>
        <form>
          {this.state.hand.map(card => {
            let uniqKey = Date.now().toString() + card._rank;
            let selectionState = this.state.userSelection.find(c => c === card);
            return (
              <div key={uniqKey} onClick={this.toggleSelect(card)}>
                <Card
                  selected={selectionState}
                  value={card.value}
                  suit={card.suit}
                />
              </div>
            );
          })}
        </form>
        <TurnPanel validHand={this.state.validSubmit} />
        <div>{this.props.p.name}</div>
        <button
          disabled={!Boolean(this.state.validSubmit)}
          disabled={
            !validateTurn(
              tracker,
              this.state.validSubmit,
              this.props.p
            )
          }
          onClick={this.handleClick}
        >
          出牌
        </button>
        <button onClick={this.handlePass}>过</button>
      </div>
    );
  }
}

export default HandPanel;
