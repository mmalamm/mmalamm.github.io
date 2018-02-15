import { createStore } from "redux";
const PROCESS_MATCH = "PROCESS_MATCH";
const SET_MATCH_IN_PROGRESS = "SET_MATCH_IN_PROGRESS";

export const processMatch = payload => ({
  type: PROCESS_MATCH,
  payload
})
export const setMatchInProgress = () => ({
  type: SET_MATCH_IN_PROGRESS
})
export const createGame = players => {
  const score = players.reduce((a, b) => {
    a[b.name] = 100;
    return a;
  }, {});
  const GAME_INIT_STATE = {
    playerNames: players.map(p => p.name),
    score,
    history: [],
    matchInProgress: false
  };
  const gameReducer = (state = GAME_INIT_STATE, action) => {
    switch (action.type) {
      case PROCESS_MATCH:
        const updatedScore = players.reduce((a, b) => {
          a[b.name] = state.score[b.name] + action.payload.result[b.name];
          return a;
        }, {});
        const updatedHistory = state.history.concat([action.payload]);
        return {
          score: updatedScore,
          history: updatedHistory,
          matchInProgress: false
        };
      case SET_MATCH_IN_PROGRESS:
        return {
          ...state,
          matchInProgress: true
        }
      default:
        return state;
    }
  };
  return createStore(gameReducer);
};
