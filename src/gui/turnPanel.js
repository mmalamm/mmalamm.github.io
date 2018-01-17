import React, { Component } from "react";

class TurnPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validSubmit: props.validHand
    }
  }
  render() {
    console.log(this.props);
    const jsxContent = <div className="centered">
        <p>{this.state.validSubmit && this.state.validSubmit.name}</p>
        <form>
          {this.state.validSubmit && this.state.validSubmit.cards.map(
              card => {
                let uniqKey = Date.now().toString() + card.rank();
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
              }
            )}
        </form>
      </div>;
    return (
      <div>
        {this.state.validSubmit && jsxContent}
      </div>
    );
  }
}

export default TurnPanel;
