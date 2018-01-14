import React from 'react';
import Card from './cardComponent';
import handChecker from '../game/handChecker';
import validHands from '../game/validHands';
import PlayerPanel from './playerPanel.js';

class App extends React.Component {
  constructor(props) {
    this.state = {
      match: props.match
    }
  }

  render() {
    return (
      <div>
        {this
          .state
          .match
          .players
          .map(p => <PlayerPanel player={p}/>)}
      </div>
    )
  }
}

export default App;
