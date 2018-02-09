import { createStore } from "redux";
import Rx from "rxjs/Rx";

import { isValidTurn, createTracker } from "./lib1";
import { processTurn } from './createMatch';
import createMatch from './createMatch'
// input: array of Player objects each with name and points
// output: array of Player objects with updated points

class Match {
  constructor(players) {
    const match = createMatch(players);
    // window.match = match;
    this.processTurn = turn => match.dispatch(processTurn(turn));
    const subject = new Rx.BehaviorSubject(match.getState());
    this.matchStatus$ = Rx.Observable.from(match).map(
      match => createTracker(match)
    );
    this.matchStatus$.subscribe(d => subject.next(d));
    this.getMatchStatus$ = subject;

    players.forEach(p => {
      const cardsSubject = new Rx.BehaviorSubject([]);
      const pCards$ = Rx.Observable.from(match).map(
        d => d.players.find(player => player.name === p.name).cards
      );
      pCards$.subscribe(c => cardsSubject.next(c));
      p.registerMatch(this.playTurn, this.getMatchStatus$, cardsSubject);
    });
  }

  playTurn = turn => {
    const tracker = this.getMatchStatus$.getValue();
    const isMyTurn = turn.playerName === tracker.currentPlayerName;
    if (isMyTurn && isValidTurn(tracker, turn)) {
      this.processTurn(turn);
    }
  };
}

export default Match;
