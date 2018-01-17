import React from "react";
import Card from "./cardComponent";
import handChecker from "../game/handChecker";
import validHands from "../game/validHands";
import PlayerPanel from "./playerPanel.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: props.game
    };
  }

  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.game.players.map((p, i) => (
          <PlayerPanel key={i} player={p} />
        ))}
      </div>
    );
  }
}

export default App;
