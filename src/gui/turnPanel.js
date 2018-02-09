import React, { Component } from "react";
import Card from "./cardComponent";

class TurnPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validSubmit: props.validHand
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !(this.props.validHand === nextProps.validHand)
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ validSubmit: nextProps.validHand });
  }
  render() {
    const jsxContent = this.state.validSubmit ? (
      <div>
        <p>{this.state.validSubmit.name}</p>
        <form>
          {this.state.validSubmit.cards.map(card => {
            let uniqKey = Date.now().toString() + card._rank;
            let selectionState = false;
            return (
              <div key={uniqKey}>
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
    ) : null;
    return (
      <div>
        <p>{this.state.validSubmit && this.state.validSubmit.name}</p>
        <form>
          {this.state.validSubmit &&
            this.state.validSubmit.cards.map(card => {
              let uniqKey = Date.now().toString() + card._rank;
              let selectionState = false;
              return (
                <div key={uniqKey}>
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

export default TurnPanel;
