import Deck from "./deck1";
import {
  nextPlayer,
  matchUpdater,
  getRoundType,
  broadcast,
  currentPlayer,
  trackerUpdater,
  isValidTurn,
  isOver,
  initialBroadcast,
  getFirstPlayerName
} from "./lib";

class Match {
  constructor(arr) {
    this.winner = null;
    this.result = {};

    const _match = {
      players: arr,
      currentPlayer: null,
      turns: []
    };
    
    let tracker = {
      last3Turns: [],
      currentPlayerName: null,
      roundType: null,
      cardsLeft: {}
    };

    this.updateMatch = turn => {
      if (!isValidTurn(_match, turn)) return;
      tracker = matchUpdater(_match, turn);
      broadcast(_match, tracker, this.playTurn);
      if (isOver(_match)) {
        // update winner and populate result object
      }
    };


    const deck = new Deck();
    deck.deal(_match.players);
    initialBroadcast(_match, this.playTurn);
    this.currentPlayerName = getFirstPlayerName(_match);
    window.match = _match;
    return this;
  }

  playTurn = (turn) => {
    if (turn.playerName === this.currentPlayerName) {
      this.updateMatch(turn);
    }
  }

  run() {}
}

export default Match;
