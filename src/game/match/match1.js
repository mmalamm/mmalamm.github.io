import { createStore } from "redux";
import Rx from "rxjs/Rx";

import Deck from "../deck";
// input: array of Player objects each with name and points
// output: array of Player objects with updated points

// action types
const o = ["UPDATE_PLAYERS", "SET_CURRENT_PLAYER_NAME", "ADD_TURN"].reduce(
  (a, s) => {
    a[s] = s;
    return a;
  },
  {}
);
const { UPDATE_PLAYERS, SET_CURRENT_PLAYER_NAME, ADD_TURN } = o;

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

// reducer
// const MATCH_INIT_STATE = {
//   players: [],
//   currentPlayerName: "",
//   turns: []
// };

// const matchReducer = (state = MATCH_INIT_STATE, action) => {
//   switch (action.type) {
//     case UPDATE_PLAYERS:
//       return {
//         ...state,
//         players: action.players
//       };
//     case SET_CURRENT_PLAYER_NAME:
//       return {
//         ...state,
//         currentPlayerName: action.currentPlayerName
//       };
//     case ADD_TURN:
//       return {
//         ...state,
//         turns: state.turns.concat([action.turn])
//       };
//     default:
//       return state;
//   }
// };

const getFirstPlayerName = players => {
  return players.find(p =>
    p.cards.filter(c => c.suit === "Diamonds" && c.value === "Three")
  ).name;
};

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
      case UPDATE_PLAYERS:
        return { ...state, players: action.players };
      case SET_CURRENT_PLAYER_NAME:
        return { ...state, currentPlayerName: action.currentPlayerName };
      case ADD_TURN:
        return { ...state, turns: state.turns.concat([action.turn]) };
      default:
        return state;
    }
  };
  return createStore(matchReducer);
};
// export default createStore(matchReducer);

class Match {
  constructor(players) {
    const match = createMatch(players);
    window.match = match;
    this.updatePlayers = players => match.dispatch(updatePlayers(players));
    this.setCurrentPlayerName = name =>
      match.dispatch(setCurrentPlayerName(name));
    this.addTurn = turn => match.dispatch(addTurn(turn));

    this.matchStatus$ = Rx.Observable.from(match).map(
      ({ players, currentPlayerName, turns }) => ({
        players: players.map(({ name, points }) => ({ name, points })),
        currentPlayerName,
        last3Turns: turns.slice(-3)
      })
    );
    players.forEach(p => {
      p.matchStatus$ = this.matchStatus$;
      p.myCards$ = Rx.Observable.from(match).map(
        d => d.players.find(player => player.name === p.name).cards
      );
    });
  }

  playTurn = turn => {};
}

export default Match;
