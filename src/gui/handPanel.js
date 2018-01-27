import React, { Component } from "react";
import Card from "./cardComponent";
import handChecker from "../game/handChecker";
import TurnPanel from "./turnPanel";

class HandPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { hand: props.cards, userSelection: [], validSubmit: null };
  }

  handleClick = (e) => {
    e.preventDefault();
    const turn = {
      playerName: this.props.name,
      payload: this.state.validSubmit
    }
    this.props.playTurn(turn);
  } 

  toggleSelect = card => {
    // const vs = this.state.validSubmit;
    // this.props.validSubmit(vs);
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
        <button disabled={!Boolean(this.state.validSubmit)} onClick={this.handleClick}>Play</button>
      </div>
    );
  }
}

export default HandPanel;
