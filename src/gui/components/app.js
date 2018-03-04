import React from "react";
import PlayerPanel from "./playerPanel/playerPanel";
import OpponentsPanel from "./opponentsPanel/opponentsPanel";
import EndScreen from "./endScreen/endScreen";
import StartScreen from "./startScreen/startScreen";

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

  renderReplay = () => {
    const histObj = this.state.history.slice().pop();
    const scoreObj = this.state.score;
    return <EndScreen histObj={histObj} scoreObj={scoreObj} />;
  };

  render() {
    /// cleanup needed
    const p = this.props.player;
    const { matchInProgress: mip, history: hist } = this.state;
    const showStartScreen = !mip && !hist.length;
    const showResultScreen = !mip && hist.length;
    const showMatchScreen = mip;

    return showStartScreen ? (
      <StartScreen playMatch={this.playMatch} />
    ) : showMatchScreen ? (
      <div className="grd">
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
        <div className="nextButton" onClick={this.playMatch}>
          下一场比赛 Next Match ›››››
        </div>
      </div>
    ) : null;
  }
}

export default App;
