import React, { Component } from "react";
import Card from "./cardComponent";
import handChecker from "../game/handChecker";
import TurnPanel from "./turnPanel";
import { validateTurn } from "./lib";

class HandPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { hand: props.cards, userSelection: [], validSubmit: null };
  }

  handleClick = e => {
    e.preventDefault();
    const turn = {
      playerName: this.props.name,
      name: this.state.validSubmit.name,
      payload: this.state.validSubmit
    };
    const updatedHand = this.props.playTurn(turn);
    this.setState({
      hand: updatedHand,
      userSelection: [],
      validSubmit: null
    });
  };
  handlePass = e => {
    e.preventDefault();
    const pass = handChecker("PASS");
    const turn = {
      playerName: this.props.name,
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
    return (
      <div>
        <form>
          {this.state.hand.map(card => {
            let uniqKey = Date.now().toString() + card.rank();
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
        <button
          // disabled={!Boolean(this.state.validSubmit)}
          disabled={
            !validateTurn(
              this.props.p.matchStatus,
              this.state.validSubmit,
              this.props.p
            )
          }
          onClick={this.handleClick}
        >
          Play
        </button>
        <button onClick={this.handlePass}>Pass</button>
      </div>
    );
  }
}

export default HandPanel;
