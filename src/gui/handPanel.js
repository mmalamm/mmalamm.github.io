import React, { Component } from "react";
import Card from "./cardComponent";
import handChecker from "../game/handChecker";

class HandPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { hand: props.cards, userSelection: [], validSubmit: null };
  }

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
  }
  render() {
    console.log(this.props);
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
      </div>
    );
  }
}

export default HandPanel;
