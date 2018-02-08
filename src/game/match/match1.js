import { createStore } from "redux";
import Rx from "rxjs/Rx";

import Deck from "../deck";
import { isValidTurn, diffCards, nextPlayer } from "./lib1";
// input: array of Player objects each with name and points
// output: array of Player objects with updated points

// action types
const o = ["UPDATE_PLAYERS", "SET_CURRENT_PLAYER_NAME", "ADD_TURN", "PROCESS_TURN"].reduce(
  (a, s) => {
    a[s] = s;
    return a;
  },
  {}
);
const { UPDATE_PLAYERS, SET_CURRENT_PLAYER_NAME, ADD_TURN, PROCESS_TURN } = o;

// action creators
const updatePlayers = players => ({
  type: UPDATE_PLAYERS,
  players
});

const setCurrentPlayerName = currentPlayerName => ({
  type: SET_CURRENT_PLAYER_NAME,
  currentPlayerName
});

const addTurn = turn => ({
  type: ADD_TURN,
  turn
});

const processTurn = turn => ({
  type: PROCESS_TURN,
  turn
});

const getFirstPlayerName = players => {
  return players.find(p =>
    p.cards.filter(c => c.suit === "Diamonds" && c.value === "Three").length
  ).name;
};

const dd = input => JSON.parse(JSON.stringify(input));


const createMatch = players => {
  const deck = new Deck();
  const dealtPlayers = deck.deal(players);
  const firstPlayerName = getFirstPlayerName(dealtPlayers);
  const MATCH_INIT_STATE = {
    players: dealtPlayers,
    currentPlayerName: firstPlayerName,
    turns: []
  };
  const matchReducer = (state = MATCH_INIT_STATE, action) => {
    switch (action.type) {
      case PROCESS_TURN:
        // sequence to process a whole turn;
        /*
          1. remove the cards from teh turn-players hand
          
          2. add the turn to the pile
          3. update the current player to the next player
        */
        const _currentPlayer = state.players.find(
          p => p.name === action.turn.playerName
        );
        const currentCards = _currentPlayer.cards;
        const turnCards = action.turn.payload.cards;
        const updatedHand = diffCards(currentCards, turnCards);
        const updatedPlayers = state.players.slice().map(p => {
          if (p.name === _currentPlayer.name)
            return dd({ name: p.name, cards: updatedHand });
          return dd(p);
        });
        const updatedTurns = dd(state.turns).concat(dd(action.turn));
        const updatedCurrentPlayerName = nextPlayer(state, action.turn).name;
        return {
          currentPlayerName: updatedCurrentPlayerName,
          players: updatedPlayers,
          turns: updatedTurns
        }
      default:
        return state;
    }
  };
  return createStore(matchReducer);
};

class Match {
  constructor(players) {
    const match = createMatch(players);
    window.match = match;
    this.updatePlayers = players => match.dispatch(updatePlayers(players));
    this.setCurrentPlayerName = name =>
      match.dispatch(setCurrentPlayerName(name));
    this.addTurn = turn => match.dispatch(addTurn(turn));
    this.processTurn = turn => match.dispatch(processTurn(turn));

    const subject = new Rx.BehaviorSubject(match.getState());
    this.matchStatus$ = Rx.Observable.from(match).map(
      ({ players, currentPlayerName, turns }) => ({
        players: players.map(({ name, points }) => ({ name, points })),
        currentPlayerName,
        last3Turns: turns.slice(-3)
      })
    );
    this.matchStatus$.subscribe(d => subject.next(d));
    this.getMatchStatus$ = subject;

    players.forEach(p => {
      p.playTurn = this.playTurn;
      p.getMatchStatus$ = this.getMatchStatus$;
      p.myCards$ = Rx.Observable.from(match).map(
        d => d.players.find(player => player.name === p.name).cards
      );
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
