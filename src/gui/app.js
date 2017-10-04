import React from 'react';
import Card from './cardComponent';
import handChecker from '../game/handChecker';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClear = this.handleClear.bind(this);
    this.newDeal = this.newDeal.bind(this);
    this.toggleSelect = this.toggleSelect.bind(this);
    this.state = {
      hand: this.props.deck.deal(),
      userSelection: [],
      validSubmit: null
    };
  }

  newDeal(e) {
    e.preventDefault();
    this.setState(() => ({
      hand: this.props.deck.deal(),
      userSelection: [],
      validSubmit: null
    }));
  }

  handleClear(e) {
    e.preventDefault();
    this.setState(() => ({
      userSelection: [],
      validSubmit: null
    }));
  }

  toggleSelect(card) {
    return e => this.setState(prevState => {
      let newSelection = (prevState.userSelection.indexOf(card) === -1) ?
        prevState.userSelection.concat(card) :
        prevState.userSelection.filter(c => c !== card);
      return {
        userSelection: newSelection,
        validSubmit: handChecker(newSelection)
      };
    });
  }

  render() {
    return (
      <div className="container">
        <h1>Big 2 Hand Checker</h1>
        <p>Select some cards to check a hand!</p>
        <div>
          <form>
            {
              this.state.hand.map(card => {
                let uniqKey = Date.now().toString() + card.rank();
                let selectionState = this.state.userSelection.find(c => c === card);
                return (
                  <div
                    key={uniqKey}
                    onClick={this.toggleSelect(card)}>
                    <Card
                      selected={selectionState}
                      value={card.value}
                      suit={card.suit} />
                  </div>
                );
              })
            }
          </form>
        </div>
        <div>
          <button onClick={this.handleClear}>
            Clear Selection
          </button>
          <button onClick={this.newDeal}>
            Deal
          </button>
        </div>
        <div>
          { this.state.validSubmit && (
            <div>
              <p>{this.state.validSubmit.name}</p>
              <form>
                {
                  this.state.validSubmit.cards.map(card => {
                    let uniqKey = Date.now().toString() + card.rank();
                    let selectionState = false;
                    return (
                      <div key={uniqKey}>
                        <Card
                          selected={selectionState}
                          value={card.value}
                          suit={card.suit} />
                      </div>
                    );
                  })
                }
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
