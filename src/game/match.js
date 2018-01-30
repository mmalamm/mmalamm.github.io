import Deck from "./deck";
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
  diffCards,
  createResult
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
      currentPlayerName: null,
      last3Turns: [],
      roundType: null,
      cardsLeft: {},
      hand2Beat: null
    };

    this.updateMatch = turn => {
      if (!isValidTurn(_match, turn)) return;
      const output = diffCards(_match.p[this.tracker.currentPlayerName].cards, turn.payload.cards);
      this.tracker = matchUpdater(_match, turn);
      this.tracker.currentPlayerName = _match.currentPlayer.name;
      broadcast(_match, this.tracker);
      if (isOver(_match)) {
        this.result = createResult(_match);
        _match.players.forEach(p => {
          if (this.result[p.name] > 0) this.winner = p.name;
          p.points = p.points + this.result[p.name];
        })
        console.log(this.result);
        console.log(output);
        return output;

      } else {
        console.log(this.tracker);
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
    let remainingCards;
    if (turn.playerName === this.tracker.currentPlayerName) {
      remainingCards = this.updateMatch(turn);
    }
    return remainingCards;
  };

  run() {}
}

export default Match;
