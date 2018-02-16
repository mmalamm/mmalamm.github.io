import React, { Component } from "react";
import Card from "./card";
import handChecker from "../big2/handChecker";
import PlayerInfo from "./player_info";

export const validateTurn = (tracker, hand, player) => {
  if (hand === null) return false;
  if (tracker.currentPlayerName !== player.name) return false;
  if (
    tracker.last3Turns.length === 0 &&
    !hand.cards.find(c => c.suit === "Diamonds" && c.value === "Three")
  )
    return false;
  const hand2beat = tracker.last3Turns
    .filter(({ payload: p }) => !(p._type === "PASS"))
    .pop();
  if (!hand2beat) return true;
  const output =
    hand2beat.payload._type == hand._type &&
    hand2beat.payload._strength < hand._strength;
  return output;
};

export const disablePass = (tracker, player) => {
  const isNotMyTurn = tracker.currentPlayerName !== player.name;
  const floorIsOpen = tracker.roundType === null;
  if (isNotMyTurn) return true;
  if (floorIsOpen) return true;
  return false;
};

class PlayerPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { hand: props.cards, userSelection: [], validSubmit: null };
  }

  componentWillMount() {
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
    console.log(tracker);
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
        <PlayerInfo name={this.props.p.name} score={this.props.score} />
        <button
          disabled={!Boolean(this.state.validSubmit)}
          disabled={
            !validateTurn(tracker, this.state.validSubmit, this.props.p)
          }
          onClick={this.handleClick}
        >
          出牌 PLAY
        </button>
        <button onClick={this.handlePass}>过 PASS</button>
      </div>
    );
  }
}

export default PlayerPanel;
