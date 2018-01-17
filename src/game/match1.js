import Deck from "./deck1";
class Match {
  constructor(arr) {
    this.players = arr;
    this.winner = null;
    this.result = {};
    this.tracker = {
      turn: 0,
      currentPlayer: null,
      round: null
    };

    const deck = new Deck();
    deck.deal(this.players);
  }

  run() {
    this.tracker.currentPlayer = this.players.find(p =>
      p.hand.includes(c => c.suit === "Diamonds" && c.value === "Three")
    );
  }
}

export default Match;