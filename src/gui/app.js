import React from "react";
import PlayerPanel from "./playerPanel.js";

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
    return this.state.matchInProgress ? (
      <div className="container">
        {this.props.game.players.map((p, i) => (
          <PlayerPanel key={i} player={p} score={this.state.score[p.name]} />
        ))}
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
