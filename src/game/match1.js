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
      this.currentPlayerName = _match.currentPlayer.name;
      broadcast(_match, tracker);
      if (isOver(_match)) {
        // update winner and populate result object
      } else {
        return _match.currentPlayer.cards;
      }
    };


    const deck = new Deck();
    deck.deal(_match.players);
    initialBroadcast(_match, this.playTurn);
    this.currentPlayerName = getFirstPlayerName(_match);
    window.match = _match;
    this.tracker = tracker;
    return this;
  }

  playTurn = (turn) => {
    console.log('playTurn inside match has been hit:', turn);
    console.log(this.currentPlayerName);
    let remainingCards;
    if (turn.playerName === this.currentPlayerName) {
      remainingCards = this.updateMatch(turn);
    }
    return remainingCards;
  }

  run() {}
}

export default Match;
