import Deck from "./deck1";
import keyBy from "lodash/keyBy";
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
  getFirstPlayerName,
  diffCards
} from "./lib";

class Match {
  constructor(arr) {
    this.winner = null;
    this.result = {};

    const _match = {
      players: arr,
      p: keyBy(arr, "name"),
      currentPlayer: null,
      turns: []
    };

    this.tracker = {
      last3Turns: [],
      currentPlayerName: null,
      roundType: null,
      cardsLeft: {}
    };

    this.updateMatch = turn => {
      if (!isValidTurn(_match, turn)) return;
      const output = diffCards(_match.p[this.tracker.currentPlayerName].cards, turn.payload.cards);
      console.log('what is this:',this);
      this.tracker = matchUpdater(_match, turn);
      console.log('what is tracker:', this.tracker);
      this.tracker.currentPlayerName = _match.currentPlayer.name;
      broadcast(_match, this.tracker);
      if (isOver(_match)) {
        // update winner and populate result object
      } else {
        console.log(output);
        return output;
      }
    };

    const deck = new Deck();
    deck.deal(_match.players);
    initialBroadcast(_match, this.playTurn);
    this.tracker.currentPlayerName = getFirstPlayerName(_match);
    window.match = _match;
    return this;
  }

  playTurn = turn => {
    console.log(this);
    let remainingCards;
    if (turn.playerName === this.tracker.currentPlayerName) {
      remainingCards = this.updateMatch(turn);
    }
    return remainingCards;
  };

  run() {}
}

export default Match;
