import React from "react";
import PlayerPanel from "./playerPanel.js";
import OpponentsPanel from "./opponentsPanel";
import TurnPanel from "./turnPanel.js";
import PlayerInfo from "./playerInfo.js";
import SmallCard from "./smallCard";

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

  renderReplay = () => {
    const obj = this.state.history.slice().pop();
    return (
      <div>
        <div>
          <h1>{obj.winnerName} wins!</h1>
          <TurnPanel turn={obj.endState.winningTurn} />
          <div>
            <PlayerInfo
              name={obj.winnerName}
              score={this.state.score[obj.winnerName]}
            />
            {createResult(obj.result[obj.winnerName])}
          </div>
        </div>
        <div>
          <h3>Remaining Cards:</h3>
          {renderCardsLeft(obj.endState.lostCards)}
        </div>
      </div>
    );
  };

  render() {
    /// cleanup needed
    const p = this.props.player;
    const { matchInProgress: mip, history: hist } = this.state;
    const showStartScreen = !mip && !hist.length;
    const showResultScreen = !mip && hist.length;
    const showMatchScreen = mip;

    return showStartScreen ? (
      <button onClick={this.playMatch}>打比赛 Play Match</button>
    ) : showMatchScreen ? (
      <div>
        <OpponentsPanel
          score={this.state.score}
          player={p}
          trkr$={p.getMatchStatus$}
        />
        <PlayerPanel player={p} score={this.state.score[p.name]} />
      </div>
    ) : showResultScreen ? (
      <div>
        {this.renderReplay()}
        <button onClick={this.playMatch}>下一场比赛 Next Match</button>
      </div>
    ) : null;
  }
}

const createResult = num => {
  const stilo = {
    height: "2rem",
    fontSize: "1.5rem",
    color: num > 0 ? "green" : "red"
  };
  return <div style={stilo}>{num}</div>;
};

const renderCardsLeft = obj => {
  const stilo = { display: "flex", marginLeft: "1rem", height: "4rem" };
  const cardsLeftJSX = [];
  for (let loser in obj) {
    const item = (
      <div key={loser}>
        <div>{loser}</div>
        <div style={stilo}>
          {obj[loser].map(card => {
            let uniqKey = Date.now().toString() + card._rank;
            let selectionState = false;
            return (
              <div key={uniqKey}>
                <SmallCard
                  selected={selectionState}
                  value={card.value}
                  suit={card.suit}
                />
              </div>
            );
          })}
          {createResult(-obj[loser].length)}
        </div>
      </div>
    );
    cardsLeftJSX.push(item);
  }
  return cardsLeftJSX;
};

export default App;
