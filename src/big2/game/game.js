import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/observable/from";
import Player from "../player";
import Match from "../match/match";
import AiPlayer from "../ai/ai_player";

import { processMatch, setMatchInProgress, createGame } from "./createGame";

class Game {
  constructor(user) {
    const p0 = new Player(user);
    this.players = [p0];
    this.history = [];
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
    this.setMatchInProgress = () => game.dispatch(setMatchInProgress());
    const subject = new BehaviorSubject(game.getState());
    this.gameStatus$ = Observable.from(game);
    this.gameStatus$.subscribe(d => {
      subject.next(d);
    });
    this.getGameStatus$ = subject;

    ///// testing purposes only
    window._gs = () => game.getState();
    window.gs = () => subject.getValue();
    /////
  }

  runMatch = () => {
    const players = this.players;
    const match = new Match(players);
    this.currentMatch = match;
    this.setMatchInProgress();
    return new Promise((resolve, reject) => {
      match.getMatchStatus$.subscribe(
        d => console.log("match updated"),
        e => reject(Error(e)),
        d => resolve(match.getMatchStatus$.getValue())
      );
    });
  };

  play() {
    if (!this.currentMatch) {
      this.runMatch().then(result => {
        ///////////
        window._ms = null;
        window.ms = null;
        //////////
        this.processMatch(result);
        this.currentMatch = null;
      });
    } else {
      return console.log("finish this match first silly");
    }
  }
}

export default Game;
