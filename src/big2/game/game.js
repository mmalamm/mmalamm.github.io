import Rx from "rxjs/Rx";
import Player from "../player";
import Match from "../match/match";
import AiPlayer from "../../ai/ai_player";

import { processMatch, setMatchInProgress, createGame } from "./createGame";

class Game {
  constructor(user) {
    const p0 = new Player(user);
    this.players = [p0];
    this.history = [];
    // this.currentMatch = null;
    // this.keepPlaying = true;
  }

  addPlayer(user) {
    this.players.push(new Player(user));
  }

  addAiPlayer(user) {
    this.players.push(new AiPlayer(user));
  }

  start() {
    const game = createGame(this.players);
    this.processMatch = result => game.dispatch(processMatch(result));
    this.setMatchInProgress = () => game.dispatch(setMatchInProgress())
    const subject = new Rx.BehaviorSubject(game.getState());
    this.gameStatus$ = Rx.Observable.from(game);
    this.gameStatus$.subscribe(d => {
      subject.next(d);
    });
    this.getGameStatus$ = subject;

    ///// testing purposes only
    window._gs = () => game.getState();
    window.gs = () => subject.getValue();
    /////
  }

  play() {
    if (!this.currentMatch) {
      runMatch(this).then(game => {
        ///////////
        window._ms = null;
        window.ms = null;
        //////////
        const result = game.currentMatch.getMatchStatus$.getValue();
        // game.history.push(result);
        // console.log("here is your game:::>", game);
        // game.players.forEach(p => {
        //   p.points += result.result[p.name];
        // });
        game.processMatch(result);

        game.currentMatch = null;
      });
    } else {
      return console.log("finish this match first silly");
    }
  }
}

export default Game;

const runMatch = game => {
  const players = game.players;
  const match = new Match(players);
  game.currentMatch = match;
  game.setMatchInProgress();
  return new Promise((resolve, reject) => {
    match.getMatchStatus$.subscribe(
      d => console.log("match updated"),
      e => reject(Error(e)),
      d => resolve(game)
    );
  });
};