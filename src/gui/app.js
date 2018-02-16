import React from "react";
import PlayerPanel from "./playerPanel.js";
import OpponentsPanel from "./opponentsPanel";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: {},
      history: [],
      matchInProgress: false
    };
  }
  componentWillMount() {
    const game = this.props.game;
    game.getGameStatus$.subscribe(d => {
      this.setState(d);
    });
  }
  playMatch = e => {
    e.preventDefault();
    if (this.props.game.currentMatch)
      return console.log("finish the ongoing game first");
    this.props.game.play();
  };

  renderScores = () => (
    <ul>
      {this.props.game.players.map(({ name }) => {
        const hist = this.state.history;
        const result = hist[hist.length - 1].result;
        const color = result[name] > 0 ? "green" : "red";
        const diff = <span style={{ color }}>{result[name]}</span>;
        return (
          <li key={name}>
            {name}: {this.state.score[name]} ({diff})
          </li>
        );
      })}
    </ul>
  );

  render() {
    const p = this.props.player;
    return this.state.matchInProgress ? (
      <div className="container">
        <OpponentsPanel
          score={this.state.score}
          player={p}
          trkr$={p.getMatchStatus$}
        />
        <PlayerPanel player={p} score={this.state.score[p.name]} />
      </div>
    ) : (
      <div className="container">
        <div>{this.state.history.slice().pop().winnerName} wins!</div>
        <div>Scores:</div>
        {this.renderScores()}
        <button onClick={this.playMatch}>Next Match</button>
      </div>
    );
  }
}

export default App;
