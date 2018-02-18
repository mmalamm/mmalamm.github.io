import { createStore } from "redux";
import { nextPlayer, diffCards, createTracker, isValidTurn } from "./lib";

import Deck from "../deck";
const dd = input => JSON.parse(JSON.stringify(input));

const getFirstPlayerName = players =>
  players.find(
    p =>
      p.cards.filter(c => c.suit === "Diamonds" && c.value === "Three").length
  ).name;

const PROCESS_TURN = "PROCESS_TURN";

export const processTurn = turn => ({
  type: PROCESS_TURN,
  turn
});

const createMatch = players => {
  const deck = new Deck();
  const dealtPlayers = deck.deal(players);
  const firstPlayerName = getFirstPlayerName(dealtPlayers);
  const MATCH_INIT_STATE = {
    players: dealtPlayers,
    currentPlayerName: firstPlayerName,
    turns: [],
    initDeal: dealtPlayers.reduce((a, p) => {
      a[p.name] = p.cards;
      return a;
    }, {})
  };
  const matchReducer = (state = MATCH_INIT_STATE, action) => {
    switch (action.type) {
      case PROCESS_TURN:
        if (!isValidTurn(createTracker(state), action.turn)) return state;
        const _currentPlayer = state.players.find(
          p => p.name === action.turn.playerName
        );
        const currentCards = _currentPlayer.cards;
        const turnCards = action.turn.payload.cards;
        const updatedHand = diffCards(currentCards, turnCards);
        const updatedPlayers = state.players.slice().map(p => {
          if (p.name === _currentPlayer.name)
            return dd({ name: p.name, cards: updatedHand, points: p.points });
          return dd(p);
        });
        const updatedTurns = dd(state.turns).concat(dd(action.turn));
        const updatedCurrentPlayerName = nextPlayer(state, action.turn).name;
        return {
          ...state,
          currentPlayerName: updatedCurrentPlayerName,
          players: updatedPlayers,
          turns: updatedTurns
        };
      default:
        return state;
    }
  };
  return createStore(matchReducer);
};

export default createMatch;
