import { createStore } from "redux";
import Rx from "rxjs/Rx";
import { isValidTurn, createTracker } from "./lib";
import { processTurn } from "./createMatch";
import createMatch from "./createMatch";
// input: array of Player objects each with name and points
// output: array of Player objects with updated points
class Match {
  constructor(players) {
    const match = createMatch(players);
    this.processTurn = turn => match.dispatch(processTurn(turn));
    const subject = new Rx.BehaviorSubject(match.getState());
    this.matchStatus$ = Rx.Observable.from(match)
      // .takeWhile(d => !d.players.some(p => p.cards.length === 0))
      .map(match => createTracker(match));
    // insert game ending logic here as well:
    // .takeUntil(d => d.players.some(p => p.cards.length === 0));
    // use subject.complete logic here
    this.matchStatus$.subscribe(d => subject.next(d));
    this.getMatchStatus$ = subject;
    // window.matchStats$ = subject;
    window.gs = () => match.getState();
    window.ms = () => subject.getValue();
    players.forEach(p => {
      const cardsSubject = new Rx.BehaviorSubject([]);
      const pCards$ = Rx.Observable.from(match).map(
        d => d.players.find(player => player.name === p.name).cards
      );
      // can probably decrease useless subscriptions with pairwise operator
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
