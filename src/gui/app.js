import React from "react";
import PlayerPanel from "./playerPanel.js";

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   const game = props.game;
  //   // this.state = {
  //   //   game: props.game
  //   // };
  // }
  playMatch = e => {
    e.preventDefault();
    if (this.props.game.currentMatch) return console.log('finish the ongoing game first');
    this.props.game.play();
    this.forceUpdate();
  }

  render() {
    return (
      <div className="container">
        <button onClick={this.playMatch}>Play Match</button>
        {this.props.game.players.map((p, i) => (
          <PlayerPanel key={i} player={p} />
        ))}
      </div>
    );
  }
}

export default App;
